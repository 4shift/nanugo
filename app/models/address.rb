# == Schema Information
#
# Table name: addresses
#
#  id          :integer          not null, primary key
#  country_id  :integer
#  province_id :integer
#  detail      :string
#  user_id     :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Address < ActiveRecord::Base
  belongs_to :country
  belongs_to :province
  belongs_to :user
end
