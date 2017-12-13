class StockSerializer < ActiveModel::Serializer
  attributes :id, :name, :symbol, :shares, :watching
end
