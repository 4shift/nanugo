class AddPositionToItem < ActiveRecord::Migration
  def change
    add_column :items, :position, :string, default: "", null: false
  end
end
