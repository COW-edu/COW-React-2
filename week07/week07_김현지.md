# Week07 학습내용 정리

## 계산기

### 함수중복제거(고차함수)

- 함수에서 중복을 제거할 때 달라지는 부분을 매개변수로 만들면 된다
- 고차함수(high order function) : 함수가 함수를 리턴하는 함수

```jsx
// 중복 제거 전 코드

document.querySelector("#num-0").addEventListener("click", () => {
  if (operator) {
    numTwo += "0";
  } else {
    numOne += "0";
  }
  $result.value += "0";
});
document.querySelector("#num-1").addEventListener("click", () => {
  if (operator) {
    numTwo += "1";
  } else {
    numOne += "1";
  }
  $result.value += "1";
});
document.querySelector("#num-2").addEventListener("click", () => {
  if (operator) {
    numTwo += "2";
  } else {
    numOne += "2";
    $result.value += "2";
  }
});
```

```jsx
// 고차 함수를 이용해서 중복 제거

const onClickNumber = (number) => (event) => {
      if(operator) {
        numTwo += number;
      } else {
        numOne += number;
      }
      $result.value += number;
      };
    }
document.querySelector('#num-0').addEventListener('click', onClickNumber(0));
document.querySelector('#num-1').addEventListener('click', onClickNumber(1));
document.querySelector('#num-1').addEventListener('click', onClickNumber(2));
```

### event 객체로 중복 제거

```jsx
const onClickNumber = (event) =>
      if(operator) {
        numTwo += event.target.textContent; // textContent: 문자열
      } else {
        numOne += event.target.textContent;
      }
      $result.value += event.target.textContent;
      };
    }

    document.querySelector('#num-0').addEventListener('click', onClickNumber(0));
```

### if문 중첩 줄이기

1.  if문 다음에 나오는 공통된 절차를 각 분기점 내부에 넣는다.
2.  분기점에서 짧은 절차부터 실행하게 if문을 작성한다.
3.  짧은 절차가 끝나면 return(함수 내부의 경우)이나 break(for 문 내부의 경우)로 중단한다
4.  else를 제거한다(이때 중첩하나가 제거된다)

```jsx
// 중첩 줄이기 전
const onClickNumber = (event) => {
  if (opreator) {
    //비어 있지 않다.
    if (!numTwo) {
      $result.value = "";
    }
    numTwo += event.target.textContent;
  } else {
    //비어 있다.
    numOne += event.target.textContent;
  }
  $result.value += event.target.textContent;
};
```

```jsx
// 중첩 줄인 후
const onClickNumber = (event) => {
  if (!opreator) {
    //비어 있다.
    numOne += event.target.textContent;
    $result.value += event.target.textContent;
    return;
  }
  if (!numTwo) {
    $result.value = "";
  }
  numTwo += event.target.textContent;
  $result.value += event.target.textContent;
};
```

- eval 함수 : 문자열을 자바스크립트 코드처럼 실행하는 방법
  - 코드가 간단해져서 편리한 기능이지만, eval 함수를 남용하면 해커가 악용할 가능성 큼 ⇒ 최대한 사용 X
  ```jsx
  document.querySelector("#calculate").addEventListener("click", () => {
    if (numTwo) {
      $result.value = eval(numOne + operator + numTwo);
    } else {
      alert("숫자를 먼저 입력하세요");
    }
  });
  ```

---

## 숫자 야구

### 무작위로 숫자 뽑기

- 무작위로 숫자를 만드는 함수 : `Math.random()`
  ```jsx
  Math.random(); // 0 <= x < 1
  Math.random() * 9 + 1; // 1 <= x < 10
  ```
- `Math.floor()` : 내림
  ```jsx
  Math.floor(Math.random() * 9 + 1); // x = { 1, 2, 3, 4, 5, 6, 7, 8, 9}
  ```
- `Math.ceil()` : 올림
- `Math.round()` : 반올림

```jsx
const numbers = [];
for (let n = 0; n < 9; n++) {
  numbers.push(n + 1); // 1~9까지 저장
}
const answer = [];
for (let n = 0; n <= 3; n++) {
  // 네 번반복
  const index = Math.floor(Math.random() * (numbers.length - n)); //0~8정수
  answer.push(numbers[index]);
  numbers.splice(index, 1);
}
```

