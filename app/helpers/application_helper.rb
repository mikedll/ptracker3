module ApplicationHelper
  def session_info
    sample_time = Time.use_zone(session[:tzinfo]) { Time.zone.now }

    {
      :tzinfo => session[:tzinfo],
      :tzoffset => sample_time.formatted_offset,
    }
  end

  def title_from_prerender
    @controller.server_side_title
  end

end
