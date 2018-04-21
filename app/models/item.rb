class Item < ApplicationRecord
  has_many :line_items

  scope :by_search, ->(s){ where("LOWER(name) LIKE ?", "%#{s.downcase}%") }

end
