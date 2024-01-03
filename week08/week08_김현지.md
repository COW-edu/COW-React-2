# Week08 학습내용 정리

## 틱택톡

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>틱택토</title>
    <style>
      table {
        border-collapse: collapse;
      }

      td {
        border: 1px solid black;
        width: 40px;
        height: 40px;
        text-align: center;
      }
    </style>
  </head>

  <body>
    <!-- <table>
    <tr>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  </table> -->
    <script>
      const { body } = document;

      const $table = document.createElement("table");
      const $result = document.createElement("div");
      const rows = [];
      let turn = "O";

      // [
      //   [td, td, td],
      //   [td, td, td],
      //   [td, td, td],
      // ]

      const checkWinner = (target) => {
        const rowIndex = target.parentNode.rowIndex;
        const cellIndex = target.cellIndex;

        // 세 칸 다 채워졌나?
        let hasWinner = false;
        // 가로줄 검사
        if (
          rows[rowIndex][0].textContent === turn &&
          rows[rowIndex][1].textContent === turn &&
          rows[rowIndex][2].textContent === turn
        ) {
          hasWinner = true;
        }
        // 세로줄 검사
        if (
          rows[0][cellIndex].textContent === turn &&
          rows[1][cellIndex].textContent === turn &&
          rows[2][cellIndex].textContent === turn
        ) {
          hasWinner = true;
        }
        // 대각선 검사
        if (
          rows[0][0].textContent === turn &&
          rows[1][1].textContent === turn &&
          rows[2][2].textContent === turn
        ) {
          hasWinner = true;
        }
        if (
          rows[0][2].textContent === turn &&
          rows[1][1].textContent === turn &&
          rows[2][0].textContent === turn
        ) {
          hasWinner = true;
        }
        return hasWinner;
      };

      const callback = (event) => {
        if (event.target.textContent !== "") {
          // 칸이 이미 채워져 있는가?
          console.log("빈칸이 아닙니다.");
          return;
        }
        // 빈칸이면
        console.log("빈칸입니다");
        event.target.textContent = turn;
        // 승부 판단하기
        const hasWinner = checkWinner(event.target);
        if (hasWinner) {
          $result.textContent = `${turn}님이 승리!`;
          $table.removeEventListener("click", callback);
          return;
        }
        // 무승부 검사
        const draw = rows.flat().every((cell) => cell.textContent);
        if (draw) {
          $result.textContent = `무승부`;
          return;
        }
        turn = turn === "X" ? "O" : "X";
      };

      for (let i = 1; i <= 3; i++) {
        const $tr = document.createElement("tr");
        const cells = [];
        for (let j = 1; j <= 3; j++) {
          const $td = document.createElement("td");
          cells.push($td);
          $tr.append($td);
        }
        rows.push(cells);
        $table.append($tr);
      }
      $table.addEventListener("click", callback);
      body.append($table);
      body.append($result);
    </script>
  </body>
