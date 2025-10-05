class Api::V1::PuzzleResultsController < ApplicationController
  include ActionView::Helpers::SanitizeHelper

  def index
    results = PuzzleResult.where(picture_puzzle_id: params[:picture_puzzle_id]).order(:seconds_to_completion)

    formatted_results = []
    results.each do |result|
      formatted_results.push({
        id: result.id,
        name: result.name,
        secondsToCompletion: result.seconds_to_completion
      })
    end

    picture_puzzle = PicturePuzzle.find(params[:picture_puzzle_id])

    render json: { puzzleTitle: picture_puzzle.title, results: formatted_results }
  end

  def create
    puzzle = PicturePuzzle.find(params[:picture_puzzle_id])

    puzzle_timer = PuzzleTimer.find_by(picture_puzzle_id: params[:picture_puzzle_id], player_id_session: session[:player_id])
    seconds_to_completion = (puzzle_timer.end_time - puzzle_timer.start_time).floor

    tags = %w[a acronym b strong i em li ul ol h1 h2 h3 h4 h5 h6 blockquote br cite sub sup ins p]
    sanitized_player_name = sanitize(params[:puzzle_result][:player_name], tags: tags, attributes: %w[href title])

    result = puzzle.puzzle_results.create(name: sanitized_player_name, seconds_to_completion: seconds_to_completion)

    if result.persisted?
      render json: { message: "Puzzle result successfully saved." }
    else
      render json: { error: "Puzzle result could not be saved." }, status: :unprocessable_entity
    end
  end
end
