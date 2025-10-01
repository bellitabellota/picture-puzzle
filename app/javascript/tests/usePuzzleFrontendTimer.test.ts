import { renderHook, act } from '@testing-library/react'; // Use RTL's renderHook
import usePuzzleFrontendTimer from '../components/custom_hooks/usePuzzleFrontendTimer';
import { vi } from 'vitest';

describe("usePuzzleFrontendTimer", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  })

  afterEach(() => {
    vi.useRealTimers();
  })

  it("should not start timer when puzzle is null", () => {
    const { result } = renderHook(() => usePuzzleFrontendTimer(null, null));

    act(() => { vi.advanceTimersByTime(1000) });
    
    expect(result.current.secondsPassed).toBe(0);
  })

  it("should start timer when puzzle exists and secondsToCompletion is null", () => {
    const puzzle = { title: "Fun Test Puzzle" };
    const { result } = renderHook(() => usePuzzleFrontendTimer(puzzle, null));

    act(() => { vi.advanceTimersByTime(1000)});
    
    expect(result.current.secondsPassed).toBe(1);
  })

  it("should stop timer when secondsToCompletion is provided", () => {
    const puzzle = { title: "Fun Test Puzzle" }

    const { result, rerender } = renderHook(({ puzzle, secondsToCompletion }) => { return usePuzzleFrontendTimer(puzzle, secondsToCompletion)}, {
      initialProps: { puzzle, secondsToCompletion: null }
    })
    
    act(() => { vi.advanceTimersByTime(1000)})
    
    expect(result.current.secondsPassed).toBe(1)

    rerender({ puzzle, secondsToCompletion: 10 }) // passing in secondsToCompletion should stop the timer
    
    act(() => { vi.advanceTimersByTime(2000)})
    
    expect(result.current.secondsPassed).toBe(1)
  })

  it("should cleanup on unmount", () => {
    const puzzle = { title: "Fun Test Puzzle" }
    const { result, unmount } = renderHook(() => usePuzzleFrontendTimer(puzzle, null));
    
    act(() => { vi.advanceTimersByTime(1000) })
    
    expect(result.current.secondsPassed).toBe(1)
    
    unmount();
    
    act(() => { vi.advanceTimersByTime(2000) })
    
    expect(result.current.secondsPassed).toBe(1)
  })
})