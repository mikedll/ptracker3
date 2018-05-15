class AddUnitPriceToLineItems < ActiveRecord::Migration[5.2]
  def change
    add_column :line_items, :unit_price, :decimal, :precision => 8, :scale => 2, :default => 0
  end
end
