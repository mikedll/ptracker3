class LineItemsController < ApplicationController

  def create
    find_parent
    @line_item = @parent.line_items.build(line_item_params)

    if @line_item.save
      _render_json
    else
      render json: @line_item.errors, status: :unprocessible_entity
    end
  end

  def update
    find_item
    if @line_item.update(line_item_params)
      _render_json
    else
      render json: @line_item.errors, status: :unprocessible_entity
    end
  end

  def destroy
    find_item
    @line_item.destroy
    render json: @parent
  end

  private

  def _render_json
    render json: @line_item.as_json(include: [:purchase_order, :item])
  end

  def line_item_params
    params.require(:line_item).permit(:item_id, :quantity, :added_at)
  end

  def find_parent
    @parent = PurchaseOrder.find(params[:purchase_order_id])
  end

  def find_item
    find_parent
    @line_item = @parent.line_items.find(params[:id]) if params[:id]
  end
end
