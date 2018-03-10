class AddGuestAndPropositionToVote < ActiveRecord::Migration[5.1]
  def change
    add_reference :votes, :guest, foreign_key: true
    add_reference :votes, :proposition, foreign_key: true
  end
end
