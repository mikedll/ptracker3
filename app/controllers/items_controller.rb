class ItemsController < ApplicationController

  def index
    @items = Item.page(params[:page] || 1)
  end

  def autocomplete
    @items = Item.by_search(params[:term])
    render json: @items.map { |i| {:value => i.as_json, :label => "#{i.name} ($#{i.unit_price})"} }
  end
end
