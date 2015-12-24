class CreateJoinTableItemFulfillmentOption < ActiveRecord::Migration
  def change
    create_join_table :items, :fulfillment_options do |t|
      # t.index [:item_id, :fulfillment_option_id]
      # t.index [:fulfillment_option_id, :item_id]
    end
  end
end
