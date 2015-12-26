class Item < ActiveRecord::Base
  CATEGORY = ["Women", "Men", "Kids", "Baby", "Home", "Health & Beauty",
              "Sports & Outdoor", "Electronics & Games", "Hobbies & DIY",
              "Movies & Music", "Books", "Unisex", "Tools"]

  enum condition: [:brand, :almost, :used, :broken]
  enum method: [:pickup, :shipping]

  belongs_to :user, dependent: :destroy
  has_and_belongs_to_many :fulfillment_options

end
