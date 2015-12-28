module V1
  class ItemsController < BaseController
    skip_before_action :authenticate_user_from_token!, except: [:index, :show]
    load_and_authorize_resource :item

    def index
      @items = Item.includes(:user).all
      @items = @items.in_department(params[:department]) if params[:department].present?
      @items = @items.in_subcategory(params[:subcategory]) if params[:subcategory].present?
      @items = @items.paginate(page: params[:page]).order(created_at: :desc)

      render json: @items, each_serializer: ItemSerializer, meta: {
                    current_page: @items.current_page,
                    next_page: @items.next_page,
                    prev_page: @items.previous_page,
                    total_pages: @items.total_pages,
                    total_count: @items.total_entries
                  }
    end

    private

    def item_params
      params.require(:item).permit(:title, :department, :subcategory, :size_type, :structured_size,
                                   :desc, :condition, :price, :location,
                                   :first_image, :second_image, :third_image, :fourth_image,
                                   :latitude, :longitude, :user_id, fulfillment_option_ids: [])
    end
  end
end
