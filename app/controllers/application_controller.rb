class ApplicationController < ActionController::Base

  before_action :_capture_controller
  after_action :_no_cache_for_json

  protected

  def _capture_controller
    @link_info = {
      :controller => controller_name
    }
  end

  def _no_cache_for_json
    response.set_header('Cache-Control', 'no-store') if(response.content_type == 'application/json')
  end

end
