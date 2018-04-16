class LineItem < ApplicationRecord
  belongs_to :purchase_order

  after_save :_refresh_purchase_order
  after_destroy :_refresh_purchase_order

  def _refresh_purchase_order
    purchase_order.cache_total
    purchase_order.save!
  end

end
