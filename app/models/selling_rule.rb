class SellingRule < ApplicationRecord
  belongs_to :user
  has_many :selling_signals
end
