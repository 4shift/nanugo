class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :confirmable, :omniauthable, :omniauth_providers => [:facebook]

  has_many :address, dependent: :destroy


  class << self
    def find_by_confirmation_token(confirmation_token)
      original_token = confirmation_token
      confirmation_token = Devise.token_generator.digest(self, :confirmation_token, confirmation_token)

      confirmable = find_or_initialize_with_error_by(:confirmation_token, confirmation_token)
      if !confirmable.persisted? && Devise.allow_insecure_token_lookup
        confirmable = find_or_initialize_with_error_by(:confirmation_token, original_token)
      end

      confirmable
    end

    def search(query)
      where("lower(username) LIKE :query OR lower(email) LIKE :query", query: "%#{query.downcase}%")
    end

    def sort(method)
      case method.to_s
      when 'recent_sign_in' then reorder(last_sign_in_at: :desc)
      when 'oldest_sign_in' then reorder(last_sign_in_at: :asc)
      else
        order_by(method)
      end
    end

    def filter(filter_name)
      case filter_name
      when "admins"; self.admins
      when "authors"; self.authors
      when "inactive"; self.inactive
      when "members"; self.members
      when "nonmembers"; self.nonmembers
      else
        self.active
      end
    end

    def from_omniauth(auth)
      created = false
      if member = User.find_by_email(auth.info.email)
        member.provider = auth.provider
        member.uid = auth.uid
      else
        member = User.where(provider: auth.provider, uid: auth.uid).first
        member = User.new if member.nil?
        member.provider = auth.provider
        member.uid = auth.uid
        member.email = auth.info.email
        member.username = auth.info.name.gsub(' ', '_')
        member.password = Devise.friendly_token[0,20] + rand(5..30).to_s
        member.skip_confirmation!
        member.save
        created = true
      end
      [member, created]
    end

    def new_with_session(params, session)
      super.tap do |user|
        if data = session["devise.facebook_data"] && session["devise.facebook_data"]["extra"]["raw_info"]
          user.email = data["email"] if user.email.blank?
          user.username = data["name"] if user.username.blank?
        end
      end
    end
  end
end
