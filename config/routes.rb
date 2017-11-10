Rails.application.routes.draw do
  namespace :ml do
    get 'demo/(*path)', to: 'demo#index'
  end

  namespace :api do
    namespace :v1 do
      get 'symbols', to: 'symbols#index', as: 'symbols'
      get 'watchlist(/*account)', to: 'symbols#watchlist', as: 'watchlist'
      # resources :symbols, only: [:index]
    end
  end

  get 'tradings(/*path)', to: 'tradings#index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :dummies
  root to: 'home#index'
end
