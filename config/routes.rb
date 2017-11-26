Rails.application.routes.draw do
  namespace :ml do
    get 'demo/(*path)', to: 'demo#index'
  end

  namespace :api do
    namespace :v1 do
      get 'symbols(/*account)', to: 'symbols#index', as: 'symbols'
      # resources :symbols, only: [:index]

      get 'watchlist(/*account)', to: 'watchlist#index', as: 'watchlist'
      post 'watchlist(/*account)', to: 'watchlist#create'
      delete 'watchlist(/*account)', to: 'watchlist#destroy'

      resources :users, only: [:create, :show]
      # post 'users', to: 'users#create'
    end
  end

  get 'tradings(/*path)', to: 'tradings#index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :dummies
  root to: 'home#index'
end
