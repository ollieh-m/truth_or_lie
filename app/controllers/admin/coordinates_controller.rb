class Admin::CoordinatesController < Admin::BaseController

  def show
    @status = Proposition.current_status
  end

  # use this post to get list of guests subscribed to actioncable: https://stackoverflow.com/questions/36106542/how-do-i-find-out-who-is-connected-to-actioncable?noredirect=1&lq=1
  # only broadcast to them
  # also delete stale guests

  def reveal
    actioned = Actions::Admin::Coordinates::Reveal.new(params).call
    if actioned.success
      flash[:notice] = 'Successfully revealed result'
    else
      flash[:alert] = actioned.result[:reason]
    end
    redirect_to action: :show
  end

  def restart
    actioned = Actions::Admin::Coordinates::Restart.new(params).call
    if actioned.success
      flash[:notice] = 'Successfully restarted result'
    else
      flash[:alert] = actioned.result[:reason]
    end
    redirect_to action: :show
  end

end
