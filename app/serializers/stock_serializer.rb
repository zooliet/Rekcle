class StockSerializer < ActiveModel::Serializer
  attributes :id, :company, :symbol, :shares, :watching
end
