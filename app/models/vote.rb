class Vote < ApplicationRecord
  enum choice: [ :lie, :truth ]

  belongs_to :proposition
  belongs_to :guest

  scope :by_guest, -> (guest) { where(guest: guest) }
end
