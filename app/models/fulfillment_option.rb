# == Schema Information
#
# Table name: fulfillment_options
#
#  id         :integer          not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class FulfillmentOption < ActiveRecord::Base
  has_and_belongs_to_many :items
end
