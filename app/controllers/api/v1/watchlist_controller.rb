class Api::V1::WatchlistController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? || request.format.api_json? }

  def index
    # puts("### #{params}")
    if params[:account]
      user = User.find_by(account: params[:account])
    else
      user = User.first
    end

    watchlists = user.watchlists
    render json: watchlists
    # head :unauthorized

    # results = []
    # 5.times do
    #   random_pick = StockSymbol.offset(rand(StockSymbol.count + 1)).first
    #
    #   unless results.map(&:symbol).include?(random_pick.symbol)
    #     results.push(random_pick)
    #   end
    # end
    # render json: results.map {|result| {name: result.name, symbol: result.symbol} }
  end

  def create
    # puts "*****#{params}"
    if params[:account]
      user = User.find_by(account: params[:account])
    else
      user = User.first
    end

    stock_symbol = StockSymbol.find_by(name: params[:stock][:name], symbol: params[:stock][:symbol])
    if stock_symbol && user
      stock = user.watchlists.find_or_create_by(stock_symbol_id: stock_symbol.id)
      # stock = user.stocks.find_or_create_by(stock_symbol_id: stock_symbol.id)
      stock.toggle!(:watching)
      head :ok
    else
      head :unauthorized
    end
  end

  def destroy
    if params[:account]
      user = User.find_by(account: params[:account])
    else
      user = User.first
    end

    stock_symbol = StockSymbol.find_by(name: params[:name], symbol: params[:symbol])
    stock = user.watchlists.find_or_create_by(stock_symbol_id: stock_symbol.id)
    # watching = Watching.find_by(user: user, stock_symbol: stock_symbol )
    if user && stock_symbol && stock
      stock.destroy
      head :ok
    else
      head :unauthorized
    end
  end
end
