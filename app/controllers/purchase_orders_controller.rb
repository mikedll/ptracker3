class PurchaseOrdersController < ApplicationController

  def index
    @query_result = PurchaseOrder.search(params[:page])
    respond_to do |format|
      format.html
      format.json { render :json => @query_result }
    end
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
