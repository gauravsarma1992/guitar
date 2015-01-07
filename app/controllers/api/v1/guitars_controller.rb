class Api::V1::GuitarsController < ApplicationController

  def index
    render json: GuitarCollection.all
  end

  def create
    guitar = GuitarCollection.create(guitar_params)
    render json: {guitar: guitar}
  end

  def destroy
    guitar = GuitarCollection.find(params[:id])
    guitar.deleted = true
    guitar.save
    render json: guitar
  end

  def tune
    guitar = GuitarCollection.find(params[:guitarClicked])
    guitar[params[:stringClicked]] = params[:note]
    guitar.save
    render json: guitar
  end

  def guitar_params
      params.permit(:id, :title, :s1, :s2, :s3, :s4, :s5, :s6, :deleted)
  end

end