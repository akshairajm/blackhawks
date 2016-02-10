CocBlackhawks::Application.routes.draw do
  defaults format: :json do
    root to: 'main#index'
    resources :main do 
      get :data, on: :collection
    end
  end
end
