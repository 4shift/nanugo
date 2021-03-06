class ItemsController < ApplicationController
  before_filter :authenticate_user!, except: [:index, :show]
  load_and_authorize_resource :item

  # GET /items
  def index
    @items = Item.all

    respond_to do |format|
      format.html
    end
  end

  # GET /items/1
  def show
  end

  # GET /items/new
  def new
    @item = Item.new
  end

  # GET /items/1/edit
  def edit
  end

  # POST /items
  def create
    @item = Item.new(item_params)
    @item.department = parameterlize params[:department] if params[:department].present?
    @item.subcategory = parameterlize params[:subcategory] if params[:subcategory].present?

    if @item.save
      redirect_to @item, notice: 'Item was successfully created.'
    else
      render :new
    end
  end

  # PATCH/PUT /items/1
  def update
    if @item.update(item_params)
      redirect_to @item, notice: 'Item was successfully updated.'
    else
      render :edit
    end
  end

  # DELETE /items/1
  def destroy
    @item.destroy
    redirect_to items_url, notice: 'Item was successfully destroyed.'
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_item
      @item = Item.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def item_params
      params.require(:item).permit(:title, :department, :subcategory, :size_type, :structured_size,
                                   :desc, :condition, :price, :location,
                                   :first_image, :second_image, :third_image, :fourth_image,
                                   :latitude, :longitude, :user_id, fulfillment_option_ids: [])
    end
end
