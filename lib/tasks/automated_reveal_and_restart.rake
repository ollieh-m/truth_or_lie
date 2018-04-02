desc "This task is called by the clock scheduler to regularly reveal and restart the proposition automatically"

task :reveal_and_restart => :environment do
  puts 'Revealing result'
  reveal_actioned = Actions::Admin::Coordinates::Reveal.new({}).call
  puts reveal_actioned.inspect
  # wait before restarting proposition
  sleep(5)
  puts 'Restarting proposition'
  restart_actioned = Actions::Admin::Coordinates::Restart.new({}).call
  puts restart_actioned.inspect
end
