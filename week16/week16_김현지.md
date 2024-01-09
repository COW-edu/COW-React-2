# Week16 학습내용 정리

## React

- 사용자 인터페이스를 만들기 위한 JavaScript 라이브러리

### React hook

> *Hook*은 class를 작성하지 않고도 state와 다른 React의 기능들을 사용할 수 있게 해주며, 함수 컴포넌트에서 React state와 생명주기 기능(lifecycle features)을 “연동(hook into)” 할 수 있게 해주는 함수이다.

- "React Hook"은 React 16.8 버전에 도입된 새로운 기능으로 함수형 컴포넌트에서도 상태 관리와 같은 React의 여러 기능들을 사용할 수 있게 해준다.
- 이전에는 클래스 기반 컴포넌트에서만 사용할 수 있었던 여러 기능들을, Hook을 통해 함수형 컴포넌트에서도 사용할 수 있게 되었다.
- 대표적인 React Hook으로는 **`useState`**, **`useEffect`**, **`useContext`** 등이 있다.

---

- **함수형 컴포넌트, 클래스형 컴포넌트**
  - 함수형 컴포넌트: props를 입력으로 받아서 React 요소를 반환
    ```jsx
    function Welcome(props) {
      return <h1>Hello, {props.name}</h1>;
    }
    ```
  - 클래스형 컴포넌트: **`render`** 메소드를 가지며, 이 메소드는 React 요소를 반환
    ```jsx
    class Welcome extends React.Component {
      render() {
        return <h1>Hello, {this.props.name}</h1>;
      }
    }
    ```

### useState

- **`useState`**는 React Hook 중 하나로, 함수형 컴포넌트에서 상태관리를 가능하게 해준다.

```jsx
import React, { useState } from "react";

function ExampleComponent() {
  // useState를 호출하고 초기 상태 값을 전달
  const [state, setState] = useState(initialState);
  // ...
}
```

- **`useState(initialState)`**: 초기 상태를 설정, **`initialState`**는 상태의 초기값이 된다.
- **`useState`**는 두 개의 값을 가진 배열을 반환한다.
  - **`state`**: 현재 상태의 값
  - **`setState`**: 상태를 업데이트하는 함수이다. 이 함수를 호출하여 상태를 변경할 수 있다.
- ex)
  ```jsx
  function Counter() {
    const [count, setCount] = useState(0);

    return (
      <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>Click me</button>
      </div>
    );
  }
  ```
  - **`useState(0)`**은 카운터의 초기 상태를 0으로 설정
  - **`count`**는 현재 카운트 값을 나타내며, **`setCount`**는 카운트 값을 업데이트하는 함수
  - 버튼을 클릭할 때마다 **`setCount`** 함수가 호출되어 **`count`** 상태가 업데이트

### useEffect

- `useEffect` 는 React Hook 중 하나로, 함수형 컴포넌트에서 side effects를 수행할 수 있게 해준다
- 클래스형 컴포넌트에서의 **`componentDidMount`**, **`componentDidUpdate`**, **`componentWillUnmount`**와 같은 라이프사이클 메소드의 기능을 대체한다

```jsx
import React, { useEffect } from "react";

function ExampleComponent() {
  useEffect(() => {
    // side effects를 수행하는 코드
    return () => {
      // ...
    };
  }, [dependencies]);
}
```

- use Effect 함수는 두 개의 인자를 받는다.
  - 첫 번째 인자: side effects를 수행하는 함수, 이 함수는 컴포넌트가 렌더링될 때마다 실행된다.
  - 두 번째 인자: dependencies array, 이 배열에 지정된 값들이 변경될 때만 side effects 함수가 실행된다. 배열이 비어 있으면, side effects 함수는 컴포넌트가 마운트될 때 한 번만 실행된다.
- ex)
  ```jsx
  function ExampleComponent() {
    useEffect(() => {
      // 컴포넌트가 마운트되거나 업데이트될 때 실행될 코드
      console.log("Component was mounted or updated");

      return () => {
        // 컴포넌트가 언마운트되기 전에 실행될 코드
        console.log("Component will unmount");
      };
    }, []); // 의존성 배열이 비어있으므로, 마운트될 때 한 번만 실행된다

    // 컴포넌트 렌더링 로직
    return <div>...</div>;
  }
  ```
