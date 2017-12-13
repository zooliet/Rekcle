class Api::V1::SymbolsController < ApplicationController
  def index
    # stocks = SmarterCSV.process('public/stock_symbols.csv')
    # results = stocks.map do |stock|
    #   {name: stock[:회사명], symbol: "%06d" % stock[:종목코드]}
    # end

    # stock_symbols = StockSymbol.order(:name) # .select(:name, :symbol)
    # render json: stock_symbols

    if params[:account]
      user = User.find_by(account: params[:account])
    else
      user = User.first
    end

    stocks = StockSymbol.order(:name)
    # watchings = user.watchlists.where(watching: true).map(&:stock_symbol_id)
    watchings = user.watchlists.map(&:stock_symbol_id)

    response = stocks.map do |stock|
      {symbol: stock.symbol, name: stock.name, watching: watchings.include?(stock.id)}
    end

    render json: response
  end
end
