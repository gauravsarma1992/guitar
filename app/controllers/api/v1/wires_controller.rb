class Api::V1::WiresController < ApplicationController

  def index
    render json: params[:guitar_id]
  end

  def create
  end

  def destroy
  end

  def tune
  end

  def guitar_params
  end

end