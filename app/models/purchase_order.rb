class PurchaseOrder < ApplicationRecord

  paginates_per 10

  belongs_to :customer, :inverse_of => 'purchase_orders'
  has_many :line_items, :inverse_of => 'purchase_order', :dependent => :destroy

  scope :by_title, ->(s) { where('LOWER(title) LIKE ?', "%#{s.downcase}%") }
  scope :with_customer, ->{ includes(:customer)}
  scope :ordered, -> { order(:created_at) }
  scope :with_line_items, -> { includes(line_items: [:item]) }

  def self.search(query, page)
    scope = ordered

    q = nil
    if !query.blank?
      q = query.strip
      scope = scope.by_title(q) if !q.blank?
    end

    page = page.to_i || 1
    page = 1 if page == 0

    results = scope.page(page)
    { :info => {
        :total => scope.count,
        :page => page,
        :per_page => scope.model.default_per_page,
        :query => (q.blank? ? {} : { s: q })
      },
      :results => results.as_json(:include => [:customer])
    }
  end

  def cache_total
    reload
    self.total = line_items.inject(0) { |acc, li| li.destroyed? ? acc : acc + li.price }
  end
end
