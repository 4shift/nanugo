require 'test_helper'

class ItemsControllerTest < ActionController::TestCase
  setup do
    @item = items(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:items)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create item" do
    assert_difference('Item.count') do
      post :create, item: { category_id: @item.category_id, condition_id: @item.condition_id, desc: @item.desc, image1,: @item.image1,, image2,: @item.image2,, image3,: @item.image3,, image4: @item.image4, method: @item.method, price: @item.price, price: @item.price, price: @item.price, price: @item.price, price: @item.price, price: @item.price, title: @item.title }
    end

    assert_redirected_to item_path(assigns(:item))
  end

  test "should show item" do
    get :show, id: @item
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @item
    assert_response :success
  end

  test "should update item" do
    patch :update, id: @item, item: { category_id: @item.category_id, condition_id: @item.condition_id, desc: @item.desc, image1,: @item.image1,, image2,: @item.image2,, image3,: @item.image3,, image4: @item.image4, method: @item.method, price: @item.price, price: @item.price, price: @item.price, price: @item.price, price: @item.price, price: @item.price, title: @item.title }
    assert_redirected_to item_path(assigns(:item))
  end

  test "should destroy item" do
    assert_difference('Item.count', -1) do
      delete :destroy, id: @item
    end

    assert_redirected_to items_path
  end
end
