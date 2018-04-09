class WelcomeController < ApplicationController
  def index
    @purchase_orders = PurchaseOrder.all
  end
end
