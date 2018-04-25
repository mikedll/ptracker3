class ApplicationController < ActionController::Base

  before_action :_capture_controller

  protected

  def _capture_controller
    @link_info = {
      :controller => controller_name
    }
  end
end
