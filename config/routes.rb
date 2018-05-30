Rails.application.routes.draw do

  resource :session, :only => [:update]
  resolve('Session') { [:session] }

  resources :purchase_orders, :only => [:index, :show, :create] do
    resources :line_items, :only => [:create, :update, :destroy]
  end

  resources :customers, :only => [:index, :show]

  resources :items, :only => [:index, :update] do
    collection do
      get :autocomplete
    end
  end

  root 'purchase_orders#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
