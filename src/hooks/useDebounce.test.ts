import useDebounce from "./useDebounce";
import { useEffect, useState } from "react";
import { renderHook, act } from "@testing-library/react";

jest.useFakeTimers();

test("should call function after a delay", () => {
  const delayedFunction: any = jest.fn();

  renderHook(() =>
    useDebounce(() => {
      delayedFunction();
    }, 300)
  );

  jest.advanceTimersByTime(300);

  expect(delayedFunction).toBeCalled();
});
