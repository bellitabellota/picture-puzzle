class Api::V1::PicturePuzzlesController < ApplicationController
  before_action :set_player_id

  def index
    puzzles = PicturePuzzle.all

    filtered_puzzles = puzzles.map do |puzzle|
      { id: puzzle.id,
        title: puzzle.title,
        imageSrc: puzzle.image_src
      }
    end

    render json: filtered_puzzles
  end

  def show
    puzzle = PicturePuzzle.find(params[:id])

    render json: {
      id: puzzle.id,
      title: puzzle.title,
      imageSrc: puzzle.image_src,
      taskDescription: puzzle.task_description,
      resolutionWidth: puzzle.resolution_width,
      resolutionHeight: puzzle.resolution_height,
      targets: puzzle.targets.map { |t| { name: t["name"] } },
      createdAt: puzzle.created_at,
      updatedAt: puzzle.updated_at
    }
  end

  private

  def set_player_id
    session[:player_id] = session[:player_id] || SecureRandom.uuid
  end
end
