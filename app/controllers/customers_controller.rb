class CustomersController < ApplicationController

  MAX_AUTOCOMPLETE = 30 # otherwise jqueryUI can't handle it

  def index
    @query_result = Customer.search(params[:page])
    respond_to do |format|
      format.html { render 'shared/app_root' }
      format.json { render :json => @query_result }
    end
  end

  def autocomplete
    @customers = Customer.by_name(params[:term]).limit(MAX_AUTOCOMPLETE)
    render :json => @customers.map { |c| { :value => c.as_json(:methods => [:name]), :label => c.name } }
  end

  def show
    @record = Customer.find(params[:id]).as_json(include: [:purchase_orders])
    respond_to do |format|
      format.html { render 'shared/app_root', :locals => { :multiplicity => :singular } }
      format.json { render :json => @record }
    end
  end

end
