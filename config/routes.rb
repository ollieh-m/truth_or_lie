Rails.application.routes.draw do
  get 'truth_or_lie', to: 'truth_or_lie#index'

  resources :votes, only: [:create]
end
