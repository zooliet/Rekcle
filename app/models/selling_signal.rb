class SellingSignal < ApplicationRecord
  belongs_to :user
  belongs_to :watching, optional: true
  belongs_to :selling_rule, optional: true
end
