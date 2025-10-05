import {render, screen } from "@testing-library/react";
import PuzzleResults from "../components/PuzzleResults";
import usePuzzleResults from "../components/custom_hooks/usePuzzleResults";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import routes from "../routes/index"

vi.mock("../components/custom_hooks/usePuzzleResults", () => ({
  default: vi.fn(),
}))

describe("PuzzleResults", () => {
  it("renders 'Puzzle Results are loading ...' if isLoading is true", () => {
    usePuzzleResults.mockReturnValue({puzzleResults: [], puzzleTitle: null,  error: null, isLoading: true})
    render(<PuzzleResults />)

    expect(screen.getByText("Puzzle Results are loading ...")).toBeInTheDocument();
  })

  it("renders error message if sePuzzleResults returned an Error", () => {
    usePuzzleResults.mockReturnValue({puzzleResults: [], puzzleTitle: null, error: new Error("server error"), isLoading: false})

    render(<PuzzleResults />)
    expect(screen.getByText("server error")).toBeInTheDocument();
  })

  it("renders puzzleResults and puzzleTitle if usePuzzleResults returned puzzleResults", ()=> {
    const memoryRouter = createMemoryRouter(routes, { initialEntries: ["/123/results"] });
    usePuzzleResults.mockReturnValue({
      puzzleResults: [
        {id: 1, name: "Player 1", secondsToCompletion: 28},
        {id: 2, name: "Player 2", secondsToCompletion: 35},
        {id: 3, name: "Player 3", secondsToCompletion: 68}
      ], 
      puzzleTitle: "Test Puzzle 123", 
      error: null, 
      isLoading: false
    })

    const {container} = render(
      <RouterProvider router={memoryRouter} />
    )

    expect(container).toMatchSnapshot();
  })
})