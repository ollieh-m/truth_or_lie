require File.expand_path('../boot', __FILE__)
require File.expand_path('../environment', __FILE__)
require 'clockwork'

module Clockwork
  every(1.minute, 'RevealAndRestartProposition') do
    RevealAndRestartJob.perform_later
  end
end
