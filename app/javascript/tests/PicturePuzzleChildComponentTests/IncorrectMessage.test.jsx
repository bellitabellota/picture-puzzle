import {render, screen } from "@testing-library/react";
import IncorrectMessage from "../../components/PicturePuzzleChildComponents/IncorrectMessage";

describe("IncorrectMessage", () => {
  const testMessage = "Test incorrect message";
  const mockSetIncorrectMessage = vi.fn();

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  })

  it("renders the given message", () => {
    render(<IncorrectMessage message={testMessage} setIncorrectMessage={mockSetIncorrectMessage} />)

    expect(screen.getByText(testMessage)).toBeInTheDocument();
  })

  it("clears message after 2 seconds", () => {
    render(
      <IncorrectMessage 
        message={testMessage} 
        setIncorrectMessage={mockSetIncorrectMessage} 
      />
    );

    expect(screen.getByText(testMessage)).toBeInTheDocument();
    
    vi.advanceTimersByTime(2000);
    
    expect(mockSetIncorrectMessage).toHaveBeenCalledTimes(1);
    expect(mockSetIncorrectMessage).toHaveBeenCalledWith(null);
  })

})