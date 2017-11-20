class Api::V1::WatchlistController < ApplicationController
  def index
    # puts("### #{params}")
    user = User.find_by(account_no: params[:account])
    stocks = user.stocks.where("watching = ? OR shares > ?", true, 0)
    render json: stocks
    # results = []
    # 5.times do
    #   random_pick = StockSymbol.offset(rand(StockSymbol.count + 1)).first
    #
    #   unless results.map(&:symbol).include?(random_pick.symbol)
    #     results.push(random_pick)
    #   end
    # end
    # render json: results.map {|result| {company: result.company, symbol: result.symbol} }
  end
end
