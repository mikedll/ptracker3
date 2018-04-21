class CreateLineItems < ActiveRecord::Migration[5.1]
  def change
    create_table :line_items do |t|
      t.string :title
      t.datetime :added_at, :default => "NOW()", :null => false
      t.decimal :price, :default => 0, :null => false

      t.timestamps
    end
  end
end
