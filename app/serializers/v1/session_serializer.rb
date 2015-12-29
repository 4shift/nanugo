module V1
  class SessionSerializer < ActiveModel::Serializer
    attributes :email, :token_type, :user_id, :username, :avatar_img, :access_token

    def user_id
      object.id
    end

    def token_type
      'Bearer'
    end

    def avatar_img
      object.avatar.url
    end
  end
end
