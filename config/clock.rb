require File.expand_path('../boot', __FILE__)
require File.expand_path('../environment', __FILE__)
require 'clockwork'

module Clockwork
  every(30.seconds, 'RevealAndRestartProposition') do
    RevealAndRestartJob.perform_later
  end

  # temporary fix for storing too much transition history
  every(1.day, :at => '00:00') do
    PropositionTransition.where(most_recent: false).destroy_all
  end
end
