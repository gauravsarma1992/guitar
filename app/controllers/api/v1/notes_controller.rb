class Api::V1::NotesController < ApplicationController

  def index
    render json: Note.all
  end

  def create
  end

  def show
  end

  def destroy
  end

  def tune
  end

  def guitar_params
  end

end