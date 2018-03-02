module WebsocketAccessCookie
  extend ActiveSupport::Concern

  included do
    before_action :set_websocket_access_cookie
  end

  def set_websocket_access_cookie
    unless cookies.signed[:guest_uuid]
      uuid = loop do
        random_token = SecureRandom.uuid
        break random_token unless Guest.exists?(uuid: random_token)
      end

      cookies.signed[:guest_uuid] = {value: uuid, domain: :all}
      Guest.create!(uuid: uuid)
    end
  end

end
