class PurchaseOrdersController < ApplicationController
  def show
    @purchase_order = PurchaseOrder.includes(:line_items).find(params[:id])
  end
end
