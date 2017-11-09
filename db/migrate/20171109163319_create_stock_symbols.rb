class CreateStockSymbols < ActiveRecord::Migration[5.1]
  def change
    create_table :stock_symbols, {id: false, primary: :symbol} do |t|
      t.string :company
      t.string :symbol

      t.timestamps
    end
    add_index :stock_symbols, :company
    add_index :stock_symbols, :symbol
  end
end
