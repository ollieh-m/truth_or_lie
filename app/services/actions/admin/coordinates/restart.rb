module Actions
  module Admin
    module Coordinates
      class Restart

        attr_reader :args, :params

        def initialize(params, **args)
          @params = params
          @args = args
        end

        def call
          return check_proposition_not_active unless check_proposition_not_active.success
          return delete_votes unless delete_votes.success
          return trigger_broadcast
        end

        def check_proposition_not_active
          @check_proposition_not_active ||= begin
            if Proposition.in_state(:active).blank?
              OpenStruct.new(success: true)
            else
              OpenStruct.new(success: false, result: {reason: 'Proposition is already active'})
            end
          end
        end

        def delete_votes
          @delete_votes ||= begin
            Vote.all.destroy_all
            OpenStruct.new(success: true)
          end
        end

        def trigger_broadcast
          @trigger_broadcast ||= begin
            new_proposition = Proposition.activate_new_proposition
            RestartJob.perform_later(new_proposition)
            OpenStruct.new(success: true)
          end
        end
      end

    end
  end
end
