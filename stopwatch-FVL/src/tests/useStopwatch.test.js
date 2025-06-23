import { renderHook, act } from '@testing-library/react';
import useStopwatch from '../src/shared/hooks/useStopwatch';

describe('useStopwatch', () => {
  it('incrementa el tiempo', () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useStopwatch());
    act(() => {
      result.current.start();
    });
    act(() => {
      jest.advanceTimersByTime(30);
    });
    expect(result.current.elapsed).toBeGreaterThan(0);
    jest.useRealTimers();
  });
});