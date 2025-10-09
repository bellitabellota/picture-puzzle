import {fireEvent, render, screen } from "@testing-library/react";
import RecordTimeModal from "../../components/PicturePuzzleChildComponents/RecordTimeModal";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import usePostResult from "../../components/custom_hooks/usePostResult";

vi.mock("../../components/custom_hooks/usePostResult", () => ({ 
  default: vi.fn()} 
))

describe("RecordTimeModal", ()=> {
  const router = createMemoryRouter(
    [{
      path: "/:id",
      element: <RecordTimeModal secondsToCompletion={30} />,
    }], 
    { initialEntries: ["/1"] }
  );
 
  it("displays the formatted seconds when time under 1 minute", ()=> {
    usePostResult.mockReturnValue({ resultSaved: false, saveResultError: null })
    render(<RouterProvider router={router} />)
    expect(screen.getByText("You solved the puzzle in 30 seconds.")).toBeInTheDocument();
  })

  it("displays the formatted minutes and seconds when time over 1 minute", ()=> {
    usePostResult.mockReturnValue({ resultSaved: false, saveResultError: null })
    const routerOverOneMinute = createMemoryRouter(
      [{
        path: "/:id",
        element: <RecordTimeModal secondsToCompletion={90} />,
      }],
       { initialEntries: ["/1"] }
    );

    render(<RouterProvider router={routerOverOneMinute} />)

    expect(screen.getByText("You solved the puzzle in 1 minute(s) and 30 seconds.")).toBeInTheDocument();
  })

  it("displays an alert when submitting empty input field", ()=>{
    usePostResult.mockReturnValue({ resultSaved: false, saveResultError: null })
    const mockAlert = vi.spyOn(window, 'alert').mockImplementation(() => {});

    render(<RouterProvider router={router} />)
    const button = screen.getByText("Record Time");
    fireEvent.click(button);

    expect(mockAlert).toHaveBeenCalledWith("Enter a name to record your time.");
    mockAlert.mockRestore();
  })

  it("displays an error message when usePostResult returns an error", ()=>{
    usePostResult.mockReturnValue({ resultSaved: false, saveResultError: new Error("Test error") })

    render(<RouterProvider router={router} />);
    
    expect(screen.getByText(/Test error - The puzzle result could not be saved./)).toBeInTheDocument();
  })

  it("redirects to results page when resultSaved becomes true", () => {
    usePostResult.mockReturnValue({ resultSaved: true, saveResultError: null })

    const memoryRouter = createMemoryRouter(
      [{ path: "/:id", element: <RecordTimeModal secondsToCompletion={30} /> },
       { path: "/:id/results", element: <div>Results Page</div>}],
      { initialEntries: ["/123"] }
    );
  
    render(<RouterProvider router={memoryRouter} />);
    
    expect(screen.getByText("Results Page")).toBeInTheDocument();
  })
})