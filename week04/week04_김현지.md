# Week04(10.11~10.17)

<aside>
💡 주차별 학습: JS 기본 문법 - 제로초 2, 3강

</aside>

## JS 기본 문법

- 세미콜론, 주석, 들여쓰기
  - 세미콜론 : 명령어는 세미콜론으로 구별
  - 주석 : 코드에 대한 설명, 쓰이지 않을 코드도 주석처리 할 수도 있음
    ```jsx
    // 주석입니다 ^_^
    /* 여러줄 주석
    코드와 코드사이에도 주석을 쓸 수 있어요
    */
    ```
  - 들여쓰기 : 두칸 스페이스, 네칸 스페이스 상관없고 들여쓰기를 하지 않아도 실행에는 문제가 없음

---

### 자료형

- 값은 프로그램이 조작할 수 있는 데이터 의미, 값에는 여러가지 종류가 있으며 이런 값의 종류를 자료형 이라고 한다.

1. 문자열
   - 따옴표로 감싸야 한다 : 줄바꿈 할때 \n 사용
   - 백틱도 가능 : 백틱의 특성 - 줄바꿈을 해줄 수 있다
   - `‘ ’`, `‘’`- 이런 것들도 문자열
   - 따옴표 자체를 문자열로 만들려면 작은 따옴표는 큰 따옴표로 감싸주고, 큰 따옴표는 작은 따옴표, 백틱으로 감싸준다(똑같은 걸로 사용하면 안된다 > >>쓰고 싶으면 \(역슬래시) 사용, 두번쓰면 역슬래시 보이게 할 수 있음
   - 문자열 합치기 (띄어쓰기 조심)
     ```jsx
     "바나나" + "사과"; // 바나나사과
     ```
2. 숫자(parseInt, NaN)
   - 50000 = 5e4
   - 0.0005 = 5e-4
   - 2진법도 사용 가능(0b를 사용): 0b111 -> 7
   - 8진법도 사용 가능(0 또는 0o를 사용): 0111 -> 78
   - 16진법도 사용 가능(0x를 사용): 0x1a1 -> 417
   - NAN : Not a number
     - `type of NAN` >>> number
   - `‘124’` 와 `124` 다름. 앞에는 문자열
     - `parseInt('124')` >>> 124 : 문자열을 숫자로
     - 문자열을 정수로 바꿀때는`parseInt` ,문자열을 실수로 바꿀때는 `ParseFloat`사용
     ```jsx
     parseInt("3월"); // 3
     Number("3월"); // NAN
     ```
   - `prompt()` 는 문자열을 입력받음
     - `parseInt(prompt())` >>> 입력 받은 것을 숫자로 바꾼다
   - `typeof` : 자료형 알려줌
     - ex. `typeof ParseInt(prompt())`
   - _Infinity_ : 무한을 나타냄
   - 형변환 : 값의 자료형이 바뀌는 현상 또는 바꾸는 행위
     ```jsx
     "문자열" + 0; // "문자열0"
     // 문자열과 숫자가 하나로 합쳐짐
     // 문자열이 있으면 계산이 불가능하고 문자열 결과가 나옴
     ```
   - 자바스크립트에서는 정수와 실수가 나눠져있지 않다 `ex) 0.5 + 0.5; -> 1`
   - 부동 소수점 문제: 컴퓨터가 실수 계산을 정확하게 하지 못함 `ex) 0.1 + 0.2 -> 0.3000000004`
     - 가장 간단한 해결방법은 실수를 정수로 바꿔서 계산한뒤, 마지막에 다시 실수로 바꾸는 것 `ex)(0.3*10-0.1*10)/10`
3. boolean
   - **true, false** : 따옴표로 감싸지 않는다
   - `typeof true` >>> boolean
   - `NaN == NaN` >>> false
   - `true > false` >>> true
   - `‘3’ < 5` >>> true : 형 변환 후 비교
   - `'abc' < 5;` >>> false : abc를 숫자로 바꾸면 NaN이 되어, false가 출력
   - `‘0’ < true` >>> true : 0<1
   - **_`===` 는 값뿐만 아니라 자료형까지도 같은지 비교 , `==` 은 값만 비교하고 자료형이 같은지는 비교안함_**
   - 논리 연산자 : boolean 같은 논리식을 다룰 때 많이 사용됨
     - && (그리고) , ||(또는)
     - 식 앞에 !를 붙이면 참인 값들은 `false`가 되고, 거짓인 값은 `true`가 된다
     - **false, 빈문자열, 0, NaN, undefined, null, document.all 은 불 값으로 형 변환했을때 false가 된다**
4. undefined , null
   - undefined는 보통 반환할 결과값이 없을때 나옴
     - 명령어는 콘솔에 무언가를 출력하지만, 그 자체로는 결과값이 없기때문에 undefined가 반환됨
       ```jsx
       undefined == false; // -> false
       undefined == 0; // -> false
       undefined == ""; // -> false
       ```
   - null
     ```jsx
     undefined == null; // -> true
     undefined === null; // -> false
     typeof null; // -> object(버그, 원래 null이 나와야함)
     ```

---

### 변수, 상수

- 변수 : 값을 저장해 두는 공간
  - let 사용
    - ex. `let numberone = 12`
  ```jsx
  let string = 231243; // 변수 선언(+초기화: 값을 할당)
  let total = 500 + 300 + 200; // total = 1000으로 초기화(대입 연산자보다 더하기 연산자의 우선순위가 높아서)
  string; // ->231243 값을 돌려줌
  console.log(string); // ->231243을 화면에 보여줌
  ```
  - `let emt;` >>> undefined : 변수를 선언할때 값을 대입하지 않으면 기본으로 값이 undefined가 된다
  - 변수명 짓기
    - 보통 영어 소문자로 시작
    - 띄어쓰기는 불가능, 대신 대문자로 다른 단어를 표시 ex) myBanana
    - 특수문자는 %, \_만 사용
    - 숫자로 시작하는 것은 불가능
    - 예약어 불가능
  - 변수는 값을 변경할 수 있다
  - 빈 값할때는 undefined 보단 null로
    ```jsx
    hello = 100;
    hello = 200; // 값 수정
    hello /= 4; // hello = hello/4와 같은 의미
    hello = null; // 값 삭제(null or undefined 이용, null로 쓰기)
    ```
