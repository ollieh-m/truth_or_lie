module Actions
  module Votes
    class Create

      attr_reader :args, :params

      def initialize(params, **args)
        @params = params
        @args = args
      end

      def call
        return authorize_guest unless authorize_guest.success
        return check_proposition unless check_proposition.success
        return save_vote
      end

      def authorize_guest
        @authorize_guest ||= begin
          if args[:guest_uuid] && guest && Proposition.active.votes.by_guest(guest).blank?
            OpenStruct.new(success: true)
          else
            OpenStruct.new(success: false, result: {status: 401, reason: 'Unauthorised'})
          end
        end
      end

      def check_proposition
        @check_proposition ||= begin
          if (Proposition.in_state(:active).count == 1) && (Proposition.in_state(:revealed).count == 0)
            OpenStruct.new(success: true)
          else
            OpenStruct.new(success: false, result: {status: 404, reason: 'No valid propositions'})
          end
        end
      end

      def save_vote
        @save_vote ||= begin
          if Vote.create(guest: guest, proposition: Proposition.active, choice: params[:vote])
            OpenStruct.new(success: true)
          else
            OpenStruct.new(success: false, result: {status: 400, reason: 'Invalid vote'})
          end
        end
      end

      def guest
        @guest ||= Guest.find_by(uuid: args[:guest_uuid])
      end

    end
  end
end
