# encoding: utf-8

class AvatarUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick
  storage :file

  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  version :thumb do
    process :resize_to_fit => [60, 60]
  end

  version :medium do
    process :resize_to_fit => [320, 320]
  end

  version :large do
    process :resize_to_fit => [600, 600]
  end

  def file_storage?
    self.class.storage == CarrierWave::Storage::File
  end

  def extension_white_list
    %w(jpg jpeg gif png)
  end

end
