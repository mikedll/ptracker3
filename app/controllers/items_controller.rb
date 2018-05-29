class ItemsController < ApplicationController

  def index
    @query_result = Item.search(params[:s], params[:page])
    respond_to do |format|
      format.html { render 'shared/app_root' }
      format.json { render :json => @query_result }
    end
  end

  def update
    @record = Item.find(params[:id])
    if @record.update(item_params)
      render :json => @record
    else
      render :json => @record.errors, :status => :unprocessible_entity
    end
  end

  def autocomplete
    @items = Item.by_name(params[:term])
    render json: @items.map { |i| {:value => i.as_json, :label => "#{i.name} ($#{i.unit_price})"} }
  end

  protected

  def item_params
    params.require(:item).permit(:unit_price)
  end

end
