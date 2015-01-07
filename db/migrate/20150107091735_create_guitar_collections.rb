class CreateGuitarCollections < ActiveRecord::Migration
  def change
    create_table :guitar_collections do |t|
      t.string :title
      t.string :s1
      t.string :s2
      t.string :s3
      t.string :s4
      t.string :s5
      t.string :s6
      t.boolean :deleted

      t.timestamps
    end
  end
end
