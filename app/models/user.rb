# == Schema Information
#
# Table name: users
#
#  id                     :integer          not null, primary key
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  reset_password_token   :string
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  sign_in_count          :integer          default(0), not null
#  current_sign_in_at     :datetime
#  last_sign_in_at        :datetime
#  current_sign_in_ip     :inet
#  last_sign_in_ip        :inet
#  confirmation_token     :string
#  confirmed_at           :datetime
#  confirmation_sent_at   :datetime
#  unconfirmed_email      :string
#  failed_attempts        :integer          default(0), not null
#  unlock_token           :string
#  locked_at              :datetime
#  created_at             :datetime
#  updated_at             :datetime
#  username               :string
#  provider               :string
#  uid                    :string
#  avatar                 :string
#  location               :string
#  latitude               :float
#  longitude              :float
#  access_token           :string
#  point                  :integer          default(0), not null
#

# require 'carrierwave/orm/activerecord'

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :trackable, :validatable,
         :confirmable, :omniauthable, omniauth_providers: [:facebook]

  after_create :update_access_token!
  after_create :give_thanks_point

  has_and_belongs_to_many :roles
  has_many :items

  # mount_uploader :avatar, AvatarUploader

  # validate :avatar_size_validation

  def password_required?
    super if confirmed?
  end

  def password_match?
    self.errors[:password] << "비밀번호를 입력해야 합니다." if password.blank?
    self.errors[:password_confirmation] << "비밀번호 확인을 입력해야 합니다." if password_confirmation.blank?
    self.errors[:password_confirmation] << "비밀번호와 확인코드가 일치하지 않습니다." if password != password_confirmation
    password == password_confirmation && !password.blank?
  end

  # new function to set the password without knowing the current password used in our confirmation controller.
  def attempt_set_password(params)
    p = {}
    p[:username] = params[:username]
    p[:password] = params[:password]
    p[:password_confirmation] = params[:password_confirmation]
    update_attributes(p)
  end

  # new function to return whether a password has been set
  def has_no_password?
    self.encrypted_password.blank?
  end

  def only_if_unconfirmed
    pending_any_confirmation {yield}
  end

  def has_role?(role)
    roles.include?(role)
  end

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

    def from_omniauth(auth)
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
        member.avatar = "http://graph.facebook.com/#{auth.uid}/picture?width=400&height=400"
        member.password = Devise.friendly_token[0,20] + rand(5..30).to_s
        member.skip_confirmation!
        member.save
      end
      member
    end

  end

  private

  def update_access_token!
    self.access_token = "#{self.id}:#{Devise.friendly_token}"
    save
  end

  def give_thanks_point
    self.point = ENV["SIGNUP_POINT"].to_i
    save
  end

  # def avatar_size_validation
  #   errors[:avatar] << "사용자 이미지 파일은 최대 2MB를 넘을 수 없습니다." if avatar.size > 2.megabytes
  # end
end
