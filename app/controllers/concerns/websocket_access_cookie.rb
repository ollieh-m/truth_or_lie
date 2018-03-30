module WebsocketAccessCookie
  extend ActiveSupport::Concern

  included do
    before_action :set_websocket_access_cookie
  end

  def set_websocket_access_cookie
    # every request the guest makes with their guest_uuid cookie triggers an update of the guest record, so we can destroy guests inactive for too long
    if uuid_cookie
      Guest.find_by!(uuid: uuid_cookie).touch
    else
      uuid = loop do
        random_token = SecureRandom.uuid
        break random_token unless Guest.exists?(uuid: random_token)
      end

      cookies.signed[:guest_uuid] = {value: uuid, domain: :all}
      Guest.create!(uuid: uuid)
    end
  end

  private

  def uuid_cookie
    @uuid_cookie ||= begin
      puts 'guest uuid cookie' + cookies.signed[:guest_uuid].to_s
      cookies.signed[:guest_uuid]
    end
  end

end
