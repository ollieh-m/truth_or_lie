class RestartJob < ApplicationJob
  queue_as :default

  def perform(new_proposition)
    Guest.all.each do |guest|
      RevealAndRestartChannel.broadcast_to guest, {
        type: 'restart',
        proposition: new_proposition
      }
    end
  end
end
