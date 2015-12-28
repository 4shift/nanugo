module V1
  class ItemSerializer < ActiveModel::Serializer
    attributes  :id, :title, :desc, :department, :subcategory, :size_type, :structured_size,
                :condition, :price, :first_image, :second_image, :third_image, :fourth_image,
                :location, :latitude, :longitude, :created_at

    has_one :user, serializer: V1::UserSerializer
  end
end
