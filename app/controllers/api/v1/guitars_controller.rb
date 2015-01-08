class Api::V1::GuitarsController < ApplicationController

  def index
    render json: GuitarCollection.all.to_json(:include => [:wires])
  end

  def create
    guitar = GuitarCollection.create(guitar_params)
    { s1: "A", s2: "B", s3: "C", s4: "D", s5: "E", s6: "F"}.each do |i,j|
      guitar.wires.create(title: i, value: j)
    end
    render json: {guitar: GuitarCollection.find(guitar.id).to_json(:include => [:wires])}
  end

  def show
    render json: GuitarCollection.find(params[:id]).to_json(:include => [:wires])
  end

  def destroy
    guitar = GuitarCollection.find(params[:id])
    guitar.delete
    guitar.save
    render json: {message:  'Success'}
  end

  def tune
    guitar = GuitarCollection.find(params[:guitarClicked])
    guitar.wires.map do |i|
      i.value = params[:note] if i.title.eql?(params[:stringClicked])
      i.save
    end
    guitar.save
    render json: guitar
  end

  def guitar_params
      params.permit(:title)
  end

end