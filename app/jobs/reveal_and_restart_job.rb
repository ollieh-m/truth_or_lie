class RevealAndRestartJob < ApplicationJob
  queue_as :default

  def perform
    puts 'Revealing result'
    reveal_actioned = Actions::Admin::Coordinates::Reveal.new(timestamp: Time.current).call
    puts reveal_actioned.inspect
    sleep(5)
    puts 'Restarting proposition'
    restart_actioned = Actions::Admin::Coordinates::Restart.new({}).call
    puts restart_actioned.inspect
  end
end
