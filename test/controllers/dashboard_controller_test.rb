require 'test_helper'

class DashboardControllerTest < ActionController::TestCase
  test "should get table" do
    get :table
    assert_response :success
  end

end
