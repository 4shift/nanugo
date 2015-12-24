module Nanugo
  module CurrentSettings
    def current_application_settings
      key = :current_application_settings

      RequestStore.store[key] ||= begin
        if ActiveRecord::Base.connected? && ActiveRecord::Base.connection.table_exists?('application_settings')
          ApplicationSetting.current || ApplicationSetting.create_from_defaults
        else
          fake_application_settings
        end
      end
    end

    def fake_application_settings
      OpenStruct.new(
          max_attachment_size: Settings.nanugo['max_attachment_size'],
          gravatar_enabled: Settings.gravatar['enabled'],
          gravatar_url: Settings.gravatar['plain_url']
      )
    end
  end
end
