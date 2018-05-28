module ApplicationHelper
  def link_active(s)
    if s == @link_info[:controller]
      "active"
    else
      ""
    end
  end

  def session_info
    sample_time = Time.use_zone(session[:tzinfo]) { Time.zone.now }

    {
      :tzinfo => session[:tzinfo],
      :tzoffset => sample_time.formatted_offset,
    }
  end

end
