class User < ApplicationRecord
  # has_many :stocks, dependent: :destroy

  has_many :watchings, dependent: :destroy
  has_many :watchlists, through: :watchings, source: :stock_symbol
end
