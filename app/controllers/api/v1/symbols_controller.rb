class Api::V1::SymbolsController < ApplicationController
  def index
    # stocks = SmarterCSV.process('public/stock_symbols.csv')
    # results = stocks.map do |stock|
    #   {company: stock[:회사명], symbol: "%06d" % stock[:종목코드]}
    # end
    # stocks = User.first.stocks
    results = StockSymbol.order(:company) # .select(:company, :symbol)

    # stocks.each do |stock|
    #   results.find(stock.stock_symbol_id).shares = stock.shares
    # end

    render json: results
  end

  def watchlist
    # puts("### #{params}")
    # user = User.find_by(account: params[:account])
    # user.stocks

    results = []
    5.times do
      random_pick = StockSymbol.offset(rand(StockSymbol.count + 1)).first

      unless results.map(&:symbol).include?(random_pick.symbol)
        results.push(random_pick)
      end
    end
    render json: results.map {|result| {company: result.company, symbol: result.symbol} }
  end
end
