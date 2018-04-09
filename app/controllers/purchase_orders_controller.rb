class PurchaseOrdersController < ApplicationController
  def show
    @purchase_order = PurchaseOrder.find(params[:id])
  end
end
