import {render, screen, fireEvent } from "@testing-library/react";
import SelectBoxContainer from "../../components/PicturePuzzleChildComponents/SelectBoxContainer";

describe("SelectBoxContainer", ()=> {
  const mockTargets = [
    { name: "Test Target 1" },
    { name: "Test Target 2" },
    { name: "Test Target 3" },
  ];
  const mockClickedCoordinates = {
    scaledX: 100,
    scaledY: 150,
  };

  const mockSelectBox = { current: null };
  const mockSelectName = vi.fn();

  it("displays the name of the targets", ()=>{
    render(<SelectBoxContainer clickedCoordinates={mockClickedCoordinates} selectBox={mockSelectBox} targets={mockTargets} selectName={mockSelectName} />)

    mockTargets.forEach((target) => {
      expect(screen.getByText(target.name)).toBeInTheDocument();
    });
  })

  it("calls the clickHandler if OK is clicked", ()=> {
    // that the clickHandler sets the selectedName state variable and removes the box from the screen needs to be tested in the parent component
    render(<SelectBoxContainer clickedCoordinates={mockClickedCoordinates} selectBox={mockSelectBox} targets={mockTargets} selectName={mockSelectName} />)

    const okButton = screen.getByText("OK");

    fireEvent.click(okButton);
    expect(mockSelectName).toHaveBeenCalledTimes(1);
  })
})