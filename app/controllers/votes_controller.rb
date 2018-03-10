class VotesController < ApplicationController

  def create
    respond_to do |format|
      format.json do
        actioned = Actions::Votes::Create.new(params, guest_uuid: cookies.signed[:guest_uuid]).call
        if actioned.success
          render status: 200
        else
          render json: {reason: actioned.result[:reason]}, status: actioned.result[:status]
        end
      end
    end
  end

end
