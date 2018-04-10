class RevealJob < ApplicationJob
  queue_as :default

  def perform(proposition, result, overall_results, next_reveal=nil)
    Guest.all.each do |guest|
      RevealAndRestartChannel.broadcast_to guest, {
        type: 'reveal',
        result: result,
        success: proposition.votes.by_guest(guest).first.try(:choice) == result,
        overall_results: overall_results,
        next_reveal: next_reveal
      }
    end
  end
end
