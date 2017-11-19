class Stock < ApplicationRecord
  belongs_to :user
  # belongs_to :stock_symbol
  belongs_to :stock, foreign_key: :stock_symbol_id, class_name: 'StockSymbol'

  def company
    self.stock.company
  end

  def symbol
    self.stock.symbol
  end
end
