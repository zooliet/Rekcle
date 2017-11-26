class Api::V1::SymbolsController < ApplicationController
  def index
    # stocks = SmarterCSV.process('public/stock_symbols.csv')
    # results = stocks.map do |stock|
    #   {company: stock[:회사명], symbol: "%06d" % stock[:종목코드]}
    # end

    # stock_symbols = StockSymbol.order(:company) # .select(:company, :symbol)
    # render json: stock_symbols

    user = User.find_by(account_no: params[:account])
    
    stocks = StockSymbol.order(:company)
    watchlist_ids = user.watchlist_ids

    response = stocks.map do |stock|
      {symbol: stock.symbol, company: stock.company, watching: watchlist_ids.include?(stock.id)}
    end

    render json: response
  end
end
