
namespace :db do
  desc "Drop, create, migrate, seed and populate sample data"
  task :prepare => [:drop, :create, 'schema:load', :seed, :populate_sample_data] do
    puts "Database ready."
  end

  desc "Populates database with sample data."
  task :populate_sample_data => [:environment] do
    load "db/sample_data.rb"
  end
end
