Rails.application.routes.draw do
  use_doorkeeper

  as :user do
      patch '/user/confirmation' => 'confirmations#update', :via => :patch, :as => :update_user_confirmation
  end
  devise_for :users, controllers: { sessions: :sessions,
                                    registrations: :registrations,
                                    confirmations: :confirmations,
                                    omniauth_callbacks: :omniauth_callbacks }

  namespace :v1, defaults: { format: :json } do
    resource :login, only: [:create], controller: :sessions
    resources :users, only: [:create]
    resources :items, only: [:index, :show, :create]
  end

  resources :users
  resources :items, except: [:index, :new]

  get '/postings' => 'items#index'
  get '/post' => 'items#new'

  resources :namespace, path: '/', constraints: { id: /[a-zA-Z.0-9_\-]+/ }, only: [] do
    resources :uploads, only: [:create] do
      collection do
        get ":secret/:filename", action: :show, as: :show, constraints: { filename: /[^\/]+/ }
      end
    end
  end

  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  root to: "pages#home"

  get "/*id" => 'pages#show', as: :page, format: false
end
