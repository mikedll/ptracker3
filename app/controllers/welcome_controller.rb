class WelcomeController < ApplicationController
  def index
    @query_result = PurchaseOrder.search(params[:page])
    render :template => 'purchase_orders/index'
  end
end
