# == Schema Information
#
# Table name: categories
#
#  id          :integer          not null, primary key
#  category_id :integer
#  name        :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Category < ActiveRecord::Base
  belongs_to :category
  has_many :children, dependent: :destroy, class_name: 'Category'
end
