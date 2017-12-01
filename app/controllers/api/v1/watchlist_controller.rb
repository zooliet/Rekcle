class Api::V1::WatchlistController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? || request.format.api_json? }

  def index
    # puts("### #{params}")
    if user = User.find_by(account: params[:account])
      watchlists = user.watchlists
      render json: watchlists
    else
      head :unauthorized
    end
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

  def create
    user = User.find_by(account: params[:account])
    stock_symbol = StockSymbol.find_by(company: params[:stock][:company], symbol: params[:stock][:symbol])

    if stock_symbol && user
      # stock = user.stocks.find_or_create_by(stock_symbol_id: stock_symbol.id)
      # stock.toggle!(:watching)
      user.watchlists << stock_symbol
      head :ok
    else
      head :unauthorized
    end
  end

  def destroy
    user = User.find_by(account: params[:account])
    stock_symbol = StockSymbol.find_by(company: params[:company], symbol: params[:symbol])
    watching = Watching.find_by(user: user, stock_symbol: stock_symbol )
    if user && stock_symbol && watching
      watching.destroy
      head :ok
    else
      head :unauthorized
    end
  end
end
