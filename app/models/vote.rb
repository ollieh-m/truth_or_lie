class Vote < ApplicationRecord
  enum choice: [ :lie, :truth ]

  belongs_to :proposition
  belongs_to :guest

  scope :by_guest, -> (guest) { where(guest: guest) }

  def self.proportion_correct(result)
    where(choice: result).count.to_f / count
  end

  def to_s
    choice
  end
end
