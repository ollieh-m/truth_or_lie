class PropositionTransition < ApplicationRecord
  belongs_to :proposition, inverse_of: :transitions

  after_destroy :update_most_recent, if: :most_recent?

  private

  def update_most_recent
    last_transition = proposition.proposition_transitions.order(:sort_key).last
    return unless last_transition.present?
    last_transition.update_column(:most_recent, true)
  end
end
