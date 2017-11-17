class StockSymbolSerializer < ActiveModel::Serializer
  attributes :symbol, :company
end
