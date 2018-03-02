class CreateGuests < ActiveRecord::Migration[5.1]
  def change
    create_table :guests do |t|
      t.string :uuid, index: true

      t.timestamps
    end
  end
end
