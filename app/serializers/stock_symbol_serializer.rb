class StockSymbolSerializer < ActiveModel::Serializer
  attributes :id, :symbol, :name
end
