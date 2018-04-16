class LineItemsController < ApplicationController

  def create
    find_parent
    @line_item = @parent.line_items.build(line_item_params)

    if @line_item.save
      render json: @line_item
    else
      render json: @line_item.errors, status: :unprocessible_entity
    end
  end

  def update
    find_item
    if @line_item.update(line_item_params)
      render json: @line_item
    else
      head json: @line_item.errors, status: :unprocessible_entity
    end
  end

  def destroy
    find_item
    @line_item.destroy
    head :no_content
  end

  private

  def line_item_params
    params.require(:line_item).permit(:title, :amount, :date)
  end

  def find_parent
    @parent = PurchaseOrder.find(params[:purchase_order_id])
  end

  def find_item
    find_parent
    @line_item = @parent.line_items.find(params[:id]) if params[:id]
  end
end
