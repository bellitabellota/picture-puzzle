import {render, screen, fireEvent } from "@testing-library/react";
import Timer from "../../components/PicturePuzzleChildComponents/Timer"

describe("Timer", ()=> {
  it("formats and displays 0 seconds correctly", () => {
    render(<Timer seconds={0} />);
    expect(screen.getByText("00:00")).toBeInTheDocument();
  });

  it("formats and displays seconds less than a minute correctly", () => {
    render(<Timer seconds={9} />);
    expect(screen.getByText("00:09")).toBeInTheDocument();
  });

  it("formats and displays minutes and seconds correctly", () => {
    render(<Timer seconds={125} />);
    expect(screen.getByText("02:05")).toBeInTheDocument();
  });
})