class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.string :title, default: '', null: false
      t.string :desc
      t.string :department
      t.string :subcategory
      t.string :size_type
      t.string :structured_size
      t.integer :condition, default: 0, null: false
      t.integer :price, :limit => 5, default: 0, null: false
      t.string :first_image
      t.string :second_image
      t.string :third_image
      t.string :fourth_image
      t.string :location
      t.float :latitude
      t.float :longitude

      t.timestamps null: false
    end

    add_index :items, :department
    add_index :items, :subcategory
  end
end
