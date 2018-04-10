module Actions
  module Admin
    module Coordinates
      class Reveal

        attr_reader :args, :params

        def initialize(params, **args)
          @params = params
          @args = args
        end

        def call
          return check_for_active_proposition unless check_for_active_proposition.success
          return check_proposition_not_revealed unless check_proposition_not_revealed.success
          return get_proposition unless get_proposition.success
          return next_reveal unless next_reveal.success
          return trigger_broadcast unless trigger_broadcast.success
          return transition_proposition
        end

        def check_for_active_proposition
          @check_for_active_proposition ||= begin
            if Proposition.in_state(:active).count == 1
              OpenStruct.new(success: true)
            else
              OpenStruct.new(success: false, result: {reason: 'There is no proposition to reveal'})
            end
          end
        end

        def check_proposition_not_revealed
          @check_proposition_not_revealed ||= begin
            if Proposition.in_state(:revealed).blank?
              OpenStruct.new(success: true)
            else
              OpenStruct.new(success: false, result: {reason: 'Proposition has already been revealed'})
            end
          end
        end

        def get_proposition
          @get_proposition ||= begin
            OpenStruct.new(success: true, result: Proposition.active)
          end
        end

        def next_reveal
          @next_reveal ||= begin
            if params[:timestamp]
              utc_timestamp = params[:timestamp] + 30.seconds
              parsed_without_zone = utc_timestamp.to_s[0..-5]
              OpenStruct.new(success: true, result: parsed_without_zone)
            else
              OpenStruct.new(success: true, result: nil)
            end
          end
        end

        def trigger_broadcast
          @trigger_broadcast ||= begin
            result = get_proposition.result.reality
            overall_results = get_proposition.result.votes.proportion_correct(result)
            RevealJob.perform_later(get_proposition.result, result, overall_results, next_reveal.result)
            OpenStruct.new(success: true)
          end
        end

        def transition_proposition
          @transition_proposition ||= begin
            get_proposition.result.transition_to!(:revealed)
            OpenStruct.new(success: true)
          end
        end
      end

    end
  end
end