⇒ numbers에 1~9까지 저장 후 answer에 number에 담긴 숫자 중 4개를 랜덤으로 저장, 뽑힌 숫자는 numbers에서 splice()메소드를 이용해 제거

### 입력값 검증

- 보통 입력창 있으면, form tag로 감싸서 submit event 사용하는 것을 권장. (버튼을 클릭하지 않고 enter 눌러서 값을 제출할 수 도 있기 때문)
- form의 기본동작 : 새로고침 되는 것

```jsx
const tries = [];
function checkInput(input) {
  //검사하는 코드
  if (input.length !== 4) {
    //길이가 4가 아닌가
    return alert("4자리 숫자를 입력해주세요.");
  }
  if (new Set(input).size !== 4) {
    // 중복된 숫자가 있는가
    return alert("중복되지 않게 입력해 주세요");
  } // new Set : 중복이 없는 배열이라고 생각하기, size로 갯수를 계산
  if (tries.includes(input)) {
    // 이미 시도한 값은 아닌가
    return alert("이미 시도한 값입니다.");
  }
  return true;
}
$form.addEventListener("submit", () => {
  event.preventDefault(); // 기본 동작 막기
  const value = $input.value;
  $input.value = "";
  const valid = checkInput(value);
  if (checkInput(value)) {
    //입력값 문제 없음
    tries.push(value);
  }
  console.log("서브밋");
});
```

- 정규 표현식 : 텍스트에서 특정 패턴을 찾아내는데 사용되는 문자 혹은 기호들의 집합, 대상 문자열에 왼쪽에서 오른쪽 방향으로 매칭 되는 하나의 패턴, 문자열 내부의 텍스트 대체 포맷의 유효성 검사, 패턴 매칭을 기반으로 한 문자열에서 일부 텍스트를 추출하기 위해 사용함

### 홈런인지 검사해서 표시하기

```jsx
if (answer.join("") === value) {
  // 배열을 문자열로 바꿔줌
  $logs.textContent = "홈런!";
  return;
}
if (tries.length >= 9) {
  const message = document.createTextNode(`패배! 정답은 ${answer.join("")}`);
  $logs.appendChild(message); // 텍스트 추가
  return;
}
```

- `join()`: 배열을 문자열로 바꿔주는 함수
  ```jsx
  [3, 1, 4, 6]
    .join() // "3, 1, 4, 6"
    [(3, 1, 4, 6)].join(":") // "3:1:4:6"
    [(3, 1, 4, 6)].join(""); // "3146"
  ```
- `split()`: 문자열을 나눠서 배열에 넣어주는 함수
  ```jsx
  "3146".split(); // ["3146"]
  "3146".split(""); // ["3", "1", "4", "6"]
  ```
