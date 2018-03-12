class Admin::CoordinatesController < ApplicationController

  # secure this controller

  def show
  end

  def reveal
    # extract all of this into background job

    proposition = Proposition.active
    result = proposition.reality
    overall_results = proposition.votes.proportion_correct(result)

    proposition.transition_to!(:revealed)

    Guest.all.each do |guest|
      RevealAndRestartChannel.broadcast_to guest, {
        type: 'reveal',
        result: result,
        success: proposition.votes.by_guest(guest).first.try(:choice) == result,
        overall_results: overall_results
      }
    end
  end

  def restart
    # extract all of this into background job

    new_proposition = Proposition.activate_new_proposition
    Vote.all.destroy_all

    # trigger background job for this
    Guest.all.each do |guest|
      RevealAndRestartChannel.broadcast_to guest, {
        type: 'restart',
        proposition: new_proposition
      }
    end
  end

end
