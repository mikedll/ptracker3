# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

po1 = PurchaseOrder.create(:title => "First PO", :date => Time.now - 2.days)
po1.line_items.create(:title => "Hard work", :amount =>"5355", :date => Time.now - 5.days)
po1.line_items.create(:title => "Grocery store visit", :amount =>"-26.7", :date => Time.now - 4.days)
po1.line_items.create(:title => "Gas run", :amount =>"-16.32", :date => Time.now - 3.days)
po1.line_items.create(:title => "Supplize", :amount => "-55.4", :date => Time.now - 2.days)
po1.line_items.create(:title => "Meat pies", :amount => "-10.5", :date => Time.now - 1.day)
po1.line_items.create(:title => "New tires", :amount =>"-550.9", :date => Time.now + 1.day)
po1.line_items.create(:title => "Candy Bar", :amount =>"-2", :date => Time.now + 2.days)


po2 = PurchaseOrder.create(:title => "Second Purchase Order", :date => Time.now - 1.days)
po2.line_items.create(:title => "Movie Tickets", :amount =>"19", :date => Time.now - 9.days)
po2.line_items.create(:title => "New t-shirts", :amount =>"90", :date => Time.now - 10.days)

