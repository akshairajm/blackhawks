CocBlackhawks::Application.routes.draw do
  defaults format: :json do
    root to: 'main#index'
    resources :main
  end
end
