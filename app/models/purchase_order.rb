class PurchaseOrder < ApplicationRecord

  has_many :line_items

  def cache_total
    self.total = line_items.inject(0) { |acc, li| li.destroyed? ? acc : acc + li.price }
  end
end
