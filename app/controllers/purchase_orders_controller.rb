class PurchaseOrdersController < ApplicationController

  def index
    @purchase_orders = PurchaseOrder.ordered.page(params[:page] || 1)
    render :json => @purchase_orders
  end

  def show
    @purchase_order = PurchaseOrder.with_line_items.find(params[:id])
    respond_to do |format|
      format.html
      format.json { render :json => @purchase_order.as_json(include: {line_items: {include: :item} }) }
    end
  end

  def create
    @purchase_order = PurchaseOrder.create(:date => Time.now)
    redirect_to purchase_order_path(@purchase_order)
  end
end
