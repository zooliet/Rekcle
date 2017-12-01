class AddHstoreExtention < ActiveRecord::Migration[5.1]
  def change
    execute 'CREATE EXTENSION hstore'
  end
end
