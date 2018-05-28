class Item < ApplicationRecord
  has_many :line_items, :dependent => :destroy

  scope :by_name, ->(s){ where("LOWER(name) LIKE ?", "%#{s.downcase}%") }
  scope :ordered, ->{ order('created_at') }

  def self.search(query, page)
    scope = ordered

    q = nil
    if !query.blank?
      q = query.strip
      scope = scope.by_name(q) if !q.blank?
    end

    page = page.to_i || 1
    page = 1 if page == 0
    results = scope.page(page)

    {
      :info => {
        :total => scope.count,
        :page => page,
        :per_page => scope.model.default_per_page,
        :query => (q.blank? ? {} : { s: q })
      },
      :results => results
    }
  end
end
