class Api::V1::KiwoomEquationsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? || request.format.api_json? }
  def index
    if params[:account]
      user = User.find_by(account: params[:account])
    else
      user = User.first
    end

    kiwoom_equations = user.kiwoom_equations.order(:index)

    response = kiwoom_equations.map do |eq|
      {id: eq.id, 인덱스: eq.index, 조건명: eq.name }
    end

    render json: response
  end

  def update
    puts("***#{params}")
    if params[:account]
      user = User.find_by(account: params[:account])
    else
      user = User.first
    end

    params[:kiwoom_equations].each do |equation|

    end

    head :ok
  end

end
