class AddExtraInfoToUser < ActiveRecord::Migration
  def change
    add_column :users, :username, :string
    add_column :users, :provider, :string
    add_column :users, :uid, :string
    add_column :users, :avatar, :string
    add_column :users, :location, :string
    add_column :users, :latitude, :float
    add_column :users, :longitude, :float
  end
end
