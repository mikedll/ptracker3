class PurchaseOrder < ApplicationRecord

  paginates_per 10

  has_many :line_items, :inverse_of => 'purchase_order', :dependent => :destroy

  scope :ordered, -> { order(:created_at) }
  scope :with_line_items, -> { includes(line_items: [:item]) }

  def cache_total
    reload
    self.total = line_items.inject(0) { |acc, li| li.destroyed? ? acc : acc + li.price }
  end
end
