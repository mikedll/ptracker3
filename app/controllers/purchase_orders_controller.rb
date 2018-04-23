class PurchaseOrdersController < ApplicationController
  def show
    @purchase_order = PurchaseOrder.with_line_items.find(params[:id])
  end
end
