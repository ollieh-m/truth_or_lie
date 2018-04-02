# frozen_string_literal: true

class TruthOrLieController < ApplicationController
  include WebsocketAccessCookie

  def index
    @props = { proposition: Proposition.active.try(:truth_or_lie) }
  end
end
