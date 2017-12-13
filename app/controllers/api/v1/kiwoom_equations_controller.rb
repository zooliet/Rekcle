class Api::V1::KiwoomEquationsController < ApplicationController
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

end
