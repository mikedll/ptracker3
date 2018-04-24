class WelcomeController < ApplicationController
  def index
    @purchase_orders = PurchaseOrder.ordered.page(params[:page] || 1)
  end
end