- 상수: 상수선언하는 방법 - const, var
- const
  - 중복선언, 재할당 불가능
- var
  - 중복선언 가능
  ```jsx
  // 첫번째 변수 선언+초기화
  var a = 10;
  console.log(a); // 10

  // 두번째 변수 선언+초기화
  var a = 20;
  console.log(a); // 20

  // 세번째 변수 선언(초기화X)
  var a;
  console.log(a); // 20
  ```

---

### 조건문

- if 문
  ```jsx
  if (조건식) {
    동작문;
  } else if {
    동작문;
  } else {
    동작문;
  }
  ```
- switch 문
  ```jsx
  switch (조건식) {
    case 비교조건식1:
      동작문1;
      break;
    case 비교조건식2:
      동작문2;
      break;
    default:
      동작문3;
  }
  ```

---

### 조건부 연산자 (삼항 연산자)

- 기본 형식 :
  ```jsx
  조건식? 참일 때 실행되는 식: 거짓일 때 실행되는 식
  ```

---

### 반복문

- while
  ```jsx
  while (조건식) {
    동작문;
    동작문;
  }
  ```
- for
  ```jsx
  for(시작; 조건식; 종료식;) {
    동작문;
    동작문;
  }
  ```
- break : 반복문에서 나가기
- continue: 특정 조건에서만 반복문이 실행되도록 하는 역할, continue를 넣으면 이후의 코드는 건너뛰게 된다
- 중첩 반복문: 반복문 안에 반복문이 들어있는 경우

---

### 객체

- 객체: 자료형의 일종으로, 다양한 값을 모아둔 또 다른 값
- 객체의 종류: 배열(array), 함수(function), 함수가 아닌 객체(객체 리터럴)

---

### 배열

- 대괄호([])를 이용해 값을 감싸주고, 값을 쉼표로 구분
  ```jsx
  const fruits = ["사과", "오렌지", "배", "딸기"];
  ```
- 배열 내부의 값을 인덱스(자릿수)를 이용해 개별적으로 불러올 수 있음
  ```jsx
  const fruits = ["사과", "오렌지", "배", "딸기"];
  console.log(fruits[0]); // 사과
  console.log(fruits[1]); // 오렌지
  console.log(fruits[2]); // 배
  console.log(fruits[3]); // 딸기
  ```
- 이차원 배열: 배열 내부에 배열이 들어있는 배열
- 요소(element): 배열 내부에 든 값
- 요소의 개수를 구하는 법: `.length()`를 붙인다.
- 배열에 요소를 추가하는 법: 원하는 배열의 인덱스에 값을 대입한다.
  ```jsx
  const target = ["a", "b", "c", "d", "e"];
  target[5] = "f";
  console.log(target); // ['a', 'b', 'c', 'd', 'e', 'f']
  ```
