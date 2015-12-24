class UploadsController < ApplicationController
  def create
    link_to_file = UploadService.new(params[:namespace_id], params[:file]).execute

    respond_to do |format|
      if link_to_file
        format.json do
          render json: { link: link_to_file }
        end
      else
        format.json do
          render json: '잘못된 파일입니다.', status: :unprocessable_entity
        end
      end
    end
  end

  def show
    return render_404 if uploader.nil? || !uploader.file.exists?

    disposition = uploader.image? ? 'inline' : 'attachment'
    send_file uploader.file.path, disposition: disposition
  end

  def uploader
    return @uploader if defined?(@uploader)

    @uploader = FileUploader.new(params[:namespace_id], params[:secret])
    @uploader.retrieve_from_store!(params[:filename])

    @uploader

  end

  def image?
    uploader && uploader.file.exists? && uploader.image?
  end
end
