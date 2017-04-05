class AppController < ApplicationController
  layout "app"

  def index
    @client = Instagram.client(:access_token => session[:access_token])
    @user = @client.user
    @looks = @client.user_liked_media.map{ |look| look.images.standard_resolution.url }
  end
end
