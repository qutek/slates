import { useEffect, useState } from 'react';

type BodySize = {
  width: number;
  height: number;
};

const useSize = (): BodySize => {
  const [bodySize, setBodySize] = useState<BodySize>({
    width: document.body.offsetWidth,
    height: document.body.offsetHeight,
  });

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === document.body) {
          setBodySize({
            width: entry.contentRect.width,
            height: entry.contentRect.height,
          });
          break;
        }
      }
    });

    const mutationObserver = new MutationObserver(() => {
      setBodySize({
        width: document.body.offsetWidth,
        height: document.body.offsetHeight,
      });
    });

    resizeObserver.observe(document.body);
    mutationObserver.observe(document.body, {
      attributes: true,
      childList: true,
      subtree: true,
    });

    // Cleanup the observers on unmount
    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return bodySize;
};

export default useSize;
