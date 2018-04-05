require File.expand_path('../boot', __FILE__)
require File.expand_path('../environment', __FILE__)
require 'clockwork'

module Clockwork
  every(30.seconds, 'RevealAndRestartProposition') do
    RevealAndRestartJob.perform_later
  end
end
