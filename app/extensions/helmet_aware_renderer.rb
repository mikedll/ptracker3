class HelmetAwareRenderer < React::ServerRendering::BundleRenderer

  #
  # From both parent and grandparent.
  #
  def render(component_name, props, prerender_options)
    t_options = prepare_options(prerender_options)
    t_props = prepare_props(props)

    js_executed_before = before_render(component_name, t_props, t_options)
    js_executed_after = after_render(component_name, t_props, t_options)
    js_main_section = main_render(component_name, t_props, t_options)
    render_from_parts(js_executed_before, js_main_section, js_executed_after)
  rescue ExecJS::ProgramError => err
    raise React::ServerRendering::PrerenderError.new(component_name, props, err)
  end

  private

  # From Parent
  def prepare_options(options)
    r_func = render_function(options)
    opts = case options
           when Hash then options
           when TrueClass then {}
           else
             {}
           end
    # This seems redundant to pass
    opts.merge(render_function: r_func)
  end

  # From Parent
  def render_function(opts)
    if opts == :static
      'renderToStaticMarkup'.freeze
    else
      'renderToString'.freeze
    end
  end

  # From Parent
  def prepare_props(props)
    props.is_a?(String) ? props : props.to_json
  end

  #
  # Same as grandparent, except missing html_safe.
  # Caller must call that on 'title', 'renderString', and any
  # other strings captured in the future.
  #
  def render_from_parts(before, main, after)
    js_code = compose_js(before, main, after)
    @context.eval(js_code)
  end

  #
  # From grandparent.
  #
  def main_render(component_name, props, prerender_options)
    render_function = prerender_options.fetch(:render_function, 'renderToString')
    "this.ReactRailsUJS.serverRender('#{render_function}', '#{component_name}', #{props})"
  end

  #
  # From grandparent.
  #
  def compose_js(before, main, after)
    <<-JS
          (function () {
            #{before}
            var resultParts = {};
            var result = #{main};
            var helmet = this.ReactHelmet.renderStatic();
            resultParts['title'] = helmet.title.toString();
            resultParts['renderString'] = result;
            #{after}
            return resultParts;
          })()
        JS
  end
end
