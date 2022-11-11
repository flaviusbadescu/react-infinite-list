import { CSSProperties, ReactNode } from "react";

export type ListProps<T> = {
  list: T[];
  renderItem: (item: T) => ReactNode;
  style?: CSSProperties;
  hasMore: boolean;
  onFetchMore: (page: number) => void;
  currentPage?: number;
  /**
   * If height is set, the list will be scrollable else it will use the window scroller
   */
  height?: number;
  className?: string;
};

export type ListHandler = {
  resetPage: () => void;
  scrollToTop: () => void;
};
