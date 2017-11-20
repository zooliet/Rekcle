class Api::V1::SymbolsController < ApplicationController
  def index
    # stocks = SmarterCSV.process('public/stock_symbols.csv')
    # results = stocks.map do |stock|
    #   {company: stock[:회사명], symbol: "%06d" % stock[:종목코드]}
    # end
    stock_symbols = StockSymbol.order(:company) # .select(:company, :symbol)
    render json: stock_symbols
  end
end
