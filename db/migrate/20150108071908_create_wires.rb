class CreateWires < ActiveRecord::Migration
  def change
    create_table :wires do |t|
      t.string :title
      t.string :value
      t.references :guitar_collection, index: true

      t.timestamps
    end
  end
end
