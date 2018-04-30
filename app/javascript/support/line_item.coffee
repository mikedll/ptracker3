
class LineItem
  constructor: (item, quantity) ->
    @item = item
    @quantity = quantity

  price: () ->
    return null if !@item || !@quantity;
    amountFormat(Math.round((parseFloat(@quantity) * @item.unit_price) * 100) / 100);

export { LineItem }