- `createTextNode()`: 텍스트 노드를 생성. appendChild()함수를 이용해 생성한 텍스트 노드를 함수를 호출한 객체에 텍스트를 추가
  ```jsx
  if(tries.length >= 9) {
    const message = document.createTextNode('패배! 정답은 ${answer.join('')}`); // document.createTextNode로 먼저 텍스트를 만들기
    $log.appendChild(message); // 화면에 추가
  // 태그를 생성해서 $log에다가 추가하는 방식
  // log.textContent 불러 온 다음에 '+' 해서 다음글자 => 할필요 없음
    return;
  }
  ```
- `.textContent`: 모든글자를 텍스트로 인식
- `.innerHTML`:텍스트안에 Html태그가 있다면 HTML태그처럼 인식

### 몇 볼 몇 스트라이크인지 계산하기

```jsx
// 몇 스트라이크 몇 볼인지 검사
let strike = 0;
let ball = 0;
// answer: 3146,  value: 1347
for (let i = 0; i < answer.length; i++) {
  const index = value.indexOf(answer[i]);
  if (index > -1) {
    // 일치하는 숫자 발견
    if (index === i) {
      // 자릿수도 같음
      strike += 1;
    } else {
      // 숫자만 같음
      ball += 1;
    }
  }
}
$logs.append(
  `${value}: ${strike} 스트라이크 ${ball} 볼`,
  document.createElement("br")
);
tries.push(value);
```

- `indexOf()`: 배열이나 문자열에 원하는 값이 들어 있는지 찾는 메서드, 원하는 값이 들어있으면 그 인덱스 값을 알려주고, 들어있지 않으면 -1을 반환한다. (includes는 이와 같은 기능을 하지만 true/false로 값을 반환해준다)
- `append()` : 문자열은`createTextNode()`안해도 된다. 한번에 여러개를 추가할 수 있음. appendChild()를 보완
- `createElement()` , `createTextNode()` : 각각 태그와 텍스트를 만드는 메서드, 단 다른 태그에 append나 appendChile 하기 전까지는 화면에 보이지 않는다.

### 아웃만들기

```html
<html>
  <head>
    <meta charset="utf-8" />
    <title>숫자야구</title>
  </head>
  <body>
    <form id="form">
      <input type="text" id="input" />
      <button>확인</button>
    </form>
    <div id="logs"></div>
    <script>
      const $input = document.querySelector("#input");
      const $form = document.querySelector("#form");
      const $logs = document.querySelector("#logs");

      const numbers = []; // [1, 2, 3, 4, 5, 6, 7, 8, 9]
      for (let n = 0; n < 9; n += 1) {
        numbers.push(n + 1);
      }
      const answer = []; // [3, 1, 4, 6]
      for (let n = 0; n < 4; n += 1) {
        // 네 번 반복
        const index = Math.floor(Math.random() * numbers.length); // 0~8 정수
        answer.push(numbers[index]);
        numbers.splice(index, 1);
      }
      console.log(answer);

      const tries = [];
      function checkInput(input) {
        // 3146,   314,  3144
        if (input.length !== 4) {
          // 길이는 4가 아닌가
          return alert("4자리 숫자를 입력해 주세요.");
        }
        if (new Set(input).size !== 4) {
          // 중복된 숫자가 있는가
          return alert("중복되지 않게 입력해 주세요.");
        }
        if (tries.includes(input)) {
          // 이미 시도한 값은 아닌가
          return alert("이미 시도한 값입니다.");
        }
        return true;
      } // 검사하는 코드

      function defeated() {
        const message = document.createTextNode(
          `패배! 정답은 ${answer.join("")}`
        );
        $logs.appendChild(message);
      }

      let out = 0;
      $form.addEventListener("submit", (event) => {
        event.preventDefault();
        const value = $input.value;
        $input.value = "";
        const valid = checkInput(value);
        if (!valid) return;
        // 입력값 문제없음
        if (answer.join("") === value) {
          // [3, 1, 4, 6] -> '3146'
          $logs.textContent = "홈런!";
          return;
        }
        if (tries.length >= 9) {
          defeated();
          return;
        }
        // 몇 스트라이크 몇 볼인지 검사
        let strike = 0;
        let ball = 0;
        // answer: 3146,  value: 1347
        for (let i = 0; i < answer.length; i++) {
          const index = value.indexOf(answer[i]);
          if (index > -1) {
            // 일치하는 숫자 발견
            if (index === i) {
              // 자릿수도 같음
              strike += 1;
            } else {
              // 숫자만 같음
              ball += 1;
            }
          }
        }
        if (strike === 0 && ball === 0) {
          out++;
          $logs.append(`${value}:아웃`, document.createElement("br"));
        } else {
          $logs.append(
            `${value}:${strike} 스트라이크 ${ball} 볼`,
            document.createElement("br")
          );
        }
        if (out === 3) {
          defeated();
          return;
        }
        tries.push(value);
      });
    </script>
  </body>
