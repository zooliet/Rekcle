class StockSymbolSerializer < ActiveModel::Serializer
  attributes :id, :symbol, :company
end
