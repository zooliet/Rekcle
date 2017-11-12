class User < ApplicationRecord
  # has_many :watchlist, foreign_key: 'user_id', class_name: 'StockSymbol'
  has_many :watchings
  has_many :watchlists, through: :watchings, source: :stock_symbol
end
