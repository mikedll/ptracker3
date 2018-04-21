class CreateItems < ActiveRecord::Migration[5.1]
  def change
    create_table :items do |t|
      t.string  :name, :default => "", :null => false
      t.decimal :unit_price, :default => 0, :null => false
      t.timestamps
    end

    remove_column :line_items, :title, :string
    add_column :line_items, :item_id, :integer
    add_column :line_items, :quantity, :decimal
  end
end
