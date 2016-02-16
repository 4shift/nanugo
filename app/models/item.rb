# == Schema Information
#
# Table name: items
#
#  id              :integer          not null, primary key
#  title           :string           default(""), not null
#  desc            :string
#  department      :string
#  subcategory     :string
#  size_type       :string
#  structured_size :string
#  condition       :integer          default(0), not null
#  price           :integer          default(0), not null
#  first_image     :string
#  second_image    :string
#  third_image     :string
#  fourth_image    :string
#  location        :string
#  latitude        :float
#  longitude       :float
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  user_id         :integer
#

class Item < ActiveRecord::Base
  CATEGORY = ["Women", "Men", "Kids", "Baby", "Home", "Health & Beauty",
              "Sports & Outdoor", "Electronics & Games", "Hobbies & DIY",
              "Movies & Music", "Books", "Unisex", "Tools"]

  self.per_page = 20

  enum condition: [:brand, :almost, :used, :broken]
  enum method: [:pickup, :shipping]

  belongs_to :user, dependent: :destroy
  has_and_belongs_to_many :fulfillment_options

  scope :in_department, ->(department) { where("department = ?", department: department) }
  scope :in_subcategory, ->(subcategory) { where("subcategory = ?", subcategory: subcategory) }

  default_scope { order(:created_at => :desc) }
end
