Rails.application.routes.draw do
  namespace :ml do
    get 'demo/(*path)', to: 'demo#index'
  end

  get 'tradings(/*path)', to: 'tradings#index'
  
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :dummies
  root to: 'home#index'
end
