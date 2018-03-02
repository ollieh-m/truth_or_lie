class RevealAndRestartChannel < ApplicationCable::Channel
  def subscribed
    stream_for current_guest
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
