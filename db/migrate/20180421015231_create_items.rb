class CreateItems < ActiveRecord::Migration[5.1]
  def change
    create_table :items do |t|
      t.string  :name, :default => "", :null => false
      t.decimal :unit_price, :precision => 8, :scale => 2, :default => 0, :null => false
      t.timestamps
    end

    remove_column :line_items, :title, :string
    add_column :line_items, :item_id, :integer
    add_column :line_items, :quantity, :decimal, :precision => 8, :scale => 2
  end
end
