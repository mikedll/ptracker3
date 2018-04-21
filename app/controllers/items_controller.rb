class ItemsController < ApplicationController
  def autocomplete
    @items = Item.by_search(params[:term])
    render json: @items.map { |i| {:value => i.as_json, :label => "#{i.name} ($#{i.unit_price})"} }
  end
end
