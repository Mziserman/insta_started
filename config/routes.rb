Rails.application.routes.draw do
  root to: "home#index"
  get 'oauth/callback', to: 'home#oauth'
  get 'feed', to: 'home#feed'

end
