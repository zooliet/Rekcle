class StockSymbolSerializer < ActiveModel::Serializer
  attributes :id, :symbol, :company #, :shares
end
