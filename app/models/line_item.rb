class LineItem < ApplicationRecord

  attr_accessor :disable_po_refresh

  belongs_to :purchase_order, :inverse_of => 'line_items'
  belongs_to :item

  before_save :_calculate_price
  after_save :_refresh_purchase_order, :if => ->(r){ !r.disable_po_refresh }
  after_destroy :_refresh_purchase_order

  validates :quantity, :presence => true

  def _refresh_purchase_order
    purchase_order.cache_total
    purchase_order.save!
  end

  def _calculate_price
    self.unit_price = item.unit_price
    self.price = unit_price * quantity
  end

end
