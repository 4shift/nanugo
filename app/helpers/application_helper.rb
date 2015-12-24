module ApplicationHelper
  def avatar_icon(user = '', size = nil)
    if user.avatar?
      user.avatar_url(size) || default_avatar
    else
      gravatar_icon(user.email, size)
    end
  end

  def gravatar_icon(user_email = '', size = nil)
    GravatarService.new.execute(user_email, size) || default_avatar
  end

  def body_data_page
    path = controller.controller_path.split('/')
    namespace = path.first if path.second

    [namespace, controller.controller_name, controller.action_name].compact.join(':')
  end

  def resource_name
    :user
  end

  def resource
    @resource ||= User.new
  end

  def devise_mapping
    @devise_mapping ||= Devise.mappings[:user]
  end

end