</html>
```

- 이차원 배열: 배열 안에 배열이 있을때
- n차원 배열: 배열이 몇 번 중첩 되었는지에 따라 몇차원인지 정해진다.
- 구조 분해 할당: 객체 내부의 속성과 할당하는 변수명이 같을때 코드를 줄여쓰는 방법
  ```jsx
  const arr = [0, 1, 2, 3, 4];
  const one = arr[0];
  const two = arr[1];
  const three = arr[2];
  const four = arr[3];
  const five = arr[4];

  //구조분해 할당 이용
  const [one, two, three, four, five] = arr;
  ```
- 이벤트 버블링: 한 요소에 이벤트가 발생하면 이 요소에 할당된 핸들러가 동작하고, 이어서 부모 요소의 핸들러가 동작하고 최상단의 부모 요소를 만날 때까지 반복되면서 핸들러가 동작하는 현상
  ```jsx
  $table.addEventListener("click", callback);
  ```
  - 이벤트 버블링이 발생하면, 이벤트 리스너 콜백 함수의 event.target은 이벤트가 발생한 태그로 바뀐다.
  - 이벤트가 발생한 태그가 아닌, 이벤트를 연결한 태그에 접근하고 싶으면 event.currentTarget을 사용해야 한다.
- 부모자식 관계, 유사배열, every, some, flat
  ```jsx
  const checkWinner = (target) => {
    let rowIndex = target.parentNode.rowIndex;
    let cellIndex = target.cellIndex;
  };
  ```
  - parentNode: 현재 태그의 부모태그를 찾고 싶을때 사용한다.
  - children: 자식태그를 찾을때 사용한다.
    - 자식 태그는 여러 개일 수 있기 때문에, children 속성은 배열 모양의 값이 된다.(진짜 배열 X, 배열 모양의 객체)
  - rowIndex: tr 태그가 제공하는, 몇번째 줄인지 알려주는 속성
  - cellIndex: td태그가 제공하는, 몇번째 칸인지 알려주는 속성
    ```jsx
    const rowIndex = $tr.rowIndex;
    const cellIndex = $td.cellIndex;
    ```
  - 유사 배열 객체: 배열 모양의 객체
    - `Array.from()` : 유사배열을 배열로 바꿔준다.
    - 배열이 아니므로 배열 메서드를 사용할 수 없다.
  - `every()` : 배열에서 모든값이 조건에 해당하는지 판단할때 사용, 배열에서 한칸이라도 null이면 false를 리턴한다. 모두 값이 있으면 true
  - `some()`: 하나라도 조건에 해당되는지 판단할때 사용, 배열에서 한칸이라도 값이 있으면 ture, 모두 값이 없으면 false
  - `flat()`: 배열의 차원을 한단계 낮추는 메서드, 2차원 배열을 1차원 배열로 만들어준다. 3차원 배열이라면 2차원 배열로 만들어 준다.
    ```jsx
    const array = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    array.flat(); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const array2 = [
      1,
      2,
      3,
      [
        [4, 5, 6],
        [7, 8, 9],
      ],
    ];
    array2.flat(); // [1, 2, 3, [4, 5, 6], [7, 8, 9]]
    ```

---

## 텍스트 RPG

```html
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>텍스트 RPG</title>
  </head>

  <body>
    <form id="start-screen">
      <input id="name-input" placeholder="주인공 이름을 입력하세요!" />
      <button id="start">시작</button>
    </form>
    <div id="screen">
      <div id="hero-stat">
        <span id="hero-name"></span>
        <span id="hero-level"></span>
        <span id="hero-hp"></span>
        <span id="hero-xp"></span>
        <span id="hero-att"></span>
      </div>
      <form id="game-menu" style="display: none;">
        <div id="menu-1">1.모험</div>
        <div id="menu-2">2.휴식</div>
        <div id="menu-3">3.종료</div>
        <input id="menu-input" />
        <button id="menu-button">입력</button>
      </form>
      <form id="battle-menu" style="display: none;">
        <div id="battle-1">1.공격</div>
        <div id="battle-2">2.회복</div>
        <div id="battle-3">3.도망</div>
        <input id="battle-input" />
        <button id="battle-button">입력</button>
      </form>
      <div id="message"></div>
      <div id="monster-stat">
        <span id="monster-name"></span>
        <span id="monster-hp"></span>
        <span id="monster-att"></span>
      </div>
    </div>
    <script>
      const $startScreen = document.querySelector("#start-screen");
      const $gameMenu = document.querySelector("#game-menu");
      const $battleMenu = document.querySelector("#battle-menu");
      const $heroName = document.querySelector("#hero-name");
      const $heroLevel = document.querySelector("#hero-level");
      const $heroHp = document.querySelector("#hero-hp");
      const $heroXp = document.querySelector("#hero-xp");
      const $heroAtt = document.querySelector("#hero-att");
      const $monsterName = document.querySelector("#monster-name");
      const $monsterHp = document.querySelector("#monster-hp");
      const $monsterAtt = document.querySelector("#monster-att");
      const $message = document.querySelector("#message");

      const hero = {
        name: "",
        lev: 1,
        maxHp: 100,
        hp: 100,
        xp: 0,
        att: 10,
        attack(monster) {
          monster.hp -= this.att;
          this.hp -= monster.att;
        },
        heal(monster) {
          this.hp += 20;
          this.hp -= monster.att;
        },
      };
      let monster = null;
      const monsterList = [
        { name: "슬라임", hp: 25, att: 10, xp: 10 },
        { name: "스켈레톤", hp: 50, att: 15, xp: 20 },
        { name: "마왕", hp: 150, att: 35, xp: 50 },
      ];

      $startScreen.addEventListener("submit", (event) => {
        event.preventDefault();
        const name = event.target["name-input"].value;
        $startScreen.style.display = "none";
        $gameMenu.style.display = "block";
        $heroName.textContent = name;
        $heroLevel.textContent = `${hero.lev}Lev`;
        $heroHp.textContent = `HP: ${hero.hp}/${hero.maxHp}`;
        $heroXp.textContent = `XP: ${hero.xp}/${15 * hero.lev}`;
        $heroAtt.textContent = `ATT: ${hero.att}`;
        hero.name = name;
      });

      $gameMenu.addEventListener("submit", (event) => {
        event.preventDefault();
        const input = event.target["menu-input"].value;
        if (input === "1") {
          // 모험
          $gameMenu.style.display = "none";
          $battleMenu.style.display = "block";
          monster = JSON.parse(
            JSON.stringify(
              monsterList[Math.floor(Math.random() * monsterList.length)]
            )
          );
          monster.maxHp = monster.hp;
          $monsterName.textContent = monster.name;
          $monsterHp.textContent = `HP: ${monster.hp}/${monster.maxHp}`;
          $monsterAtt.textContent = `ATT: ${monster.att}`;
        } else if (input === "2") {
          // 휴식
        } else if (input === "3") {
          // 종료
        }
      });

      $battleMenu.addEventListener("submit", (event) => {
        const input = event.target["battle-input"].value;
        if (input === "1") {
          // 공격
          hero.attack(monster);
          monster.attack(hero);
          $heroHp.textContent = `HP: ${hero.hp}/${hero.maxHp}`;
          $monsterHp.textContent = `HP: ${monster.hp}/${monster.maxHp}`;
          $message.textContent = `${hero.att}의 데미지를 주고, ${monster.att}의 데미지를 받았다.`;
        } else if (input === "2") {
          // 회복
        } else if (input === "3") {
          // 도망
        }
      });
    </script>
  </body>
