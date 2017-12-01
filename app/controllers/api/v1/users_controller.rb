class Api::V1::UsersController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? || request.format.api_json? }

  def show
  end

  def create
    # puts("### #{params[:user]}")
    if user = User.find_by(user_params)
      user.update(updated_at: Time.now)
    else
      user = User.create(user_params)
    end
    render json: user, status: :ok, location: api_v1_user_url(user)
  end

  private
  def user_params
    params.require(:user).permit(:name, :login, :account)
  end
end
