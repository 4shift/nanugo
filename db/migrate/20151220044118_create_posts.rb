class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :title
      t.references :category, index: true, foreign_key: true
      t.text :desc
      t.references :condition, index: true, foreign_key: true
      t.decimal :price
      t.integer :delivery

      t.timestamps null: false
    end
  end
end
