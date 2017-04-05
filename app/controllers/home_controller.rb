class HomeController < ApplicationController
  layout "home"
  def index
    $cb_url = "http://localhost:3000/oauth/callback"

    Instagram.configure do |config|
      config.client_id = "9597dd3193e8461e9dfd07d2fc11bdeb"
      config.client_secret = "67110576371d419ea82c19011347e56b"
    end

    @instagram_url = Instagram.authorize_url(:redirect_uri => $cb_url,
      :scope => "public_content")
  end

  def oauth
    response = Instagram.get_access_token(params[:code], :redirect_uri => $cb_url)
    session[:access_token] = response.access_token
    client = Instagram.client(:access_token => response.access_token)
    session[:current_user_id] = User.find_or_create_by(name: client.user.username).id

    redirect_to controller: "app", action: "index"
  end

  def list
    @products = Product.find(params[:products])
  end

end
