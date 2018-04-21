class CreateLineItems < ActiveRecord::Migration[5.1]
  def change
    create_table :line_items do |t|
      t.string :title
      t.datetime :added_at, :default => "NOW()", :null => false
      t.decimal :price, :precision => 8, :scale => 2, :default => 0, :null => false

      t.timestamps
    end
  end
end
