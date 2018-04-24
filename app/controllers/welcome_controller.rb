class WelcomeController < ApplicationController
  def index
    @purchase_orders = PurchaseOrder.page(params[:page] || 1).per(10)
  end
end
