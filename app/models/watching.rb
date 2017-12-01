class Watching < ApplicationRecord
  belongs_to :user
  belongs_to :stock_symbol
  belongs_to :kiwoom_equation, optional: true
  has_many :buying_signals, dependent: :destroy
  has_many :selling_signals, dependent: :destroy
end
