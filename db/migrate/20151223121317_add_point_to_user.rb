class AddPointToUser < ActiveRecord::Migration
  def change
    add_column :users, :point, :integer, :limit => 5, default: 0, null: false
  end
end
