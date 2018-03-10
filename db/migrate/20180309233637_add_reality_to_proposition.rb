class AddRealityToProposition < ActiveRecord::Migration[5.1]
  def change
    add_column :propositions, :reality, :integer
  end
end
