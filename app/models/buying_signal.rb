class BuyingSignal < ApplicationRecord
  belongs_to :user
  belongs_to :watching, optional: true
  belongs_to :buying_rule, optional: true
end
