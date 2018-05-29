class HelmetAwareComponentViewHelper < React::Rails::ComponentMount
  def prerender_component(component_name, props, prerender_options)
    renderer = @controller.try(:react_rails_prerenderer) || React::ServerRendering
    result = renderer.render(component_name, props, prerender_options)
    @controller.server_side_title = result['title'].html_safe
    result['renderString'].html_safe
  end
end
