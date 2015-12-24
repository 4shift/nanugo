class BaseService
  include Nanugo::CurrentSettings

  attr_accessor :namespace, :current_user, :params

  def initialize(namespace, user, params = {})
    @namespace, @current_user, @params = namespace, user, params.dup
  end

  def notification_service
    NotificationService.new
  end

  private

  def error(message, http_status = nil)
    result = {
        message: message,
        status: :error
    }

    result[:http_status] = http_status if http_status
    result
  end

  def success
    {
        status: success
    }
  end
end
