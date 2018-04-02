require File.expand_path('../boot', __FILE__)
require File.expand_path('../environment', __FILE__)
require 'clockwork'

module Clockwork
  every(2.minutes, 'RevealAndRestartProposition') do
    `rake reveal_and_restart`
  end
end
