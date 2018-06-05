class PurchaseOrdersController < ApplicationController

  def new
    render 'shared/app_root'
  end

  def create
    @purchase_order = PurchaseOrder.new(:date => Time.zone.now,
                                        :title => params[:title],
                                        :customer_id => params[:customer_idxxx])

    if @purchase_order.save
      redirect_to purchase_order_path(@purchase_order)
    else
      flash[:error] = @purchase_order.errors.full_messages
      redirect_to new_purchase_order_path
    end
  end

  def index
    @query_result = PurchaseOrder.with_customer.search(params[:page])
    respond_to do |format|
      format.html { render 'shared/app_root' }
      format.json { render :json => @query_result }
    end
  end

  def show
    @record = PurchaseOrder.with_customer.with_line_items.find(params[:id]).as_json(include: [:customer, {line_items: {include: :item} }])
    respond_to do |format|
      format.html { render 'shared/app_root', :locals => { :multiplicity => :singular } }
      format.json { render :json => @record }
    end
  end
end
