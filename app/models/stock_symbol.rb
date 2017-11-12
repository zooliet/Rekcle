class StockSymbol < ApplicationRecord
  has_many :watchings
  has_many :users, through: :watchings
end
