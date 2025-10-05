import PicturePuzzles from "../components/PicturePuzzles";
import usePicturePuzzles from "../components/custom_hooks/usePicturePuzzles";
import {render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import routes from "../routes/index"

vi.mock("../components/custom_hooks/usePicturePuzzles", () => ({
  default: vi.fn()
}))

describe("PicturePuzzles", ()=> {
  it("renders 'Puzzles are loading ...' when isLoading is true", () => {
    usePicturePuzzles.mockReturnValue({picturePuzzles: [], error: null, isLoading: true})
    render(<PicturePuzzles />)

    expect(screen.getByText("Puzzles are loading ...")).toBeInTheDocument();
  })

  it("renders error message if usePicturePuzzles returned an Error", () => {
    usePicturePuzzles.mockReturnValue({picturePuzzles: [], error: new Error("server error"), isLoading: false})

    render(<PicturePuzzles />)
    expect(screen.getByText("server error")).toBeInTheDocument();
  })

  it("renders homepage with picturePuzzles if usePicturePuzzles returned picturePuzzles", ()=> {
    const memoryRouter = createMemoryRouter(routes);
    usePicturePuzzles.mockReturnValue({picturePuzzles: [
      {
        id: 1, title: 'Test Puzzle 1', imageSrc: '/picture-puzzle-images/test-puzzle-1.jpg'
      }, 
      {
        id: 2, title: 'Test Puzzle 2', imageSrc: '/picture-puzzle-images/test-puzzle-2.jpg'
      }
    ], error: false, isLoading: false})

    const {container} = render(
      <RouterProvider router={memoryRouter}></RouterProvider>
    )

    expect(container).toMatchSnapshot();
  })
});