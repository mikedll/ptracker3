class PurchaseOrdersController < ApplicationController

  def index
    @query_result = PurchaseOrder.search(params[:page])
    respond_to do |format|
      format.html { render 'shared/app_root' }
      format.json { render :json => @query_result }
    end
  end

  def show
    @record = PurchaseOrder.with_line_items.find(params[:id]).as_json(include: [:customer, {line_items: {include: :item} }])
    respond_to do |format|
      format.html { render 'shared/app_root', :locals => { :multiplicity => :singular } }
      format.json { render :json => @record.as_json(include: {line_items: {include: :item} }) }
    end
  end

  def create
    @purchase_order = PurchaseOrder.create(:date => Time.now)
    redirect_to purchase_order_path(@purchase_order)
  end
end
