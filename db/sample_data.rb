
i1 = Item.create(:name => "Gas 87", :unit_price => "3.50")
i2 = Item.create(:name => "Gas 89", :unit_price => "3.75")
i3 = Item.create(:name => "Gas 91", :unit_price => "4.00")
i4 = Item.create(:name => "Wood 2x4", :unit_price => "9.99")
i5 = Item.create(:name => "Wood 4x4", :unit_price => "12.89")
i6 = Item.create(:name => "Metal sheet 4x4", :unit_price => "15.50")
i7 = Item.create(:name => "Sheet of glass", :unit_price => "18.40")

po1 = PurchaseOrder.create(:title => "First PO", :date => Time.now - 2.days)
po1.line_items.create(:item => i1, :quantity => "30", :added_at => Time.now - 5.days)
po1.line_items.create(:item => i2, :quantity => "40", :added_at => Time.now - 4.days)
po1.line_items.create(:item => i3, :quantity => "33", :added_at => Time.now - 3.days)
po1.line_items.create(:item => i4, :quantity => "8", :added_at => Time.now - 2.days)
po1.line_items.create(:item => i5, :quantity => "6", :added_at => Time.now - 1.days)
po1.line_items.create(:item => i6, :quantity => "10", :added_at => Time.now)
po1.line_items.create(:item => i7, :quantity => "2", :added_at => Time.now + 1.day)


po2 = PurchaseOrder.create(:title => "Second Purchase Order", :date => Time.now - 1.days)
po2.line_items.create(:item => i2, :quantity => "25", :added_at => Time.now - 9.days)
po2.line_items.create(:item => i4, :quantity => "10", :added_at => Time.now - 10.days)

