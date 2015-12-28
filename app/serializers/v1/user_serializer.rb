module V1
  class UserSerializer < ActiveModel::Serializer
    attributes :email, :user_id, :username

    def user_id
      object.id
    end
  end
end
