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

require 'test_helper'

class ItemTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
