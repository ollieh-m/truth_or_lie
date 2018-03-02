module ApplicationCable
  class Connection < ActionCable::Connection::Base

    identified_by :current_guest

    def connect
      self.current_guest = find_verified_guest
    end

    protected

    def find_verified_guest
      puts cookies.signed[:guest_uuid]
      if guest = Guest.find_by(uuid: cookies.signed[:guest_uuid])
        guest
      else
        reject_unauthorized_connection
      end
    end

  end
end
