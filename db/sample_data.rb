
require 'benchmark'

old_logger = ActiveRecord::Base.logger
ActiveRecord::Base.logger = nil

elapsed_time = Benchmark.measure do

  first_customer = Customer.create!({
                      :first_name => Faker::Name.first_name,
                      :middle_initial => Faker::Name.initials(1),
                      :last_name => Faker::Name.last_name,
                      :address1 => Faker::Address.street_address,
                      :city => Faker::Address.city,
                      :state => Faker::Address.state_abbr,
                      :zip_code => Faker::Address.zip.split('-').first
    })
  
  itemParams = [
    { :name => "Gas 87", :unit_price => "3.50" },
    {:name => "Gas 89", :unit_price => "3.75"},
    {:name => "Gas 91", :unit_price => "4.00"},
    {:name => "Wood 2x4", :unit_price => "9.99"},
    {:name => "Wood 4x4", :unit_price => "12.89"},
    {:name => "Metal sheet 4x4", :unit_price => "15.50"},
    {:name => "Metal sheet 6x6", :unit_price => "19.78"},
    {:name => "Metal sheet 8x8", :unit_price => "23.25"},
    {:name => "Glass sheet 6x6", :unit_price => "18.40"},
    {:name => "Glass sheet 8x8", :unit_price => "24.40"},
    {:name => "Glass sheet 10x10", :unit_price => "28.80"},
  ]
  items = itemParams.map do |ip|
    Item.create!(ip)
  end

  po1 = PurchaseOrder.create(:customer => first_customer, :title => "First PO", :date => Time.now - 2.days)

  [{:item => items[0], :quantity => "30", :added_at => Time.now - 5.days},
    {:item => items[1], :quantity => "40", :added_at => Time.now - 4.days},
    {:item => items[2], :quantity => "33", :added_at => Time.now - 3.days},
    {:item => items[3], :quantity => "8", :added_at => Time.now - 2.days},
    {:item => items[4], :quantity => "6", :added_at => Time.now - 1.days},
    {:item => items[5], :quantity => "10", :added_at => Time.now},
    {:item => items[6], :quantity => "2", :added_at => Time.now + 1.day}
  ].each do |p|
    po1.line_items.create!(p)
  end

  po2 = PurchaseOrder.create(:customer => first_customer, :title => "Second Purchase Order", :date => Time.now - 1.days)
  [{:item => items[1], :quantity => "25", :added_at => Time.now - 9.days},
    {:item => items[3], :quantity => "10", :added_at => Time.now - 10.days}
  ].each do |p|
    po2.line_items.create(p)
  end

  item_count = 9000
  pos = 3000
  customers = (pos * 0.8).to_i # 80% of pos

  # Hardcore creation.
  puts "Creating #{item_count} items."
  item_count.times do |i|
    Item.create!({:name => "#{Faker::Commerce.product_name} #{i}", :unit_price => Faker::Commerce.price})
  end


  puts "Creating #{customers} customers."
  customers.times do
    Customer.create!({
                      :first_name => Faker::Name.first_name,
                      :middle_initial => Faker::Name.initials(1),
                      :last_name => Faker::Name.last_name,
                      :address1 => Faker::Address.street_address,
                      :city => Faker::Address.city,
                      :state => Faker::Address.state_abbr,
                      :zip_code => Faker::Address.zip.split('-').first
                    })
  end

  puts "Creating #{pos} purchase_orders."
  pos.times do |i|
    po_time = Faker::Time.backward(50, (rand > 0.8) ? :night : :day)
    po = PurchaseOrder.create!({
        :customer => Customer.order(Arel.sql('random()')).limit(1).find_all.first,
        :title => "#{Faker::Address.city} #{Faker::Number.between(10,25)}",
        :date => po_time
      })

    rand(8).times do |i|
      li = po.line_items.build({
          :item => Item.order(Arel.sql('random()')).limit(1).find_all.first,
          :quantity => Faker::Number.decimal(i % 2 == 0 ? 1 : 2, rand(2) == 1 ? 1 : 0),
          :added_at => Faker::Time.between(po_time - 25.minutes, po_time, :between)
                               })
      li.disable_po_refresh = true
      li.save!
    end

    po.cache_total
    po.save!
  end
end

puts "Took: #{elapsed_time.real.round(2)} seconds."
ActiveRecord::Base.logger = old_logger
