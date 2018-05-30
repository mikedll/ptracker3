
namespace :db do
  desc "Clear db data. Migrate, seed and populate sample data"
  task :prepare => ['schema:load', :seed, :populate_sample_data] do
    puts "Database loaded with fake data."
  end

  desc "Drop, create, migrate, seed and populate sample data"
  task :prepare_with_drop => [:drop, :create] do
    Rake::Task['db:prepare'].invoke
  end

  desc "Populates database with sample data."
  task :populate_sample_data => [] do
    load "db/sample_data.rb"
  end
end