</html>
```

### 배열 forEach, map, fill

- `forEach(배열 값, 값의 인덱스)`: 배열에서 반복문의 역할을 함
  - forEach는 인수로 함수를 받고, 배열의 요소 하나하나에 인수로 받은 함수를 각각 적용함. 요소 순서대로 함수를 적용하므로 반복문의 역할을 하게 됨.
  ```jsx
  answer.forEach((number, aIndex) => {
    // answer 배열에 있는 요소들을 forEach 메서드로 순회함.
    const index = value.indexOf(String(number));
    if (index > -1) {
      // 일치하는 숫자 발견
      if (index === aIndex) {
        //자릿수도 같음
        strike += 1;
      } else {
        // 숫자만 같음
        ball += 1;
      }
    }
  });
  ```
- `map()`: 다른 값으로 반환하는 메서드, forEach처럼 함수를 인수로 받지만, return 값에 따라 새로운 요소를 반환한다는 차이가 있음. 기존 배열의 값이 바뀌는 것이 아니라 새로운 배열을 생성
  ```jsx
  //일반적인 경우
  const array = [1, 2, 3, 4];
  const result = [];
  for (let i = 0; i < 4; i++) {
    result.push(array[i] * 2);
  } // [2,4,6,8]

  //map 사용한 경우
  array.map((element, i) => {
    return element * 2; // [2,4,6,8]
  });
  ```
- `fill()`: 배열 채워줌
  ```jsx
  Array(4).fill();
  // [undefined,undefined,undefined,undefined]
  Array(4).fill(3);
  // [3,3,3,3]
  ```
  ```jsx
  Array(4)
    .fill(0)
    .map((el, index) => {
      return index + 1;
    });
  // [1,2,3,4]
  ```

---

## 로또 추첨기

- 비동기 코드: 실제로 코딩한 순서와 다르게 동작하는 코드, 이벤트 리스너가 대표적인 비동기 코드

### 공뽑기 (피셔 예이츠 셔플)

```jsx
const candidate = Array(45)
  .fill()
  .map((v, i) => i + 1);
const shuffle = [];
while (candidate.length > 0) {
  const random = Math.floor(Math.random() * candidate.length); // 무작위 인덱스 뽑기
  const spliceArray = candidate.splice(random, 1); // 뽑은 값은 배열에 들어 있음
  const value = spliceArray[0]; // 배열에 들어 있는 값을 꺼내어
  shuffle.push(value); // shuffle 배열에 넣기
}
console.log(shuffle);
```

- `splice()`를 이용하여 반환하는 값은 배열이기 때문에, spliceArray도 배열, 원본 배열 바뀜
- `slice(첫번째 인덱스, 끝인덱스)` 끝인덱스 포함 하지 않음
  ```jsx
  const array = [3, 2, 9, 7, 5, 8, 6, 4, 1];
  array.slice(0, 3); // [3,2,9]
  array; // [3,2,9,7,5,8,6,4,1] (원본 배열 바뀌지 않음)
  array.slice(-5, -1); // [5,8,6,4]
  ```

### 공 정렬하기

- `sort()` : 원본 바꿈, 문자열도 정렬할 수 있음
  ```jsx
  const array = [3, 2, 9, 7, 5, 8, 6, 4, 1];
  array === array.slice(); // false, array.slice(): 참조가 아니라 복사
  array.slice().sort((a, b) => a - b); // [1,2,3,4,5,6,7,8,9] 오름차순
  array; //[3,2,9,7,5,8,6,4,1] 원본에 영향을 주지 않음
  array.slice().sort((a, b) => b - a); // 내림차순

  // 배열을 복사한뒤 정렬하기 때문에 원본에 영향을 주지 않음

  ["af", "ab"].sort((a, b) => a.localeCompare(b)); // ['ab','af'] 사전순정렬
  ```
- `compareFunction(a, b)`
  - 0보다 작은 경우: a를 b보다 낮은 색인으로 정렬함(a가 먼저 옴)
  - 0을 반환하는 경우: a와 b를 서로에 대해 변경하지 않고 모든 다른 요소에 대해 정렬함.
  - 0보다 큰 경우: b를 a보다 낮은 색인으로 정렬함(b가 먼저 옴)

### 일정시간 후 실행하기

- `setTimeout()`: 지정한 시간 뒤에 코드가 실행되도록 할 수 있음, setTimeout 안에 넣는 함수는 특정 작업 이후에 추가로 실행되는 함수로, 콜백 함수이다
  ```jsx
  setTimeout(() => {
    // 내용
  }, 밀리초);
  ```
- 자바스크립트 타이머의 시간은 정확하지 않다. 자바스크립트는 기본적으로 한 번에 한 가지 일만 할 수 있어서, 이미 많은 일을 하고 있다면 설정한 시간이 되어도 setTimeout에 지정된 작업이 수행되지 않고, 기존에 하고 있던 일이 끝나야 setTimeout에 지정한 작업이 실행된다.
- 리팩토링 : 중복제거

### 블록, 함수 스코프, 클로저 문제

- 변수는 스코프(scope, 범위)라는 것을 가진다
- var는 함수 스코프, let은 블록 스코프를 가짐
- 함수, if 문, for 문에서 접근 범위의 차이를 보임
- 또한, let을 사용할 때는 for 문 안에서 let 변수의 값이 고정되므로 var과는 실행결과가 달라진다
- 클로저: 함수와 함수 바깥에 있는 변수와의 관계

```jsx
function b() {
  var a = 1;
}
console.log(a);
// : Uncaught ReferenceError : a is not defined

