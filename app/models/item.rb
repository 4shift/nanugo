# == Schema Information
#
# Table name: items
#
#  id                       :integer          not null, primary key
#  title                    :string           default(""), not null
#  desc                     :string
#  department               :string
#  subcategory              :string
#  size_type                :string
#  structured_size          :string
#  condition                :integer          default(0), not null
#  price                    :integer          default(0), not null
#  first_image              :string
#  second_image             :string
#  third_image              :string
#  fourth_image             :string
#  location                 :string
#  latitude                 :float
#  longitude                :float
#  created_at               :datetime         not null
#  updated_at               :datetime         not null
#  user_id                  :integer
#  fulfillment_options_mask :integer
#

class Item < ActiveRecord::Base

  FULFILLMENT_OPTIONS = %w[pickup shipping].freeze
  CONDITION = %w[brand almost used broken].freeze
  CATEGORY = ["Women", "Men", "Kids", "Baby", "Home", "Health & Beauty",
              "Sports & Outdoor", "Electronics & Games", "Hobbies & DIY",
              "Movies & Music", "Books", "Unisex", "Tools"].freeze

  self.per_page = 20

  enum condition: [:brand, :almost, :used, :broken]
  enum method: [:pickup, :shipping]

  belongs_to :user
  has_and_belongs_to_many :fulfillment_options

  scope :in_department, ->(department) { where("department = ?", department: department) }
  scope :in_subcategory, ->(subcategory) { where("subcategory = ?", subcategory: subcategory) }

  default_scope { order(:created_at => :desc) }

  def has_option?(option)
    fulfillment_options.include?(option.to_s)
  end

  def fulfillment_options=(options)
    self.fulfillment_options_mask = (options & FULFILLMENT_OPTIONS).map { |r| 2 ** FULFILLMENT_OPTIONS.index(r) }.inject(0, :+)
  end

  def fulfillment_options
    FULFILLMENT_OPTIONS.reject do |r|
      ((fulfillment_options_mask.to_i || 0) & 2 ** FULFILLMENT_OPTIONS.index(r)).zero?
    end
  end
end
