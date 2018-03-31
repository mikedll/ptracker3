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

  def find_item
    @line_item = LineItem.find(params[:id])
  end
end
