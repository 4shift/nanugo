class OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def facebook
    @member = User.from_omniauth(request.env["omniauth.auth"])

    if @member.persisted?
      sign_in_and_redirect @member, :event => :authentication
      set_flash_message(:notice, :success, :kind => "Facebook") if is_navigational_format?
    else
      session["devise.facebook_data"] = request.env["omniauth.auth"]
      redirect_to new_user_registration_url, alert: "페이스북으로 로그인 중 오류가 발생했습니다. #{@member.errors.full_messages}"
    end
  end
end
