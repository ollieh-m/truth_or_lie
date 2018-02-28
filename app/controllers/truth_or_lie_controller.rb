# frozen_string_literal: true

class TruthOrLieController < ApplicationController
  def index
    @props = { statement: "Dummy Statement" }
  end
end
