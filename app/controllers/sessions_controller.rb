class SessionsController < ApplicationController

  def update
    if params[:offset].nil?
      head :unprocessible_entity
      return
    end

    parts = params[:offset].split(':')
    secs = parts[0].to_i * 60 * 60 + parts[1].to_i * 60
    zone = ::Time.find_zone(secs)

    session[:tzinfo] = zone.name

    sample_time = Time.use_zone(session[:tzinfo]) { Time.zone.now }
    render :json => { :tzinfo => session[:tzinfo], :tzoffset => sample_time.formatted_offset }
  end

end
