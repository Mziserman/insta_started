class CreateBaskets < ActiveRecord::Migration[5.0]
  def change
    create_table :baskets do |t|
      t.integer :user_id
      t.integer :product_id
      t.integer :quantity, default: 1

      t.timestamps
    end
  end
end
