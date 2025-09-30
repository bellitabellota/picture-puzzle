import {render, screen } from "@testing-library/react";
import CheckMark from "../../components/PicturePuzzleChildComponents/CheckMark";

describe("CheckMark", ()=>{

  const mockIdentifiedTargets = [
    { name: "Target 1", xCenter: 300, yCenter: 200 },
    { name: "Target 2", xCenter: 100, yCenter: 100 }
  ]

  const mockResolution=[1200, 800];

  const mockImgRefDecreased = {
    current: {
      getBoundingClientRect: () => ({
        width: 600,
        height: 400,
      }),
    },
  };

  it("renders CheckMarks for identified targets", ()=> {
    render(<CheckMark identifiedTargets={mockIdentifiedTargets} imgRef={mockImgRefDecreased} resolution={mockResolution} />)

    const checkMarks = screen.getAllByRole('img', { className: 'check-mark' });
    expect(checkMarks).toHaveLength(mockIdentifiedTargets.length);
  })

  describe("sizing image to half of its size", ()=> {
    it("positions CheckMarks correctly based on scaling factors", () => {
      render(<CheckMark identifiedTargets={mockIdentifiedTargets} imgRef={mockImgRefDecreased} resolution={mockResolution} />)
  
      const checkMarks = screen.getAllByRole('img', { className: 'check-mark' });
  
      // Considering the mock values for resolution(600/1200) and getBoundingClientRect (400/800), the image has sized down half of its size.
      // --> First target (300,200) should be at (150,100) after scaling
      // --> Second target (100,100) should be at (50,50) after scaling
      
      expect(checkMarks[0]).toHaveStyle({left: '150px', top: '100px'});
      expect(checkMarks[1]).toHaveStyle({left: '50px', top: '50px'});
    });
  })

  describe("increasing image size by 25%", ()=> {
    it("positions CheckMarks correctly based on scaling factors", () => {
      const mockImgRefIncreased = {
        current: {
          getBoundingClientRect: () => ({
            width: 1500,
            height: 1000,
          }),
        },
      };

      render(<CheckMark identifiedTargets={mockIdentifiedTargets} imgRef={mockImgRefIncreased} resolution={mockResolution} />)
  
      const checkMarks = screen.getAllByRole('img', { className: 'check-mark' });
  
      // Considering the mock values for resolution(600/1200) and getBoundingClientRect (1500/100), the image size has increased 25%.
      // --> First target (300,200) should be at (375,250) after scaling
      // --> Second target (100,100) should be at (125,125) after scaling
      
      expect(checkMarks[0]).toHaveStyle({left: '375px', top: '250px'});
      expect(checkMarks[1]).toHaveStyle({left: '125px', top: '125px'});
    });
  })
})