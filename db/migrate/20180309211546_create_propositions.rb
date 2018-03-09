class CreatePropositions < ActiveRecord::Migration[5.1]
  def change
    create_table :propositions do |t|
      t.string :truth_or_lie

      t.timestamps
    end
  end
end
