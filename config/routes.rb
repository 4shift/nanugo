Rails.application.routes.draw do
  get 'pages/home' => 'high_voltage/pages#show', id: 'home'
  devise_for :users, controllers: { sessions: :sessions,
                                    omniauth_callbacks: :omniauth_callbacks }
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'

  resource :accounts, only: [:new, :create]

  root to: "pages#home"
end
