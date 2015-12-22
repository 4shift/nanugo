# == Schema Information
#
# Table name: posts
#
#  id           :integer          not null, primary key
#  title        :string
#  category_id  :integer
#  desc         :text
#  condition_id :integer
#  price        :decimal(, )
#  delivery     :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Post < ActiveRecord::Base
  belongs_to :category
  belongs_to :condition
end
