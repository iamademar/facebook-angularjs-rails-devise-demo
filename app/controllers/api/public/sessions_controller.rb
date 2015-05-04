class API::Public::SessionsController < ApplicationController

  def create
    authorization = Authorization.where({ uid: session_params[:uid] }).first
    if authorization
      @user = authorization.user
      sign_in(:user, @user)
    else
      @user = User.create({ first_name: session_params[:first_name],
                           last_name: session_params[:last_name],
                           email: session_params[:email],
                           gender: session_params[:gender]
                        })
      Authorization.create({ uid: session_params[:uid], provider: session_params[:provider], user_id: @user.id })
      sign_in(:user, @user)
    end
  end

  def show
    @user = current_user
  end

  private

    def session_params
      params.require(:session).permit(:email, :first_name, :last_name, :uid, :gender, :provider)
    end
end