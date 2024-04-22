import { useEffect, useState, useRef } from "react";

type ElementSize = {
  width: number;
  height: number;
};

type ElementData = ElementSize & { elementRef: React.RefObject<HTMLDivElement> };

const useElementSize = (): ElementData => {
  const [elementSize, setElementSize] = useState<ElementSize>({
    width: 0,
    height: 0,
  });

  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getElementSize = (): ElementSize => {
      const { current: element } = elementRef;
      if (element) {
        return {
          width: element.offsetWidth,
          height: element.offsetHeight,
        };
      }
      return { width: 0, height: 0 };
    };

    setElementSize(getElementSize());

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === elementRef.current) {
          setElementSize(getElementSize());
          break;
        }
      }
    });

    if (elementRef.current) {
      resizeObserver.observe(elementRef.current);
    }

    // Cleanup the ResizeObserver on unmount
    return () => {
      if (elementRef.current) {
        resizeObserver.unobserve(elementRef.current);
      }
    };
  }, []);

  return {
    elementRef,
    ...elementSize,
  };
};

export default useElementSize;