</html>
```

- window: 브라우저를 가리키는 객체
  - 브라우저가 제공하는 기본 객체와 함수들은 대부분 window 객체 안에 들어 있다.
  - document나 console 객체도 window 안에 들어있는데, window를 생략하고 쓰는 것이다.
- this
  - 기본적으로 window를 가리킨다.
  - 객체를 통해 this를 사용할 때는 this가 해당 객체를 가리킨다.
  - 특정 메서드는 콜백 함수의 this를 바꾼다. ex) addEventListener
  - this가 바뀌지 않도록 하려면, 함수 선언문 대신 화살표 함수를 사용한다.
  ```jsx
  const hero = {
    name: "",
    lev: 1,
    maxHp: 100,
    hp: 100,
    xp: 0,
    att: 10,
    attack(monster) {
      monster.hp -= this.att;
      this.hp -= monster.att;
    },
    heal(monster) {
      this.hp += 20;
      this.hp -= monster.att;
    },
  };
  ```
- 복사
  - 어떤 값을 다른 변수에 대입할 때, 기존 값과 참조 관계가 끊기는 것이다.
  - 객체가 아닌 값은 애초부터 참조 관계가 없으므로, 그냥 복사된다.
  - **얕은 복사**:중첩된 객체가 있을 때 가장 바깥 객체만 복사가 되고, 내부 객체는 참조 관계를 유지하는 복사
    ```jsx
    //얕은 복사 하는 방법
    const array = { a, b, c };
    const shallarra = { ...array };
    // [...배열]을 하면 된다.
    ```
  - **깊은 복사**: 내부객체까지 복사한 완전한 복사라고 생각하면 된다.
  ```jsx
  const monster1 = JSON.parse(JSON.stringfy(monsterList[0]));
  const monster2 = monsterList[0];
  monster1.name = "새 몬스터";
  console.log(monsterList[0].name); //슬라임
  monster2.name = "새 몬스터";
  console.log(monsterList[0].name); //슬라임
  console.log(monsterList[0] === monster1); //false, 깊은복사
  console.log(monsterList[0] === monster2); //true, 참조관계
  ```
- 클래스
  - 객체를 생성하는 템플릿 문법
  - class 예약어로 클래스를 선언, constructor 메서드 안에 기존 코드를 넣음
  - new를 붙여서 호출하면 constructor 함수가 실행되고, 객체가 반환된다.
  - this는 생성된 객체 자신을 가리키게 된다.
  ```jsx
  class Monster{
   constructor(name, hp, att, xp){
   this.name = name;
   this.hp = hp;
   this.att = att;
   this.xp = xp;
  }
   attack(monster) {
            monster.hp -= this.att;
            this.hp -= monster.att;
          },
   heal(monster) {
            this.hp += 20;
            this.hp -= monster.att;
          },
  }
  //클래스안에서의 this는 마찬가지로 객체(생성자)를 가리킨다
  //화살표함수에 사용하면 this는 window를 가리킨다.
  const monster1 = new Monster('슬라임',25,10,11);
  const monster2 = new Monster('슬라임',22,13,16);
  const monster3 = new Monster('슬라임',28,16,10);
  //class를 사용하면 new를 쓰지 않으면 에러를 띄어준다.
  ```
- 클래스 상속
  - 클래스끼리 extends 예약어로 상속할 수 있다.
  - 상속하는 클래스는 부모 클래스가 되고, 상속받는 클래스는 자식 클래스가 된다.
  - 공통되는 속성, 메서드를 부모 클래스로부터 상속받는다
  - 자식 클래스에서 super은 부모 클래스를 의미한다.
  ```jsx
  //공통되는 부분을 새로운 클래스로 만듦
  class Unit {
    constructor(game, name, hp, att, xp) {
      this.game = game;
      this.name = name;
      this.maxHp = hp;
      this.hp = hp;
      this.xp = xp;
      this.att = att;
    }
    attack(target) {
      target.hp -= this.att;
    }
  }
  class Hero extends Unit {
    constructor(game, name) {
      super(game, name, 100, 10, 0);
      this.lev = 1;
    }
    attack(target) {
      super.attack(target); // 부모 클래스의 attack
      // 부모 클래스 attack 외의 동작
    }
  }
  class Monster extends Unit {
    constructor(game, name, hp, att, xp) {
      super(game, name, hp, att, xp);
    }
  }
  ```

---

## 카드 짝맞추기

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>짝맞추기</title>
    <style>
      .card {
        display: inline-block;
        margin-right: 20px;
        margin-bottom: 20px;
        width: 70px;
        height: 100px;
        perspective: 140px;
      }

      .card-inner {
        position: relative;
        width: 100%;
        height: 100%;
        text-align: center;
        transition: transform 0.8s;
        transform-style: preserve-3d;
      }

      .card.flipped .card-inner {
        transform: rotateY(180deg);
      }

      .card-front {
        background: navy;
      }

      .card-front,
      .card-back {
        position: absolute;
        width: 100%;
        height: 100%;
        border: 1px solid black;
        backface-visibility: hidden;
      }

      .card-back {
        transform: rotateY(180deg);
      }
    </style>
  </head>
  <body>
    <div id="wrapper"></div>
    <script>
      const $wrapper = document.querySelector("#wrapper");

      const total = 12;
      const colors = ["red", "orange", "yellow", "green", "white", "pink"];
      let colorCopy = colors.concat(colors); //원본을 수정하지않고 새로운 배열을 만들어줌
      let shuffled = [];
      let clicked = [];
      let completed = [];
      let clickable = false;

      function shuffle() {
        // 피셔-예이츠 셔플
        for (let i = 0; colorCopy.length > 0; i += 1) {
          const randomIndex = Math.floor(Math.random() * colorCopy.length);
          shuffled = shuffled.concat(colorCopy.splice(randomIndex, 1)); //배열을 합쳐준다
        }
      }

      function createCard(i) {
        // div.card > div.card-inner > (div.card-front + div.card-back)
        const card = document.createElement("div");
        card.className = "card"; // .card 태그 생성
        const cardInner = document.createElement("div");
        cardInner.className = "card-inner"; // .card-inner 태그 생성
        const cardFront = document.createElement("div");
        cardFront.className = "card-front"; // .card-front 태그 생성
        const cardBack = document.createElement("div");
        cardBack.className = "card-back"; // .card-back 태그 생성
        cardBack.style.backgroundColor = shuffled[i]; //카드 뒷면은 랜덤으로 섞은 컬러
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);
        return card;
      }

      // clicked : [2, 5, 8, 9]
      // 태스크큐:
      // 백: addEventListener(12),
      function onClickCard() {
        if (!clickable || completed.includes(this) || clicked[0] === this) {
          return;
        }
        this.classList.toggle("flipped");
        clicked.push(this);
        if (clicked.length !== 2) {
          return;
        }
        const firstBackColor =
          clicked[0].querySelector(".card-back").style.backgroundColor;
        const secondBackColor =
          clicked[1].querySelector(".card-back").style.backgroundColor;
        if (firstBackColor === secondBackColor) {
          // 두 카드가 같은 카드면
          completed.push(clicked[0]);
          completed.push(clicked[1]);
          clicked = [];
          if (completed.length !== total) {
            return;
          }
          setTimeout(() => {
            alert(`축하합니다!`);
            resetGame();
          }, 1000);
          return;
        }
        clickable = false;
        setTimeout(() => {
          clicked[0].classList.remove("flipped");
          clicked[1].classList.remove("flipped");
          clicked = [];
          clickable = true;
        }, 500);
      }

      function startGame() {
        clickable = false;
        shuffle();
        for (let i = 0; i < total; i += 1) {
          const card = createCard(i);
          card.addEventListener("click", onClickCard);
          $wrapper.appendChild(card);
        }

        document.querySelectorAll(".card").forEach((card, index) => {
          // 초반 카드 공개
          setTimeout(() => {
            card.classList.add("flipped");
          }, 1000 + 100 * index);
        });

        setTimeout(() => {
          // 카드 감추기
          document.querySelectorAll(".card").forEach((card) => {
            card.classList.remove("flipped");
          });
          clickable = true;
        }, 5000);
      }
      startGame();

      function resetGame() {
        $wrapper.innerHTML = "";
        colorCopy = colors.concat(colors);
        shuffled = [];
        completed = [];
        startGame();
      }
    </script>
  </body>
</html>
```

