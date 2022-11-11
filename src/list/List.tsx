import React, { ForwardedRef, forwardRef, Fragment, useRef } from "react";
import { ListHandler, ListProps } from "./List.types";
import { useIntersectionObserver } from "./useIntersectionObserver";

const ListInner = <T,>(
  {
    list,
    renderItem,
    style,
    hasMore,
    onFetchMore,
    height,
    className,
  }: ListProps<T>,
  ref: ForwardedRef<ListHandler>
) => {
  const loader = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver>();

  useIntersectionObserver({
    containerRef,
    hasMore,
    loader,
    observer,
    onFetchMore,
    ref,
  });

  return (
    <div
      style={height ? { height, overflowY: "auto" } : {}}
      ref={containerRef}
      className={className}
    >
      <div style={style}>
        {list.map((item, index) => (
          <Fragment key={`list-item-${index}`}>{renderItem(item)}</Fragment>
        ))}
      </div>
      <div ref={loader} />
    </div>
  );
};

export const List = forwardRef(ListInner) as <T>(
  props: ListProps<T> & { ref?: React.ForwardedRef<{ resetPage: () => void }> }
) => ReturnType<typeof ListInner>;
