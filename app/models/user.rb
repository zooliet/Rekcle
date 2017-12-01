class User < ApplicationRecord
  # has_many :stocks, dependent: :destroy

  has_many :watchings, dependent: :destroy
  has_many :watchlists, through: :watchings, source: :stock_symbol

  has_many :watchings, dependent: :destroy
  has_many :watchlists, through: :watchings, source: :stock_symbol
  has_many :buying_rules, dependent: :destroy
  has_many :buying_signals, dependent: :destroy
  has_many :selling_rules, dependent: :destroy
  has_many :selling_signals, dependent: :destroy
  has_many :kiwoom_equations, dependent: :destroy
end
