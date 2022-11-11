import { useCallback, useEffect, useImperativeHandle, useState } from "react";
import { ListHandler } from "./List.types";

type ArgProps = {
  hasMore: boolean;
  onFetchMore: (page: number) => void;
  observer: React.MutableRefObject<IntersectionObserver | undefined>;
  containerRef: React.MutableRefObject<HTMLDivElement | null>;
  loader: React.MutableRefObject<HTMLDivElement | null>;
  ref?: React.ForwardedRef<ListHandler>;
};

export const useIntersectionObserver = ({
  containerRef,
  hasMore,
  loader,
  observer,
  onFetchMore,
  ref,
}: ArgProps) => {
  const [page, setPage] = useState(1);

  useImperativeHandle(ref, () => ({
    resetPage: () => setPage(1),
    scrollToTop: () => {
      containerRef.current?.scrollTo(0, 0);
    },
  }));

  useEffect(() => {
    if (page !== 1 && hasMore) {
      onFetchMore(page);
    }

    if (!hasMore && observer.current) {
      observer.current.disconnect();
    }
  }, [page, hasMore]);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore) {
        setPage((prev) => prev + 1);
      }
    },
    [hasMore]
  );

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0,
    };

    observer.current = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.current.observe(loader.current);
    }
  }, [handleObserver]);
};
