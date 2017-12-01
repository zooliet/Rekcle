class BuyingRule < ApplicationRecord
  belongs_to :user
  has_many :kiwoom_equations
  has_many :buying_signals
end
