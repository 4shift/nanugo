module V1
  class BaseController < ActionController::API
    include AbstractController::Translation
    include CanCan::ControllerAdditions

    clear_respond_to
    respond_to :json

    before_action :authenticate_user_from_token!

    def authenticate_user_from_token!
      auth_token = request.headers['X-Access-Token']

      if auth_token
        authenticate_with_auth_token auth_token
      else
        authentication_error
      end
    end

    rescue_from CanCan::AccessDenied do |e|
      render json: errors_json(e.message), status: :forbidden
    end

    rescue_from ActiveRecord::RecordNotFound do |e|
      render json: errors_json(e.message), status: :not_found
    end

    private

    def authenticate_with_auth_token auth_token
      unless auth_token.include?(':')
        authentication_error
        return
      end

      user_id = auth_token.split(':').first
      user = User.where(id: user_id).first

      if user && Devise.secure_compare(user.access_token, auth_token)
        sign_in user, store: false
      else
        authentication_error
      end
    end

    def authentication_error
      render json: {error: t('application_controller.unauthorized')}, status: 401
    end
  end
end
