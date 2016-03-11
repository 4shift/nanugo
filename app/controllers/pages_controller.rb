class PagesController < ApplicationController
  include HighVoltage::StaticPage

  skip_before_action :authenticate_user!
  skip_authorization_check

  def home
  end

  def privacy
  end

  def terms
  end
end
