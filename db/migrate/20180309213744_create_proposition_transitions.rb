class CreatePropositionTransitions < ActiveRecord::Migration[5.1]
  def change
    create_table :proposition_transitions do |t|
      t.string :to_state, null: false
      t.json :metadata, default: {}
      t.integer :sort_key, null: false
      t.integer :proposition_id, null: false
      t.boolean :most_recent, null: false
      t.timestamps null: false
    end

    # Foreign keys are optional, but highly recommended
    add_foreign_key :proposition_transitions, :propositions

    add_index(:proposition_transitions,
              [:proposition_id, :sort_key],
              unique: true,
              name: "index_proposition_transitions_parent_sort")
    add_index(:proposition_transitions,
              [:proposition_id, :most_recent],
              unique: true,
              where: 'most_recent',
              name: "index_proposition_transitions_parent_most_recent")
  end
end