- 호출 스택 : 함수들이 실행되는 공간
  - 함수가 호출될 때 호출 스택에 들어가고, 실행이 완료되면 호출 스택에서 빠져나간다.
  - 기존 함수의 실행이 완료되지 않았는데 다른 함수가 호출되면 새로 호출된 함수는 기존 함수 위에 쌓인다.
  - 처음 파일을 실행할 때는 anonymous(크롬 브라우저에서는)라는 익명 함수가 실행된다.
- 백그라운드: 타이머나 이벤트 리스너를 담는 공간
- 태스크 큐: 타이머나 이벤트 리스너의 콜백 함수들이 들어가는 공간
- 이벤트 루프 : 호출스택이 비어있을대 태스크 큐에서 하나씩 꺼내서 실행해줌
  - 비동기 함수가 실행될 때 호출 스택뿐만 아니라, 이벤트 루프까지 동원해 실행 순서를 파악해야 한다.
  - 비동기 함수들은 콜백 함수를 백그라운드에서 태스크 큐로 보낸다.
  - 이벤트 루프는 호출 스택이 비어있으면 태스크 큐에서 함수를 하나씩 꺼내 호출 스택으로 보내 실행한다.
  - 호출 스택이 비어있지 않으면 태스크 큐에 있는 함수는 실행되지 않는다
