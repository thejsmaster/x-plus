# x-plus

### Easy State Management

**x-plus** is a library that makes the state management easy for react. it offers a custom hook called **useX** that takes a class as prop and returns an object whose properties are **state** , **set**. **state** is an instance to class thats passed. and **set** takes a function (usually a method of the **state**) that changes the state.

### Installation

To install x-plus, run:

```sh
npm install x-plus
```

### Playground

https://stackblitz.com/edit/vitejs-vite-yecopw?file=src%2FApp.tsx&terminal=dev

With Devtools enabled :
https://stackblitz.com/edit/vitejs-vite-og4cza?file=src%2Findex.css&terminal=dev

### Usage

```typescript
import { useX } from "x-plus";
import { useEffect } from "react";

class Counter {
  count = 0;
  incr() {
    this.count++;
  }
  memos = {
    countPlus2: 0,
  };
  onChange() {
    this.memos.countPlus2 = this.count + 2;
  }
}

function App() {
  const { state, set, stateChanged } = useX(Counter);
  useEffect(() => {
    console.log("state changed");
  }, [stateChanged]);
  return (
    <>
      <div> {state.count}</div> <div>Memo: {state.memos.countPlus2}</div>
      <button onClick={() => set(state.incr)}>Click to increment</button>
    </>
  );
}

export default App;
```

### API

### useX

it's a custom hook that connects a class with a component. it returns instance of that class that can be used in a component.

```typescript
import { useX } from "x-plus";
```

**Usage**

Building State:

```typescript
class Counter {
  count = 0;
  incr() {
    this.count++;
  }
  memos = {
    countPlus2: 0,
  };
  onChange() {
    this.memos.countPlus2 = this.count + 2;
  }
}
```

in component file. similar to useState except it returns an object.

```typescript
const { state, set } = useX(Counter);
```

in html:

```jsx
<div onClick={() => set(state.incr)}>{state.count} </div>
```

in the line above, **set** method takes a function. and calls it which updates the count value. and it renders that portion of the html that's changed.

## Contributing

Contributions are always welcome! If you find a bug or want to add a feature, please open an issue or submit a pull request.

Before submitting a pull request, please make sure to:

- Add tests for any new functionality.
- Update the README.md file to include any new options or changes to the API.
