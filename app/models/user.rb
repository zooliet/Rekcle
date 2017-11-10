class User < ApplicationRecord
  # has_many :watchlist, foreign_key: 'user_id', class_name: 'StockSymbol'
  has_many :user_stocks
  has_many :stocks, through: :user_stocks
end
