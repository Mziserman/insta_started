Rails.application.routes.draw do
  get 'app/index'

  root to: 'home#index'
  get 'oauth/callback', to: 'home#oauth'
  get 'feed', to: 'app#index'

  namespace :api do
    namespace :v1 do
      resources :products, only: [:index, :create, :destroy, :update]
      resources :users, only: [:index, :create, :destroy, :update]
      get "products/find", to: "products#find"
      get "users/find", to: "users#find"
      get "users/find_basket", to: "users#find_basket"
      post "users/add_to_cart", to: "users#add_to_cart"
    end
  end

end
