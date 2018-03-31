Rails.application.routes.draw do

  resources :line_items, :only => [:index, :create, :update, :destroy]

  get 'welcome/index'

  root 'welcome#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
