class Vote < ApplicationRecord
  enum choice: [ :lie, :truth ]

  belongs_to :proposition
  belongs_to :guest

  scope :by_guest, -> (guest) { where(guest: guest) }

  def self.proportion_correct(result)
    all_votes = all.count
    if all_votes > 0
      ((where(choice: result).count.to_f / all_votes) * 100).round
    else
      0
    end
  end

  def to_s
    choice
  end
end
