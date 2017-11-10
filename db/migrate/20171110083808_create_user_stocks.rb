class CreateUserStocks < ActiveRecord::Migration[5.1]
  def change
    create_table :user_stocks do |t|
      t.belongs_to :user, foreign_key: true
      t.belongs_to :stock_symbol, foreign_key: true

      t.timestamps
    end
  end
end
