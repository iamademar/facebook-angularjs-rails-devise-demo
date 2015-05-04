Rails.application.routes.draw do  
  devise_for :users
  resources :home, only: [:index]
  root 'home#index'  

  namespace :api, defaults: { format: :json } do
    namespace :public do
      resources :sessions, only: [:create, :show]
    end
  end
end  