class CreateCustomers < ActiveRecord::Migration[5.2]
  def change
    create_table :customers do |t|
      t.string :first_name, :default => "", :null => false
      t.string :middle_initial, :default => "", :null => false
      t.string :last_name, :default => "", :null => false
      t.string :address1, :default => "", :null => false
      t.string :city, :default => "", :null => false
      t.string :state, :default => "", :null => false
      t.string :zip_code, :default => "", :null => false
      t.timestamps
    end

    add_column :purchase_orders, :customer_id, :integer
  end
end
