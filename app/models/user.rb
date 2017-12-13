class User < ApplicationRecord
  has_many :watchlists
  has_many :kiwoom_equations, dependent: :destroy
end
