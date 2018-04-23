class PurchaseOrdersController < ApplicationController
  def show
    @purchase_order = PurchaseOrder.with_line_items.find(params[:id])
  end

  def create
    @purchase_order = PurchaseOrder.create(:date => Time.now)
    redirect_to purchase_order_path(@purchase_order)
  end
end
