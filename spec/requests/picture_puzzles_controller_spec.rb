require "rails_helper"

RSpec.describe "PicturePuzzlesController", type: :request do
  before do
    create(:picture_puzzle)
    create(
      :picture_puzzle,
      title: "Test Puzzle 2",
      image_src: "/picture-puzzle-images/test-puzzle-1.jpg"
    )
    create(
      :picture_puzzle,
      title: "Test Puzzle 3",
      image_src: "/picture-puzzle-images/test-puzzle-3.jpg"
    )
  end

  describe "GET /picture_puzzles (#index)" do
    before do
      get "/api/v1/picture_puzzles"
    end

    it "renders the response as json" do
      expect(response.content_type).to eq("application/json; charset=utf-8")
    end

    it "returns all puzzles" do
      number_returned_puzzles = JSON.parse(response.body).length
      expect(number_returned_puzzles).to be(3)
    end

    it "returned puzzles contain only id, title, and image source" do
      puzzles = JSON.parse(response.body)
      first_puzzle = puzzles[0]

      expect(first_puzzle).to eql({ "id"=>1, "title"=>"Test Puzzle 1", "imageSrc"=>"/picture-puzzle-images/test-puzzle-1.jpg" })
    end

    it "returns the status code 200" do
      expect(response).to have_http_status(:success)
    end
  end

  describe "session management" do
    it "sets a session cookie in the response when no session exists" do
      get "/api/v1/picture_puzzles"
      expect(response.headers["set-cookie"]).to match(/_session=/)
    end

    it "preserves the existing session cookie" do
      get "/api/v1/picture_puzzles"
      original_player_id = session[:player_id]

      get "/api/v1/picture_puzzles", headers: { "Cookie" => response.headers["Set-Cookie"] }

      expect(session[:player_id]).to eql(original_player_id)
    end
  end

  describe "GET /picture_puzzle/:id (#show)" do
    before do
      get "/api/v1/picture_puzzles/1"
    end

    it "renders the response as json" do
      expect(response.content_type).to eq("application/json; charset=utf-8")
    end

    it "returns the puzzle with only the required attributes (targets only containing name, not coordinates)" do
      puzzle = JSON.parse(response.body)

      expect(puzzle["id"]).to eql(1)
      expect(puzzle["imageSrc"]).to eql("/picture-puzzle-images/test-puzzle-1.jpg")
      expect(puzzle["taskDescription"]).to eql("Find object 1 and 2.")
      expect(puzzle["resolutionWidth"]).to eql(1000)
      expect(puzzle["resolutionHeight"]).to eql(674)
      expect(puzzle["targets"]).to eql([ { "name"=>"Test Object 1" }, { "name"=>"Test Object 2" }, { "name"=>"Test Object 3" } ])
    end

    it "returns the status code 200" do
      expect(response).to have_http_status(:success)
    end
  end
end