- 배열에 원래 있던 요소의 인덱스에 값을 대입하면, 값이 추가되지 않고 덮어 씌워진다.
  ```jsx
  const target = ["가", "나", "다", "라", "마"];
  target[0] = "바";
  console.log(target); // ['바', '나', '다', '라', '마']
  ```
- 기존 배열의 요소를 유지한 채, 맨 앞에 값을 추가하는 법: `unshift()`
  ```jsx
  const target = ["가", "나", "다", "라", "마"];
  target.unshift("바");
  console.log(target); // ['바', '가', '나', '다', '라', '마']
  ```
- 기존 배열의 요소를 유지한 채, 맨 뒤에 값을 추가하는 법: `push()`
  ```jsx
  const target = ["가", "나", "다", "라", "마"];
  target.push("바");
  console.log(target); // ['가', '나', '다', '라', '마', '바']
  ```
- 배열의 첫 번째 요소를 제거: `shift()`
  ```jsx
  const target = ["가", "나", "다", "라", "마"];
  target.shift("가");
  console.log(target); // ['나', '다', '라', '마']
  ```
- 배열의 마지막 요소를 제거: `pop()`
  ```jsx
  const target = ["가", "나", "다", "라", "마"];
  target.pop();
  console.log(target); // ['가', 나', '다', '라']
  ```
- 배열의 중간 요소를 제거: `splice(지우고 싶은 첫 인덱스, 지우고 싶은 요소의 개수)`
  ```jsx
  const target = ["가", "나", "다", "라", "마"];
  target.splice(2, 2); // target[2]부터 2개 삭제
  console.log(target); // ['가', 나', '마']
  ```
  ```jsx
  const target = ["가", "나", "다", "라", "마"];
  target.splice(1); // target[1]부터 끝까지 삭제
  console.log(target); // ['가']
  ```
  ```jsx
  const target = ["가", "나", "다", "라", "마"];
  target.splice(1, 3, "타", "파"); // target[1]부터 target[3]까지 삭제하고 그 자리에 '타', '파'를 넣어줌
  console.log(target); // ['가', '타', '파', '마']
  ```
- 배열에서 요소 찾기: `includes()`
  ```jsx
  const target = ["가", "나", "다", "라", "마"];
  const result1 = target.includes("다");
  const result2 = target.includes("카");
  console.log(result1); // true
  console.log(result2); // false
  ```
- 요소가 몇 번째 인덱스에 위치하는지, 배열에 존재하는지 검색하기: `indexOf()`
- 중복되는 요소가 마지막으로 몇 번째 인덱스에 위치하는지 검색하기: `lastIndexOf`
  ```jsx
  const target = ["라", "가", "나", "다", "라", "마"];
  const result1 = target.indexOf("다");
  const result2 = target.lastIndexOf("라");
  const result1 = target.indexOf("사");
  console.log(result1); // 3
  console.log(result2); // 4
  console.log(result3); // -1: 없음
  ```

---

### 함수

- 함수를 만드는 법: 예약어 `function`을 사용하거나 =>(화살표 기호)를 사용함
  ```jsx
  function() {} // 방법 1
  () => {} // 방법 2
  ```

1. 함수 선언문: 함수를 상수에 대입하는 대신 function 키워드 뒤에 함수 이름을 넣어주는 방식
2. 함수 표현식: 상수나 변수에 대입하는 방식
3. 화살표 함수: 화살표 기호를 사용한 함수

- 함수를 사용한다 = 호출한다(call)
  ```jsx
  function a() {}
  a(); // 호출
  ```
- 함수 안에 반환값(return value)를 넣을 수 있다. return을 쓰지 않으면 undefinded를 반환하고, 함수를 호출하면 반환값을 준다.
  ```jsx
  function a() {
    return 10;
  }
  console.log(a()); // 10
  ```
- 매개 변수, 인수
  - parameter는 argument의 값을 갖고, 실제로 parameter은 변수와 같은 특성을 갖는다.
  - 매개변수와 인수를 여러 개 사용 가능

---

### 객체 리터럴

- 배열이나 함수가 아닌 객체
- 속성의 이름과 값으로 구성된 속성들의 집합
- {}(중괄호)를 이용해 표현
  ```jsx
  const zerocho = { // zerocho: 객체 리터럴
    name = '조현영', // 속성의 이름: name, 속성의 값: '조현영'
    year = 1994,
    month = 8,
    date = 12, // 마지막에는 쉼표 생략 가능
  };
  //객체 리터럴에 접근하는 방법 2가지
  console.log(zerocho.name);
  console.log(zerocho['name']); // 대괄호도 사용 가능
  ```