if (true) {
  var a = 1;
}
console.log(a); // 1

if (true) {
  let a = 1;
}
console.log(a); // Uncaught ReferenceError : a is not defined
```

---

## 가위바위보

### 타이머사용하기

- `setInterval()` : 지정된 시간마다 지정한 함수를 실행, setTimeout()을 이용하여 바꿀 수 있음, 정확한 시간을 보장 할 수 없음
  ```jsx
  setInterval(() => {
    console.log("hello");
  }, 1000); // 간격이 최대한 1초여야한다면 setInterval 사용(간격보장 노력이 들어있음)
  ```
  ```jsx
  function hello(){
  	console.log('hello);
  	setTimeout(hello,1000);
  }
  setTimeout(hello,1000); // 1초이상 벌어지면 좋겠다하면 setTimeout 사용
  ```

### 타이머 멈췄다 다시 실행하기

- `clearInterval()`: `setInterval()` 함수를 취소할 수 있는 함수
  ```jsx
  let 아이디 = setInterval(함수, 밀리초);
  clearInterval(아이디);
  ```
- `clearTimeout()`: setTimeout() 함수를 취소할 수 있는 함수. setTimeout에 지정한 함수가 아직 실행되지 않았을 때만 취소할 수 있다.
- 버튼을 여러번 클릭하면 빨라짐
  ```jsx
  const clickButton = () => {
    clearInterval(intervalId);
    setTimeout(() => {
      intervalId = setInterval(changeComputerHand, 50);
    }, 1000);
  };
  $rock.addEventListener("click", clickButton);
  $scissors.addEventListener("click", clickButton);
  $paper.addEventListener("click", clickButton);

  // 버튼을 클릭할때 마다 각각 setTimeout 타이머가 실행되기 때문
  // 버튼은 setInterval을 멈추는 clearInterval을 수행할 뿐 setTimeout을 멈추는 clearTimeout을 수행하지는 않음
  // 따라서 버튼을 누른 횟수만큼 setTimeout 타이머가 실행되고 각각 1초뒤에 setInterval을 하게 되어 빠른 속도로 진행된다
  ```
  - solution 1. `removeEventListener()` 사용
    - 이벤트 리스너를 등록할 때 사용한 함수와 같은 함수를 전달해야 함, 예를 들어 addEventListener로 등록한 함수를removeEventListener로 제거할때, 등록한 함수와 동일한 함수를 사용해야 함 ⇒ 변수안에 함수를 넣어서 해결한다
  - solution 2. 버튼 클릭 시 변수를 변경시켜 조건에 맞는 변수일 때만 실행
    ```jsx
    let clickable = true;
    const clickButton = () => {
      if (clickable) {
        clearInterval(intervalId);
        clickable = false;
        setTimeout(() => {
          clickable = true;
          clearInterval(intervalId);
          intervalId = setInterval(changeComputerHand, 50);
        }, 1000);
      }
    };
    ```

### 가위바위보 규칙 찾기

```jsx
const diff = myScore - computerScore;
let message;
// 2, -1은 승리조건이고, -2, 1은 패배조건, 점수표 참고
if ([2, -1].includes(diff)) {
  me += 1;
  message = "승리";
} else if ([-2, 1].includes(diff)) {
  computer -= 1;
  message = "패배";
} else {
  message = "무승부";
}
```

- `diff` 변수를 통해 코드의 가독성을 높인다.
  ```jsx
  diff === 2 || diff ===-(1) ;
  [(2, -1)] ].includes(diff);
   //두 코드는 같은 역할을 수행
  ```

---

## 반응속도테스트

### 클릭해서 화면 전환하기

- `태그.classList.contains('클래스');` 해당 클래스가 들어있다면 true, 들어있지 않다면 false가 된다

```jsx
태그.classList.add("클래스"); // 추가
태그.classList.replace("기존 클래스", "수정클래스"); // 수정
태그.classList.remove("클래스"); // 제거
```

- add 메서드로 한번엥 여러개의 클래스를 추가, 이때 중복인 것은 무시하고 한번씩만 추가됨, remove 메서드도 여러개의 클래스를 동시에 제거. 이때 존재하지 않는 클래스는 무시

### 반응 속도 측정하기

- `new Date();` 현재 시각 나옴
  ```jsx
  new Date(2021, 2, 31, 18, 30, 5); // Wed Mar 31 2021 18:30:05
  //월은 0부터 시작. ex)12월은 11이다
  ```
  ```jsx
  // 시간차이
  else if ($screen.classList.contains('now')) {
      endTime = new Date();
      $result.textContent = ${endTime - startTime}ms;
      $screen.classList.remove('now');
      $screen.classList.add('waiting');
      $screen.textContent = '클릭해서 시작하세요';
  }
  ```

### 평균반응속도

```jsx
const average = records.reduce((a, c) => a + c) / records.length;
$result.textContent = `현재: ${current} 평균:${average}ms`;
```

- `.reduce()` : 배열의 값들을 하나의 새로운 값으로 합친다
  ```jsx
  배열.reduce((누적값, 현재값) => {
    return 새로운누적값;
  }, 초깃값)[
    // 초깃값이 없으면 배열의 첫 번째 요소가 초깃값이 된다

    (1, 2, 3, 4)
  ].reduce((a, c) => a + c, 0);
  // a:0 c:1
  // a:1 c:2
  // a:3 c:3
  // a:6 c:4
  // 10
  ```
- 반응속도테스트 코드

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>반응속도</title>
    <style>
      #screen {
        width: 300px;
        height: 200px;
        text-align: center;
        user-select: none;
      }
      #screen.waiting {
        background-color: aqua;
      }
      #screen.ready {
        background-color: red;
        color: white;
      }
      #screen.now {
        background-color: greenyellow;
      }
    </style>
  </head>

  <body>
    <div id="screen" class="waiting">클릭해서 시작하세요</div>
    <div id="result"></div>
    <script>
      const $screen = document.querySelector("#screen");
      const $result = document.querySelector("#result");

      let startTime;
      let endTime;
      const records = [];
      let timeoutId;
      $screen.addEventListener("click", () => {
        if ($screen.classList.contains("waiting")) {
          // 파랑
          $screen.classList.remove("waiting");
          $screen.classList.add("ready");
          $screen.textContent = "초록색이 되면 클릭하세요";
          timeoutId = setTimeout(function () {
            startTime = new Date();
            $screen.classList.remove("ready");
            $screen.classList.add("now");
            $screen.textContent = "클릭하세요!";
          }, Math.floor(Math.random() * 1000) + 2000); // 2초에서 3초 사이 2000~3000 사이 수
        } else if ($screen.classList.contains("ready")) {
          // 빨강
          clearTimeout(timeoutId);
          $screen.classList.remove("ready");
          $screen.classList.add("waiting");
          $screen.textContent = "너무 성급하시군요!";
        } else if ($screen.classList.contains("now")) {
          // 초록
          endTime = new Date();
          const current = endTime - startTime;
          records.push(current);
          const average = records.reduce((a, c) => a + c) / records.length;
          $result.textContent = `현재 ${current}ms, 평균: ${average}ms`;
          startTime = null;
          endTime = null;
          $screen.classList.remove("now");
          $screen.classList.add("waiting");
          $screen.textContent = "클릭해서 시작하세요";
        }
      });
    </script>
  </body>
</html>
```
