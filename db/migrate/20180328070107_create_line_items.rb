class CreateLineItems < ActiveRecord::Migration[5.1]
  def change
    create_table :line_items do |t|
      t.string :title
      t.date :date
      t.decimal :amount

      t.timestamps
    end
  end
end
