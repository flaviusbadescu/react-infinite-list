# react-infinite-list-observer

Simple screen and webcam recording hook

# install

```
npm install react-infinite-list-observer
```

or

```
yarn add rreact-infinite-list-observer
```

# usage

```
const listRef = useRef<ListHandler>(null);
  
const onSomething = () => {
         if (listRef.current) {
            listRef.current.resetPage();
            listRef.current.scrollToTop();
          }
]

 <List
        ref={listRef}
        hasMore={hasMore}
        list={items}
        height={400} // optional
        onFetchMore={fetchMore}
        renderItem={(item) => {
          return (
           <div key={item.id}>{item.name}</div>
          );
        }}
      />
```

#props

| Prop | description |
| --- | ----------- |
| list | T |
| renderItem | method returns JSX |
| hasMore | boolean |
| onFetchMore | method used to fetch more data |
| currentPage | optional - number |
| height | optional - number |
| className | used for styling | 
| ref | optional: attach ref - allows you to reset the page / scroll to top |




