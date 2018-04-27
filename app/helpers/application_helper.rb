module ApplicationHelper
  def link_active(s)
    if s == @link_info[:controller]
      "active"
    else
      ""
    end
  end

end
