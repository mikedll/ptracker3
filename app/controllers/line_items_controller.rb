class LineItemsController < ApplicationController
  def index
    @line_items = LineItem.all
  end

  def create
    @line_item = LineItem.new(line_item_params)

    if @line_item.save
      render json: @line_item
    else
      render json: @line_item.errors, status: :unprocessible_entity
    end
  end

  private

  def line_item_params
    params.require(:line_item).permit(:title, :amount, :date)
  end
end
