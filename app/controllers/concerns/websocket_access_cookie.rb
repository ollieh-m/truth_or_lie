module WebsocketAccessCookie
  extend ActiveSupport::Concern

  included do
    before_action :set_websocket_access_cookie
  end

  def set_websocket_access_cookie
    cookies.signed[:uuid] = {
      value: SecureRandom.uuid,
      domain: :all
    }
  end

  def delete_websocket_access_cookie
    cookies.delete(:current_user_id, domain: :all)
  end
end
