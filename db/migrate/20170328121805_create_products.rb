class CreateProducts < ActiveRecord::Migration[5.0]
  def change
    create_table :products do |t|
      t.string :name
      t.string :price
      t.string :picture
      t.string :site

      t.timestamps
    end
  end
end
