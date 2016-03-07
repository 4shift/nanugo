class AddFulfillmentOptionsMaskToItem < ActiveRecord::Migration
  def change
    add_column :items, :fulfillment_options_mask, :integer
  end
end
