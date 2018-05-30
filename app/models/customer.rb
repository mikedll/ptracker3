class Customer < ApplicationRecord
  paginates_per 10

  has_many :purchase_orders, :inverse_of => "customer"

  validates :first_name, :presence => true
  validates :last_name, :presence => true

  validates :state, :length => { :maximum => 2 }

  scope :ordered, -> { order(:created_at) }

  def self.search(page)
    scope = ordered
    page = page.to_i || 1
    page = 1 if page == 0

    results = scope.page(page)
    { :info => {
        :total => scope.count,
        :page => page,
        :per_page => scope.model.default_per_page
      },
      :results => results
    }
  end

  def name
    "#{first_name} #{last_name}"
  end

end
