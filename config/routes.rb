Rails.application.routes.draw do

  resources :purchase_orders, :only => [:show] do
    resources :line_items, :only => [:create, :update, :destroy]
  end

  resources :items, :only => [:index] do
    collection do
      get :autocomplete
    end
  end
  get 'welcome/index'

  root 'welcome#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
