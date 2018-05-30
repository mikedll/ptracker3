class CustomersController < ApplicationController

  def index
    @query_result = Customer.search(params[:page])
    respond_to do |format|
      format.html { render 'shared/app_root' }
      format.json { render :json => @query_result }
    end
  end

  def show
    @record = Customer.find(params[:id]).as_json(include: [:purchase_orders])
    respond_to do |format|
      format.html { render 'shared/app_root', :locals => { :multiplicity => :singular } }
      format.json { render :json => @record }
    end
  end

end
