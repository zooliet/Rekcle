class KiwoomEquation < ApplicationRecord
  belongs_to :user
  belongs_to :buying_rule, optional: true
  has_many :watchings
end
