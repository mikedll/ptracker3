class WelcomeController < ApplicationController
  def index
    @query_result = PurchaseOrder.search(params[:page])
    render 'shared/app_root'
  end
end
