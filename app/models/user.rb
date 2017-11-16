class User < ApplicationRecord
  has_many :watchlists
  has_many :stocks, through: :watchlists, source: :stock
  # has_many :stocks, through: :watchlists, source: :stock_symbol
end

# class Watchlist < ApplicationRecord
#   belongs_to :user
#   belongs_to :stock, foreign_key: :stock_symbol_id, class_name: 'StockSymbol'
#   # belongs_to :stock, foreign_key: :stock_symbol_id
# end
#
#
#
# class StockSymbol < ApplicationRecord
#   has_many :watchlists
#   has_many :users, through: :watchlists
# end
#



# User
# has_many :watchings
# has_many :watchlists, through: :watchings, source: :stock_symbol

# Watchings
# belongs_to :user
# belongs_to :stock_symbol

# StockSymbol
# has_many :watchings
# has_many :users, through: :watchings
