class Settings < Settingslogic
  source "#{Rails.root}/config/nanugo.yml"
  namespace Rails.env

  class << self

    def nanugo_on_standard_port?
      nanugo.port.to_i == (nanugo.https ? 443 : 80)
    end

    def build_nanugo_url
      custom_port = nanugo_on_standard_port? ? nil : ":#{nanugo.port}"
      [ nanugo.protocol,
        "://",
        nanugo.host,
        custom_port,
        nanugo.relative_url_root
      ].join('')
    end

  end

end

# Global Settings
Settings['nanugo'] ||= Settingslogic.new({})
Settings.nanugo['host']            ||= Settings.nanugo.host
Settings.nanugo['https']             = false if Settings.nanugo['https'].nil?
Settings.nanugo['port']            ||= Settings.nanugo.https ? 443 : 80
Settings.nanugo['relative_url_root'] ||= ENV['RAILS_RELATIVE_URL_ROOT'] || ''
Settings.nanugo['protocol']        ||= Settings.nanugo.https ? "https" : "http"
Settings.nanugo['url']             ||= Settings.send(:build_nanugo_url)
Settings.nanugo['max_attachment_size'] ||= 10

# Gravatar Settings
Settings['gravatar'] ||= Settings.new({})
Settings.gravatar['enabled']      = true if Settings.gravatar['enabled'].nil?
Settings.gravatar['plain_url']  ||= 'http://www.gravatar.com/avatar/%{hash}?s=%{size}&d=%{default_url}'
Settings.gravatar['ssl_url']    ||= 'https://secure.gravatar.com/avatar/%{hash}?s=%{size}&d=%{default_url}'
Settings.gravatar['default']    ||= 'https://www.clebee.net/assets/no_avatar.jpg'

# Outgoing emails
Settings['outgoing_emails'] ||= Settingslogic.new({})
Settings['outgoing_emails'].tap do |opts|
  # For backward compatibility. TODO remove in next major release.
  opts['enabled'] ||= Settings.outgoing_emails['enabled']
  opts['from'] ||= Settings.outgoing_emails['from']
  opts['display_name'] ||= Settings.outgoing_emails['display_name']
  opts['reply_to'] ||= Settings.outgoing_emails['reply_to']

  opts['enabled'] ||= opts['enabled'].nil?
  opts['display_name'] ||= "Nanugo"
  opts['from'] ||= "webmaster@#{Settings.nanugo.host}"
  opts['reply_to'] ||= "noreply@#{Settings.nanugo.host}"
  opts['delivery_method'] ||= :smtp
  opts['sendmail_settings'] ||= {}
  opts['smtp_settings'] ||= {}
end
