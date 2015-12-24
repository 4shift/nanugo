class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.string :title, default: '', null: false
      t.references :category, index: true, foreign_key: true
      t.string :desc
      t.integer :condition, default: 0, null: false
      t.integer :price, :limit => 5, default: 0, null: false
      t.string :first_image
      t.string :second_image
      t.string :third_image
      t.string :fourth_image

      t.timestamps null: false
    end
  end
end
