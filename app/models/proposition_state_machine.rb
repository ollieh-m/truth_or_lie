class PropositionStateMachine
  include Statesman::Machine

  state :dormant, initial: true
  state :active
  state :revealed

  transition from: :dormant,      to: [:active]
  transition from: :active,       to: [:revealed]
  transition from: :revealed,     to: [:dormant]
end
