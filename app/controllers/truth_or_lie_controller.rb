# frozen_string_literal: true

class TruthOrLieController < ApplicationController
  include WebsocketAccessCookie

  def index
    @props = { statement: "Dummy Statement" }
  end
end
