class HomeController < ApplicationController

  def index
    $cb_url = "http://localhost:3000/oauth/callback"

    Instagram.configure do |config|
      config.client_id = "9597dd3193e8461e9dfd07d2fc11bdeb"
      config.client_secret = "67110576371d419ea82c19011347e56b"
    end


    redirect_to Instagram.authorize_url(:redirect_uri => $cb_url)
  end

  def oauth

    response = Instagram.get_access_token(params[:code], :redirect_uri => $cb_url)
    session[:access_token] = response.access_token
    redirect_to :feed

  end

  def feed

    client = Instagram.client(:access_token => session[:access_token])
    user = client.user

    html = "<h1>#{user.username}'s recent photos</h1>"
    for media_item in client.user_recent_media
      html << "<img src='#{media_item.images.thumbnail.url}'>"
    end
    render html: html

  end
end
