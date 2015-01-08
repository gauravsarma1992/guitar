class CreateGuitarCollections < ActiveRecord::Migration
  def change
    create_table :guitar_collections do |t|
      t.string :title

      t.timestamps
    end
  end
end
