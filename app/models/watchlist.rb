class Watchlist < ApplicationRecord
  belongs_to :user
  # belongs_to :stock_symbol, class_name: 'StockSymbol'
  belongs_to :stock, foreign_key: :stock_symbol_id, class_name: 'StockSymbol'

end
