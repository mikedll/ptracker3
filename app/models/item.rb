class Item < ApplicationRecord
  has_many :line_items, :dependent => :destroy

  scope :by_name, ->(s){ where("LOWER(name) LIKE ?", "%#{s.downcase}%") }
  scope :ordered, ->{ order('created_at') }

  def self.search(params)
    scope = ordered

    n = nil
    if !params[:n].blank?
      n = params[:n].strip
      scope = scope.by_name(n) if !n.blank?
    end

    page = params[:page].to_i || 1
    page = 1 if page == 0
    results = scope.page(page)

    {
      :info => {
        :total => scope.count,
        :page => page,
        :per_page => scope.model.default_per_page,
        :query => (n.blank? ? {} : { n: n })
      },
      :results => results
    }
  end
end