- 속성의 이름에 숫자, 특수문자가 들어가거나, 띄어쓰기가 포함되어 있으면 속성 이름을 ''(작은 따옴표)로 감싸줘야 한다. 이런 경우에는 속성에 접근할 때 무조건 대괄호를 통해 접근해야 한다.
  ```jsx
  const obj = {
    bc = 'hello',
    '2ca' = 'hello'
  }
  obj.bc;
  obj['bc'];
  obj.2ca; // error
  obj['2ca'];
  ```
- 객체 속성 제거하기: `delete.`
- 메서드(method): 객체의 속성 값으로 함수를 넣었을 때, 그 함수를 특별히 메서드라고 명명
- 객체의 비교
  - 객체끼리 비교하면 무조건 false
  - 객체끼리 비교하기 위해서는, 객체를 변수에 저장하고 비교해야 한다.
  - **참조**객체를 저장한 변수를 다른 변수에 대입하면 두 변수가 모두 같은 객체를 저장 a와 b 변수가 모두 같은 객체를 저장하고 있는 것이므로 객체의 속성 값을 바꾸면 a와 b 모두 바뀌는 것처럼 보인다 → 변수 a와 b가 같은 객체를 참조하고 있다고 표현, 객체 간에 참조 관계가 있다고 표현

---

### 대화창

1. prompt: 사용자로부터 값을 입력받음(입력된 값은 기본으로 String)

   ```jsx
   const number = parseInt(prompt('몇 명이 참가하나요?), 10);
   ```

2. alert: 경고 메시지를 표시함

   ```jsx
   alert(number);
   ```

3. confirm: 사용자로부터 '예/아니오'를 입력받음

   ```jsx
   const yesOrNo = confirm("맞나요?");
   ```

---

### HTML 태그 선택하기 : querySelector

- 자바스크립트에서 HTML 태그를 가져오는 것을 '선택'한다고 표현함
- 선택하기 위해 `document.querySelector()`이라는 함수를 사용함
- 선택자: HTML 태그를 선택할 수 있게 도와주는 문자열

1. `document.querySelector()`: 태그 하나를 선택하는 함수

   ```jsx
   document.querySelector("선택자");
   ```

   ```jsx
   const $button = document.querySelector("button"); // '$'를 이용해 HTML 태그를 선택했다고 표시(필수는 아님)
   console.log($button);
   ```

2. `document.querySelectorAll()`: 태그를 여러 개 선택하는 함수
   - 같은 태그가 여러 개 있는데 그냥 `document.querySelector()`을 사용하면 맨 처음 태그를 선택하게 된다.
3. `document.querySelector()` + id를 이용(1개 선택)

   ```jsx
   <body>
   <div><span id="order">1</span>번째 참가자</div>
   </body>
   <script>
   document.querySelector('#order');
   </script>
   ```

4. `document.querySelector()` + class를 이용(여러 개 선택)

   ```jsx
   <body>
   	<button class = "btn">버튼1</button>
   	<button class = "btn">버튼2</button>
   	<button>버튼3</button>
   </body>
   <script>
   	document.querySelector('button.btn');
   </script>
   ```

5. 자식 태그 선택

   ```jsx
   <body>
   <div><span id="order">1</span>번째 참가자</div>
   </body>
   <script>
   document.querySelector('div span');
   //div의 자손인 span을 선택(띄어쓰기로 구분)
   </script>
   ```

6. `document.querySelector('선택자 내부선택자 내부선택자...')`

   ```jsx
   document.querySelector("body #target button");
   // body 태그 안에 있는 id가 target인 태그 중에서, button 태그
   ```

---

### 이벤트 리스너 (콜백함수)

- `.addEventListener()`를 이용
- 형식: 태그.addEventListener('이벤트 이름', 리스너 함수);
  ```jsx
  document.querySelector('input').addEventListener('input', function()) { console.log('글자 입력'); // 자바스크립트가 사용자가 글자를 입력하고 지우는 것을 인식할 수 있게 됨
  }
  ```
- 리스너 함수를 넣을 때 ()를 붙이면 안된다

---

### 순서도 그리기

1. 프로그램 절차의 개수는 정해져 있어야 한다.
2. 각 절차는 항상 같은 내용이어야 한다.
3. 모든 가능성을 고려해야 한다.
4. 예시는 절차를 검증하는 데 사용한다.
5. 순서도 최적화하기: 여러 개의 if문을 합치기 위해 진리표(and, or)을 이용한다.
