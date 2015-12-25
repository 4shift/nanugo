class Item < ActiveRecord::Base

  enum condition: [:brand, :almost, :used, :broken]
  enum method: [:pickup, :shipping]

  belongs_to :category
  belongs_to :user, dependent: :destroy
  has_and_belongs_to_many :fulfillment_options

end
