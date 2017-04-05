Rails.application.routes.draw do
  get 'app/index'

  root to: 'home#index'
  get 'oauth/callback', to: 'home#oauth'
  get 'feed', to: 'app#index'

  namespace :api do
    namespace :v1 do
      resources :products, only: [:index, :create, :destroy, :update]
      get "products/find", to: "products#find"
    end
  end

end
