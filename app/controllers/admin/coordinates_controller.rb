class Admin::CoordinatesController < ApplicationController

  # secure this controller behind basic auth

  def show
    @status = Proposition.current_status
  end

  # we store every guest who starts a session with the site and attempt to broadcast to them all
  # we could know who is subscribed to actioncable and only use those guests
  # use this post to get list of guests subscribed to actioncable: https://stackoverflow.com/questions/36106542/how-do-i-find-out-who-is-connected-to-actioncable?noredirect=1&lq=1

  def reveal
    actioned = Actions::Admin::Coordinates::Reveal.new(params).call
    if actioned.success
      flash[:notice] = 'Successfully revealed result'
    else
      flash[:alert] = actioned.result[:reason]
    end
    redirect_to :show
  end

  def restart
    actioned = Actions::Admin::Coordinates::Restart.new(params).call
    if actioned.success
      flash[:notice] = 'Successfully restarted result'
    else
      flash[:alert] = actioned.result[:reason]
    end
    redirect_to :show
  end

end
