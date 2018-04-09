class CreatePurchaseOrders < ActiveRecord::Migration[5.1]
  def change
    create_table :purchase_orders do |t|
      t.string :title
      t.datetime :date
      t.decimal :total
    end

    add_column :line_items, :purchase_order_id, :integer
  end
end
