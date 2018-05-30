class Customer < ApplicationRecord
  has_many :purchase_orders, :inverse_of => "customer"

  validates :first_name, :presence => true
  validates :last_name, :presence => true

  validates :state, :length => { :maximum => 2 }

  def name
    "#{first_name} #{last_name}"
  end

end
