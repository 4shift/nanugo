class CreateAddresses < ActiveRecord::Migration
  def change
    create_table :addresses do |t|
      t.references :country, index: true, foreign_key: true
      t.references :province, index: true, foreign_key: true
      t.string :detail
      t.references :user, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
