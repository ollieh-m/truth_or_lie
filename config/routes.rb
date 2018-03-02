Rails.application.routes.draw do
  mount ActionCable.server => '/cable'

  get 'truth_or_lie', to: 'truth_or_lie#index'

  resources :votes, only: [:create]

  namespace :admin do
    resource :coordinate, only: [:show] do
      member { post :reveal }
      member { post :restart }
    end
  end
end
