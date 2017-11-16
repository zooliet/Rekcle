class StockSymbol < ApplicationRecord
  has_many :watchlists
  has_many :users, through: :watchlists
end
