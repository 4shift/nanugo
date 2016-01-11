module ApplicationHelper
  def avatar_icon(user = '', size = nil)
    user.avatar ||= '//d12azzhof0chfb.cloudfront.net/assets/badge/pro-ab68d1d8d707d62bf21719fa226e698f.png'
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
