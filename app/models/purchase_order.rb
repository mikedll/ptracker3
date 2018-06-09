class PurchaseOrder < ApplicationRecord

  paginates_per 10

  belongs_to :customer, :inverse_of => 'purchase_orders'
  has_many :line_items, :inverse_of => 'purchase_order', :dependent => :destroy

  scope :min_cost, ->(c) { where('total > ?', c) }
  scope :by_title, ->(s) { where('LOWER(title) LIKE ?', "%#{s.downcase}%") }
  scope :with_customer, ->{ includes(:customer)}
  scope :ordered, -> { order(:created_at) }
  scope :with_line_items, -> { includes(line_items: [:item]) }

  def self.search(params)
    scope = ordered

    t = nil
    if !params[:t].blank?
      t = params[:t].strip
      scope = scope.by_title(t) if !t.blank?
    end

    mt = nil
    if !params[:mt].blank?
      mt = BigDecimal.new(params[:mt])
      scope = scope.min_cost(mt)
    end

    page = params[:page].to_i || 1
    page = 1 if page == 0

    results = scope.page(page)
    { :info => {
        :total => scope.count,
        :page => page,
        :per_page => scope.model.default_per_page,
        :query => {}
          .merge(t.nil? ? {} : { t: t })
          .merge(mt.nil? ? {} : { mt: mt })
      },
      :results => results.as_json(:include => [:customer])
    }
  end

  def cache_total
    reload
    self.total = line_items.inject(0) { |acc, li| li.destroyed? ? acc : acc + li.price }
  end
end
