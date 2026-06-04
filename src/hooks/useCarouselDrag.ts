import { useRef, useCallback } from "react";

export type CarouselDragHandlers = {
  onPointerDown: (event: React.PointerEvent<HTMLDivElement>) => void;
  onPointerMove: (event: React.PointerEvent<HTMLDivElement>) => void;
  onPointerUp: (event: React.PointerEvent<HTMLDivElement>) => void;
  onPointerCancel: (event: React.PointerEvent<HTMLDivElement>) => void;
  onClickCapture: (event: React.MouseEvent<HTMLDivElement>) => void;
};

export default function useCarouselDrag(scrollerRef: React.RefObject<HTMLDivElement | null>): CarouselDragHandlers {
  const dragStateRef = useRef({
    pointerId: null as number | null,
    startX: 0,
    startScrollLeft: 0,
    isDragging: false,
    suppressClick: false
  });

  const handlePointerDown = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const element = scrollerRef.current;
    if (!element) return;

    dragStateRef.current.pointerId = event.pointerId;
    dragStateRef.current.startX = event.clientX;
    dragStateRef.current.startScrollLeft = element.scrollLeft;
    dragStateRef.current.isDragging = false;
    dragStateRef.current.suppressClick = false;
  }, [scrollerRef]);

  const handlePointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const element = scrollerRef.current;
    if (!element) return;

    if (dragStateRef.current.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - dragStateRef.current.startX;
    const dragThreshold = 8;

    if (!dragStateRef.current.isDragging) {
      if (Math.abs(deltaX) < dragThreshold) {
        return;
      }

      dragStateRef.current.isDragging = true;
      dragStateRef.current.suppressClick = true;

      element.setPointerCapture(event.pointerId);
    }

    element.scrollLeft = dragStateRef.current.startScrollLeft - deltaX;
  }, [scrollerRef]);

  const handlePointerEnd = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const element = scrollerRef.current;
    if (!element) return;

    if (dragStateRef.current.pointerId !== event.pointerId) return;

    if (element.hasPointerCapture(event.pointerId)) {
      element.releasePointerCapture(event.pointerId);
    }

    dragStateRef.current.pointerId = null;
    dragStateRef.current.isDragging = false;
    dragStateRef.current.suppressClick = false;
  }, [scrollerRef]);

  const handleClickCapture = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (!dragStateRef.current.suppressClick) return;

    event.preventDefault();
    event.stopPropagation();
    dragStateRef.current.suppressClick = false;
  }, []);

  return {
    onPointerDown: handlePointerDown,
    onPointerMove: handlePointerMove,
    onPointerUp: handlePointerEnd,
    onPointerCancel: handlePointerEnd,
    onClickCapture: handleClickCapture
  };
}
