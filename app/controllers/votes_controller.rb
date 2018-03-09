class VotesController < ApplicationController

  def create
    # TO DO
    # check permission to vote - uuid present and no vote already cast for this proposition
    # save vote for the proposition
    # do not accept vote if there is no active statement or if there is a revealed statement
  end

end
