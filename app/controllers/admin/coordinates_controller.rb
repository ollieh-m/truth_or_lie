class Admin::CoordinatesController < ApplicationController

  def show
  end

  def reveal
    # trigger background job for this
    Guest.all.each do |guest|
      RevealAndRestartChannel.broadcast_to guest, {
        type: 'reveal',
        result: 'truth',
        success: true,
        overall_results: 0.5
      }
    end
  end

  def restart
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
