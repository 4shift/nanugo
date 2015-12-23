Rails.application.routes.draw do
  get 'pages/home' => 'high_voltage/pages#show', id: 'home'
  as :user do
      patch '/user/confirmation' => 'confirmations#update', :via => :patch, :as => :update_user_confirmation
  end
  devise_for :users, controllers: { sessions: :sessions,
                                    confirmations: :confirmations,
                                    omniauth_callbacks: :omniauth_callbacks }

  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  root to: "pages#home"
end
