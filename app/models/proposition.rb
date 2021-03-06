class Proposition < ApplicationRecord
  include Statesman::Adapters::ActiveRecordQueries

  has_many :transitions, class_name: "PropositionTransition", autosave: false
  has_many :votes

  enum reality: [ :lie, :truth ]

  def state_machine
    @state_machine ||= PropositionStateMachine.new(self, transition_class: PropositionTransition,
                                                   association_name: :transitions)
  end

  delegate :can_transition_to?, :transition_to!, :transition_to, :current_state,
           to: :state_machine

  def self.transition_class
    PropositionTransition
  end

  def self.initial_state
    :dormant
  end
  private_class_method :initial_state

  def self.current_status
    if in_state(:active).count == 1
      'Active proposition'
    elsif in_state(:revealed).count == 1
      'Revealed proposition'
    end
  end

  def self.active
    if in_state(:active).limit(1).first
      in_state(:active).limit(1).first
    elsif in_state(:revealed).count == 0
      activate_new_proposition
    end
  end

  def self.random
    in_state(:dormant).order("RANDOM()").limit(1).first
  end

  def self.activate_new_proposition
    next_proposition = random
    next_proposition.transition_to!(:active)
    in_state(:revealed).each{|p| p.transition_to!(:dormant)}
    next_proposition
  end
end
