class Watching < ApplicationRecord
  belongs_to :user
  belongs_to :stock_symbol
end
