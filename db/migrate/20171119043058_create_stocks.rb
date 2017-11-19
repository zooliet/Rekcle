class CreateStocks < ActiveRecord::Migration[5.1]
  def change
    create_table :stocks do |t|
      t.references :user, foreign_key: true
      t.references :stock_symbol, foreign_key: true
      t.boolean :watching, default: false
      t.integer :shares, default: 0

      t.timestamps
    end
  end
end
