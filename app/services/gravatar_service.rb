class GravatarService
  include Nanugo::CurrentSettings

  def execute(email, size = nil)
    if current_application_settings.gravatar_enabled && email.present?
      size = 40 if size.nil? || size <= 0

      sprintf gravatar_url,
              hash: Digest::MD5.hexdigest(email.strip.downcase),
              size: size,
              default_url: CGI.escape(default_url),
              email: email.strip
    end
  end

  def nanugo_config
    Nanugo.config.nanugo
  end

  def gravatar_config
    Nanugo.config.gravatar
  end

  def gravatar_url
    if nanugo_config.https
      gravatar_config.ssl_url
    else
      gravatar_config.plain_url
    end
  end

  def default_url
    gravatar_config.default
  end

end
