class PurchaseOrder < ApplicationRecord

  paginates_per 10

  has_many :line_items, :inverse_of => 'purchase_order', :dependent => :destroy

  scope :ordered, -> { order(:created_at) }
  scope :with_line_items, -> { includes(line_items: [:item]) }

  def self.search(page)
    scope = ordered
    page = page.to_i || 1
    page = 1 if page == 0

    purchase_orders = scope.page(page)
    { :info => {
        :total => scope.count,
        :page => page,
        :per_page => scope.model.default_per_page
      },
      :results => purchase_orders
    }
  end

  def cache_total
    reload
    self.total = line_items.inject(0) { |acc, li| li.destroyed? ? acc : acc + li.price }
  end
end
