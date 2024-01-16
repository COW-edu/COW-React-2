# Week17 학습 내용 정리

## useContext, useMemo, useCallback

### useContext

- 컴포넌트 트리를 통해 데이터를 직접 전달하는 것을 방지하는 효율적인 방법이다.
- 부모-자식 관계를 통한 데이터 전달이 아닌, 컨텍스트를 통해 필요한 곳에 직접 데이터를 제공한다.
- 전역 상태 관리가 필요한 경우에 유용하고 컴포넌트가 직접적으로 props를 통해 데이터를 받지 않기 때문에, 컴포넌트의 재사용성이 향상된다.
- 예시)
  - Context 생성
    ```jsx
    // UserContext.js
    import React from "react";

    const UserContext = React.createContext();

    export default UserContext;
    ```
  - Provider를 이용한 Context 값 설정
    ```jsx
    // App.js
    import React from "react";
    import UserContext from "./UserContext";
    import UserProfile from "./UserProfile";

    function App() {
      return (
        <UserContext.Provider value={{ name: "hyunji kim", age: 24 }}>
          <UserProfile />
        </UserContext.Provider>
      );
    }

    export default App;
    ```
  - useContext를 사용한 Context 값 접근
    ```jsx
    // UserProfile.js
    import React, { useContext } from "react";
    import UserContext from "./UserContext";

    function UserProfile() {
      const user = useContext(UserContext);

      return (
        <div>
          <h1>{user.name}</h1>
          <p>Age: {user.age}</p>
        </div>
      );
    }

    export default UserProfile;
    ```
- Provider의 `value`가 변경될 경우, 해당 `useContext`를 사용하는 모든 컴포넌트가 리렌더링 된다.
- 과도한 리렌더링을 방지하기 위해, 값이 자주 변경되는 경우 별도의 컨텍스트로 관리하거나 자식 컴포넌트를 적절히 분리하는 것이 좋다.

### useMemo

- 복잡한 계산이나 무거운 연산을 처리할 때 그 결과를 메모리에 저장함으로써, 동일한 계산의 반복적인 수행을 방지하여 컴포넌트의 성능을 향상시키는 데 사용된다.
- 첫 번째 인자로 "메모이제이션할 값"을 생성하는 함수를, 두 번째 인자로 의존성 배열(dependency array)을 받는다.
- 의존성 배열의 값이 변경될 때만 함수가 실행되고, 결과가 다시 계산된다.
- 예시)
  - 계산 비용이 높은 함수
    ```jsx
    const complexCalculation = (number) => {
      // 복잡한 계산 예시
      return number * 2;
    };
    ```
  - useMemo를 사용한 메모이제이션
    ```jsx
    import React, { useState, useMemo } from "react";

    function MyComponent() {
      const [number, setNumber] = useState(0);
      const [inc, setInc] = useState(0);

      // complexCalculation의 결과를 메모이제이션
      const memoizedValue = useMemo(() => complexCalculation(number), [number]);

      return (
        <div>
          <input
            type="number"
            value={number}
            onChange={(e) => setNumber(+e.target.value)}
          />
          <button onClick={() => setInc((i) => i + 1)}>Increment</button>
          <p>계산 결과: {memoizedValue}</p>
          <p>증가값: {inc}</p>
        </div>
      );
    }
    ```
- 비교적 간단한 계산에 `useMemo`를 사용하면 오히려 오버헤드가 발생할 수 있다.
- 의존성 배열에 포함된 값이 변경될 때만 계산이 재실행되므로, 의존성을 정확히 관리하는 것이 중요하다

### useCallback

- 특정 함수를 메모이제이션하여, 컴포넌트가 리렌더링 될 때마다 동일한 함수를 재생성하지 않도록 해준다.
- 주로 렌더링 성능에 영향을 미칠 수 있는 함수에 사용되며, 특히 자식 컴포넌트에 props로 함수를 전달할 때 유용하다.
- 첫 번째 인자로 "메모이제이션할 함수"를, 두 번째 인자로 의존성 배열(dependency array)을 받는다.
- 예시)
  - 일반함수
    ```jsx
    const increaseCount = () => {
      // 카운트 증가
    };
    ```
  - useCallback을 사용한 메모이제이션
    ```jsx
    import React, { useState, useCallback } from "react";

    function MyComponent() {
      const [count, setCount] = useState(0);

      // increaseCount 함수의 메모이제이션
      const increaseCount = useCallback(() => {
        setCount((c) => c + 1);
      }, [setCount]);

      return (
        <div>
          <p>Count: {count}</p>
          <button onClick={increaseCount}>Increase</button>
        </div>
      );
    }
    ```
- `useCallback`은 주로 렌더링 성능에 영향을 미치는 경우에 사용된다. 예를 들어, 같은 함수를 여러 번 재생성하는 것이 성능에 부정적인 영향을 미칠 때 유용하다
- 또한 자식 컴포넌트에 함수를 props로 전달할 때 특히 유용하다. 자식 컴포넌트가 React.memo로 최적화되어 있다면, 부모 컴포넌트가 리렌더링되어도 자식 컴포넌트는 동일한 함수 prop을 받기 때문에 불필요한 리렌더링을 방지할 수 있다.
