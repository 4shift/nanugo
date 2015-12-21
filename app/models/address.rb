class Address < ActiveRecord::Base
  belongs_to :country
  belongs_to :province
  belongs_to :user
end
