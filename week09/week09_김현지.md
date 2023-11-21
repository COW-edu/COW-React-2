# Week09 학습내용 정리

### 지뢰 찾기

- contextmenu 이벤트
  - 마우스 좌클릭 이벤트 - `click`
  - 마우스 우클릭 이벤트 - `contextmenu`
    - 기본적으로 브라우저 메뉴를 띄우므로 이를 막으려면 event.preventDefault 메서드 호출해야함.
- 옵셔널 체이닝(optional chaining)
  - `?`로 표시
  - 앞에 있는 것이 참이면 뒤 코드를 실행
  - 앞에 있는 것이 거짓이면 코드를 모두 undefined로 만들어 버림
  - 객체나 배열뿐만 아니라 함수에도 옵셔널 체이닝 적용 가능
  - 속성에 접근하거나 호출하려는 것이 거짓인 값인지 아닌지 의심될 때 옵셔널 체이닝 적용하기
  ```jsx
  const obj = undefined;
  const arr = undefined;
  const func = undefined;
  obj?.b; // undefined
  arr?.[0]; // undefined
  func?.(); // undefined
  ```
- 논리연산자
  - `&&`: 앞의 값이 true 뒤의 식을 실행하고, 앞의 값이 false면 앞의 식을 실행
  - `||`: 앞의 값이 true면 앞의 식을 실행하고, 앞의 값이 false면 뒤의 식을 실행
- 재귀 함수(recursive function)
  - 자기 자신을 다시 호출하는 함수
  ```jsx
  let i = 0;
  function recurse() {
    i++;
    recurse();
  }
  ```
  - Maximum call stack size exceeded error
    - 재귀 함수를 사용하다보면 자주 볼 수 있는 오류 ( 재귀 함수를 사용할 때 연산량이 많으면 브라우저가 느려지는 현상이 발생하므로, 연산량을 최소화하도록 코드를 작성)
    - 호출 스택의 최대 크기를 초과하면 발생
    - 브라우저별로 호출 스택의 최대 크기가 다르다
    - 해결 방법: 비동기 함수를 사용 (재귀 함수 내부를 setTimeout으로 감싸면, 시간을 0초로 해서 즉시 호출함)

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>지뢰 찾기</title>
    <style>
      table {
        border-collapse: collapse;
      }
      td {
        border: 1px solid #bbb;
        text-align: center;
        line-height: 20px;
        width: 20px;
        height: 20px;
        background: #888;
      }
      td.opened {
        background: white;
      }
      td.flag {
        background: red;
      }
      td.question {
        background: orange;
      }
    </style>
  </head>
  <body>
    <form id="form">
      <input placeholder="가로 줄" id="row" size="5" />
      <input placeholder="세로 줄" id="cell" size="5" />
      <input placeholder="지뢰" id="mine" size="5" />
      <button>생성</button>
    </form>
    <div id="timer">0초</div>
    <table id="table">
      <tbody></tbody>
    </table>
    <div id="result"></div>
    <script>
      const $form = document.querySelector("#form");
      const $timer = document.querySelector("#timer");
      const $tbody = document.querySelector("#table tbody");
      const $result = document.querySelector("#result");
      let row; // 줄
      let cell; // 칸
      let mine; // 지뢰
      const CODE = {
        NORMAL: -1,
        QUESTION: -2,
        FLAG: -3,
        QUESTION_MINE: -4,
        FLAG_MINE: -5,
        MINE: -6,
        OPENED: 0, // 0 이상이면 모두 열린 칸
      };
      let data;
      let openCount = 0;
      let startTime;
      let interval;
      function onSubmit(event) {
        event.preventDefault();
        row = parseInt(event.target.row.value);
        cell = parseInt(event.target.cell.value);
        mine = parseInt(event.target.mine.value);
        drawTable();
        startTime = new Date();
        interval = setInterval(() => {
          const time = Math.floor((new Date() - startTime) / 1000);
          $timer.textContent = `${time}초`;
        }, 1000);
      }
      $form.addEventListener("submit", onSubmit);
      function plantMine() {
        const candidate = Array(row * cell)
          .fill()
          .map((arr, i) => {
            return i;
          });
        const shuffle = [];
        while (candidate.length > row * cell - mine) {
          const chosen = candidate.splice(
            Math.floor(Math.random() * candidate.length),
            1
          )[0];
          shuffle.push(chosen);
        }
        const data = [];
        for (let i = 0; i < row; i++) {
          const rowData = [];
          data.push(rowData);
          for (let j = 0; j < cell; j++) {
            rowData.push(CODE.NORMAL);
          }
        }
        for (let k = 0; k < shuffle.length; k++) {
          const ver = Math.floor(shuffle[k] / cell);
          const hor = shuffle[k] % cell;
          data[ver][hor] = CODE.MINE;
        }
        return data;
      }
      function onRightClick(event) {
        event.preventDefault();
        const target = event.target;
        const rowIndex = target.parentNode.rowIndex;
        const cellIndex = target.cellIndex;
        const cellData = data[rowIndex][cellIndex];
        if (cellData === CODE.MINE) {
          // 지뢰면
          data[rowIndex][cellIndex] = CODE.QUESTION_MINE; // 물음표 지뢰로
          target.className = "question";
          target.textContent = "?";
        } else if (cellData === CODE.QUESTION_MINE) {
          // 물음표 지뢰면
          data[rowIndex][cellIndex] = CODE.FLAG_MINE; // 깃발 지뢰로
          target.className = "flag";
          target.textContent = "!";
        } else if (cellData === CODE.FLAG_MINE) {
          // 깃발 지뢰면
          data[rowIndex][cellIndex] = CODE.MINE; // 지뢰로
          target.className = "";
          target.textContent = "";
        } else if (cellData === CODE.NORMAL) {
          // 닫힌 칸이면
          data[rowIndex][cellIndex] = CODE.QUESTION; // 물음표로
          target.className = "question";
          target.textContent = "?";
        } else if (cellData === CODE.QUESTION) {
          // 물음표면
          data[rowIndex][cellIndex] = CODE.FLAG; // 깃발으로
          target.className = "flag";
          target.textContent = "!";
        } else if (cellData === CODE.FLAG) {
          // 깃발이면
          data[rowIndex][cellIndex] = CODE.NORMAL; // 닫힌 칸으로
          target.className = "";
          target.textContent = "";
        }
      }
      function countMine(rowIndex, cellIndex) {
        const mines = [CODE.MINE, CODE.QUESTION_MINE, CODE.FLAG_MINE];
        let i = 0;
        mines.includes(data[rowIndex - 1]?.[cellIndex - 1]) && i++;
        mines.includes(data[rowIndex - 1]?.[cellIndex]) && i++;
        mines.includes(data[rowIndex - 1]?.[cellIndex + 1]) && i++;
        mines.includes(data[rowIndex][cellIndex - 1]) && i++;
        mines.includes(data[rowIndex][cellIndex + 1]) && i++;
        mines.includes(data[rowIndex + 1]?.[cellIndex - 1]) && i++;
        mines.includes(data[rowIndex + 1]?.[cellIndex]) && i++;
        mines.includes(data[rowIndex + 1]?.[cellIndex + 1]) && i++;
        return i;
      }
      function open(rowIndex, cellIndex) {
        if (data[rowIndex]?.[cellIndex] >= CODE.OPENED) {
          return;
        }
        const target = $tbody.children[rowIndex]?.children[cellIndex];
        if (!target) {
          return;
        }
        const count = countMine(rowIndex, cellIndex);
        target.textContent = count || "";
        target.className = "opened";
        data[rowIndex][cellIndex] = count;
        openCount++;
        console.log(openCount);
        if (openCount === row * cell - mine) {
          const time = (new Date() - startTime) / 1000;
          clearInterval(interval);
          $tbody.removeEventListener("contextmenu", onRightClick);
          $tbody.removeEventListener("click", onLeftClick);
          setTimeout(() => {
            alert(`승리했습니다! ${time}초가 걸렸습니다.`);
          }, 0);
        }
        return count;
      }
      function openAround(rI, cI) {
        setTimeout(() => {
          const count = open(rI, cI);
          if (count === 0) {
            openAround(rI - 1, cI - 1);
            openAround(rI - 1, cI);
            openAround(rI - 1, cI + 1);
            openAround(rI, cI - 1);
            openAround(rI, cI + 1);
            openAround(rI + 1, cI - 1);
            openAround(rI + 1, cI);
            openAround(rI + 1, cI + 1);
          }
        }, 0);
      }

      function onLeftClick(event) {
        const target = event.target; // td 태그겠죠?
        const rowIndex = target.parentNode.rowIndex;
        const cellIndex = target.cellIndex;
        const cellData = data[rowIndex][cellIndex];
        if (cellData === CODE.NORMAL) {
          // 닫힌 칸이면
          openAround(rowIndex, cellIndex);
        } else if (cellData === CODE.MINE) {
          // 지뢰 칸이면
          target.textContent = "펑";
          target.className = "opened";
          clearInterval(interval);
          $tbody.removeEventListener("contextmenu", onRightClick);
          $tbody.removeEventListener("click", onLeftClick);
        } // 나머지는 무시
      }

      function drawTable() {
        data = plantMine();
        data.forEach((row) => {
          const $tr = document.createElement("tr");
          row.forEach((cell) => {
            const $td = document.createElement("td");
            if (cell === CODE.MINE) {
              $td.textContent = "";
            }
            $tr.append($td);
          });
          $tbody.append($tr);
          $tbody.addEventListener("contextmenu", onRightClick);
          $tbody.addEventListener("click", onLeftClick);
        });
      }
      drawTable();
    </script>
  </body>
</html>
```

---

### 2048 게임

- 키보드 이벤트
  - keydown(키보드 키를 눌렀을 때 발생)
  - keyup(키보드 키를 눌렀다 놓았을 때 발생)
  - 왼쪽은 ArrowLeft, 오른쪽은 ArrowRight, 위쪽은 ArrowUp, 아래쪽은 ArrowDown이고, 이를 통해 방향을 확인할 수 있음
- 마우스 이벤트
  1. mousedown(마우스를 클릭할 때 발생)
  2. mouseup(마우스를 클릭했다 뗄 때 발생)
  3. mousemove(마우스를 움직일 때 발생)
  - 마우스 이벤트의 속성에서 x, y 좌표를 얻을 수 있으며 이를 이용해 마우스 위치의 변화를 잡아낼 수 있다
    - clientX, clientY: 현재 브라우저 페이지 내에서의 x, y 좌표를 가리킨다(픽셀 단위로)
    - pageX, pageY: 브라우저 페이지 내에서의 x, y 좌표를 가리키지만, 스크롤이 있으면 스크롤한 픽셀 값까지 포함한다는 점이 clientX, clientY와 다르다
    - offsetX, offsetY: 이벤트를 연결한 대상을 기준으로 마우스의 x, y 좌표를 가져온다
    - screenX, screenY: 모니터를 기준으로 모니터의 왼쪽 모서리가 0이 된다
    - movementX, movementY: 지난 mousemove 이벤트와 비교해 얼마나 마우스를 움직였는지 표시한다. 따라서 mousemove 이벤트인 경우에만 실제 값이 잡힌다. (마우스 방향을 판단할 때는 mousedown과 mouseup 이벤트만 필요함)

```html
<html>
  <head>
    <meta charset="UTF-8" />
    <title>2048</title>
    <style>
      #table {
        border-collapse: collapse;
        user-select: none;
      }
      #table td {
        border: 10px solid #bbada0;
        width: 116px;
        height: 128px;
        font-size: 50px;
        font-weight: bold;
        text-align: center;
      }
      #score {
        user-select: none;
      }
      .color-2 {
        background-color: #eee4da;
        color: #776e65;
      }
      .color-4 {
        background-color: #eee1c9;
        color: #776e65;
      }
      .color-8 {
        background-color: #f3b27a;
        color: "white";
      }
      .color-16 {
        background-color: #f69664;
        color: "white";
      }
      .color-32 {
        background-color: #f77c5f;
        color: "white";
      }
      .color-64 {
        background-color: #f75f3b;
        color: "white";
      }
      .color-128 {
        background-color: #edd073;
        color: #776e65;
      }
      .color-256 {
        background-color: #edcc62;
        color: #776e65;
      }
      .color-512 {
        background-color: #edc950;
        color: #776e65;
      }
      .color-1024 {
        background-color: #edc53f;
        color: #776e65;
      }
      .color-2048 {
        background-color: #edc22e;
        color: #776e65;
      }
    </style>
  </head>
  <body>
    <table id="table"></table>
    <div id="score">0</div>
    <script>
      const $table = document.getElementById("table");
      const $score = document.getElementById("score");
      let data = [];

      function startGame() {
        const $fragment = document.createDocumentFragment();
        [1, 2, 3, 4].forEach(function () {
          const rowData = [];
          data.push(rowData);
          const $tr = document.createElement("tr");
          [1, 2, 3, 4].forEach(() => {
            rowData.push(0);
            const $td = document.createElement("td");
            $tr.appendChild($td);
          });
          $fragment.appendChild($tr);
        });
        $table.appendChild($fragment);
        put2ToRandomCell();
        draw();
      }

      function put2ToRandomCell() {
        const emptyCells = [];
        data.forEach(function (rowData, i) {
          rowData.forEach(function (cellData, j) {
            if (!cellData) {
              emptyCells.push([i, j]);
            }
          });
        });
        const randomCell =
          emptyCells[Math.floor(Math.random() * emptyCells.length)];
        data[randomCell[0]][randomCell[1]] = 2;
      }

      function draw() {
        data.forEach((rowData, i) => {
          rowData.forEach((cellData, j) => {
            const $target = $table.children[i].children[j];
            if (cellData > 0) {
              $target.textContent = cellData;
              $target.className = "color-" + cellData;
            } else {
              $target.textContent = "";
              $target.className = "";
            }
          });
        });
      }
      startGame();
      draw();
      function moveCells(direction) {
        switch (direction) {
          case "left": {
            const newData = [[], [], [], []];
            data.forEach((rowData, i) => {
              rowData.forEach((cellData, j) => {
                if (cellData) {
                  const currentRow = newData[i];
                  const prevData = currentRow[currentRow.length - 1];
                  if (prevData === cellData) {
                    // 이전 값과 지금 값이 같으면
                    const score = parseInt($score.textContent);
                    $score.textContent =
                      score + currentRow[currentRow.length - 1] * 2;
                    currentRow[currentRow.length - 1] *= -2;
                  } else {
                    newData[i].push(cellData);
                  }
                }
              });
            });
            console.log(newData);
            [1, 2, 3, 4].forEach((rowData, i) => {
              [1, 2, 3, 4].forEach((cellData, j) => {
                data[i][j] = Math.abs(newData[i][j]) || 0;
              });
            });
            break;
          }
          case "right": {
            const newData = [[], [], [], []];
            data.forEach((rowData, i) => {
              rowData.forEach((cellData, j) => {
                if (rowData[3 - j]) {
                  const currentRow = newData[i];
                  const prevData = currentRow[currentRow.length - 1];
                  if (prevData === rowData[3 - j]) {
                    const score = parseInt($score.textContent);
                    $score.textContent =
                      score + currentRow[currentRow.length - 1] * 2;
                    currentRow[currentRow.length - 1] *= -2;
                  } else {
                    newData[i].push(rowData[3 - j]);
                  }
                }
              });
            });
            console.log(newData);
            [1, 2, 3, 4].forEach((rowData, i) => {
              [1, 2, 3, 4].forEach((cellData, j) => {
                data[i][3 - j] = Math.abs(newData[i][j]) || 0;
              });
            });
            break;
          }
          case "up": {
            const newData = [[], [], [], []];
            data.forEach((rowData, i) => {
              rowData.forEach((cellData, j) => {
                if (cellData) {
                  const currentRow = newData[j];
                  const prevData = currentRow[currentRow.length - 1];
                  if (prevData === cellData) {
                    const score = parseInt($score.textContent);
                    $score.textContent =
                      score + currentRow[currentRow.length - 1] * 2;
                    currentRow[currentRow.length - 1] *= -2;
                  } else {
                    newData[j].push(cellData);
                  }
                }
              });
            });
            console.log(newData);
            [1, 2, 3, 4].forEach((cellData, i) => {
              [1, 2, 3, 4].forEach((rowData, j) => {
                data[j][i] = Math.abs(newData[i][j]) || 0;
              });
            });
            break;
          }
          case "down": {
            const newData = [[], [], [], []];
            data.forEach((rowData, i) => {
              rowData.forEach((cellData, j) => {
                if (data[3 - i][j]) {
                  const currentRow = newData[j];
                  const prevData = currentRow[currentRow.length - 1];
                  if (prevData === data[3 - i][j]) {
                    const score = parseInt($score.textContent);
                    $score.textContent =
                      score + currentRow[currentRow.length - 1] * 2;
                    currentRow[currentRow.length - 1] *= -2;
                  } else {
                    newData[j].push(data[3 - i][j]);
                  }
                }
              });
            });
            console.log(newData);
            [1, 2, 3, 4].forEach((cellData, i) => {
              [1, 2, 3, 4].forEach((rowData, j) => {
                data[3 - j][i] = Math.abs(newData[i][j]) || 0;
              });
            });
            break;
          }
        }
        if (data.flat().includes(2048)) {
          // 승리
          draw();
          setTimeout(() => {
            alert("축하합니다. 2048을 만들었습니다!");
          }, 0);
        } else if (!data.flat().includes(0)) {
          // 빈칸이 없으면 패배
          alert(`패배했습니다... ${$score.textContent}점`);
        } else {
          put2ToRandomCell();
          draw();
        }
      }

      window.addEventListener("keyup", (event) => {
        if (event.key === "ArrowUp") {
          moveCells("up");
        } else if (event.key === "ArrowDown") {
          moveCells("down");
        } else if (event.key === "ArrowLeft") {
          moveCells("left");
        } else if (event.key === "ArrowRight") {
          moveCells("right");
        }
      });
      let startCoord;
      window.addEventListener("mousedown", (event) => {
        startCoord = [event.clientX, event.clientY];
      });
      window.addEventListener("mouseup", (event) => {
        const endCoord = [event.clientX, event.clientY];
        const diffX = endCoord[0] - startCoord[0];
        const diffY = endCoord[1] - startCoord[1];
        if (diffX < 0 && Math.abs(diffX) > Math.abs(diffY)) {
          moveCells("left");
        } else if (diffX > 0 && Math.abs(diffX) > Math.abs(diffY)) {
          moveCells("right");
        } else if (diffY > 0 && Math.abs(diffX) <= Math.abs(diffY)) {
          moveCells("down");
        } else if (diffY < 0 && Math.abs(diffX) <= Math.abs(diffY)) {
          moveCells("up");
        }
      });
    </script>
  </body>
</html>
```

---

### 두더지 잡기

- HTML에서는 코드에서 아래에 위치한 태그가 화면상으로는 앞에 오게 되므로, 코드에서 .hole 태그가 맨 앞에 있고, .hole-front 태그가 맨 뒤에 위치하게 된다
- 이벤트 루프 분석
  - 이벤트가 많이 발생하는 경우에 프로그램 전체에서 발생하는 이벤트를 모두 분석하면 매우 복잡하다. 이럴 때는 관련 있는 이벤트만 분석해도 된다.
  - 어떠한 이벤트를 분석하는 데 영향을 미치지 않는 다른 이벤트가 있다면 해당 이벤트는 이벤트 루프 분석에서 제외해도 된다.
- alert 함수 사용할 때 주의할 점
  - alert 함수는 현재 진행되는 화면 변경 사항이나 애니메이션을 즉시 멈추고 알림창을 띄우므로 알림창이 뜰 때 마지막 화면 변경 사항이나 애니메이션이 적용되지 않는 경우가 많다. 이때는 setTimeout과 함께 호출해서 마지막 화면 변경 사항이나 애니메이션을 적용시킨다

```html
<html>
  <head>
    <meta charset="UTF-8" />
    <title>두더지 잡기</title>
    <style>
      .cell {
        display: inline-block;
        position: relative;
        width: 200px;
        height: 200px;
        background: "yellow";
        overflow: hidden;
      }
      .gopher,
      .bomb {
        width: 200px;
        height: 200px;
        bottom: 0;
        position: absolute;
        transition: bottom 1s;
      }
      .gopher {
        background: url("./gopher.png") center center no-repeat;
        background-size: 200px 200px;
      }
      .dead {
        background: url("./dead_gopher.png") center center no-repeat;
        background-size: 200px 200px;
      }
      .bomb {
        background: url("./bomb.png") center center no-repeat;
        background-size: 200px 200px;
      }
      .boom {
        background: url("./explode.png") center center no-repeat;
        background-size: 200px 200px;
      }
      .hidden {
        bottom: -200px;
      }
      .hole {
        width: 200px;
        height: 150px;
        position: absolute;
        bottom: 0;
        background: url("./mole-hole.png") center center no-repeat;
        background-size: 200px 150px;
      }
      .hole-front {
        width: 200px;
        height: 30px;
        position: absolute;
        bottom: 0;
        background: url("./mole-hole-front.png") center center no-repeat;
        background-size: 200px 30px;
      }
    </style>
  </head>
  <body>
    <div>
      <span id="timer">0</span>초&nbsp; <span id="score">0</span>점
      <button id="start">시작</button>
    </div>
    <div id="game">
      <div class="row">
        <div class="cell">
          <div class="hole"></div>
          <div class="gopher hidden"></div>
          <div class="bomb hidden"></div>
          <div class="hole-front"></div>
        </div>
        <div class="cell">
          <div class="hole"></div>
          <div class="gopher hidden"></div>
          <div class="bomb hidden"></div>
          <div class="hole-front"></div>
        </div>
        <div class="cell">
          <div class="hole"></div>
          <div class="gopher hidden"></div>
          <div class="bomb hidden"></div>
          <div class="hole-front"></div>
        </div>
      </div>
      <div class="row">
        <div class="cell">
          <div class="hole"></div>
          <div class="gopher hidden"></div>
          <div class="bomb hidden"></div>
          <div class="hole-front"></div>
        </div>
        <div class="cell">
          <div class="hole"></div>
          <div class="gopher hidden"></div>
          <div class="bomb hidden"></div>
          <div class="hole-front"></div>
        </div>
        <div class="cell">
          <div class="hole"></div>
          <div class="gopher hidden"></div>
          <div class="bomb hidden"></div>
          <div class="hole-front"></div>
        </div>
      </div>
      <div class="row">
        <div class="cell">
          <div class="hole"></div>
          <div class="gopher hidden"></div>
          <div class="bomb hidden"></div>
          <div class="hole-front"></div>
        </div>
        <div class="cell">
          <div class="hole"></div>
          <div class="gopher hidden"></div>
          <div class="bomb hidden"></div>
          <div class="hole-front"></div>
        </div>
        <div class="cell">
          <div class="hole"></div>
          <div class="gopher hidden"></div>
          <div class="bomb hidden"></div>
          <div class="hole-front"></div>
        </div>
      </div>
    </div>
    <script>
      const $timer = document.querySelector("#timer");
      const $score = document.querySelector("#score");
      const $game = document.querySelector("#game");
      const $start = document.querySelector("#start");
      const $$cells = document.querySelectorAll(".cell");
      const holes = [0, 0, 0, 0, 0, 0, 0, 0, 0];
      let started = false;
      let score = 0;
      let time = 60;
      $start.addEventListener("click", () => {
        if (started) {
          // 이미 시작했으면 무시
          return;
        }
        started = true;
        console.log("시작");
        const timerId = setInterval(() => {
          time = (time * 10 - 1) / 10; // 소수점 계산 시 문제 있음
          $timer.textContent = time;
          if (time === 0) {
            clearInterval(timerId);
            clearInterval(tickId);
            setTimeout(() => {
              alert(`게임 오버! 점수는${score}점`);
            }, 50);
          }
        }, 100);
        const tickId = setInterval(tick, 1000);
        tick();
      });
      let gopherPercent = 0.3;
      let bombPercent = 0.5;

      function tick() {
        holes.forEach((hole, index) => {
          if (hole) {
            // 무언가 일어나고 있으면 return
            return;
          }
          const randomValue = Math.random();
          if (Math.random() < gopherPercent) {
            const $gopher = $$cells[index].querySelector(".gopher");
            holes[index] = setTimeout(() => {
              // 1초 뒤에 사라짐
              $gopher.classList.add("hidden");
              holes[index] = 0;
            }, 1000);
            $gopher.classList.remove("hidden");
          } else if (Math.random() < bombPercent) {
            const $bomb = $$cells[index].querySelector(".bomb");
            holes[index] = setTimeout(() => {
              // 1초 뒤에 사라짐
              $bomb.classList.add("hidden");
              holes[index] = 0;
            }, 1000);
            $bomb.classList.remove("hidden");
          }
        });
      }
      $$cells.forEach(($cell, index) => {
        $cell.querySelector(".gopher").addEventListener("click", (event) => {
          if (!event.target.classList.contains("dead")) {
            score += 1;
            $score.textContent = score;
          }
          event.target.classList.add("dead");
          event.target.classList.add("hidden");
          clearTimeout(holes[index]); // 기존 내려가는 타이머 제거
          setTimeout(() => {
            holes[index] = 0;
            event.target.classList.remove("dead");
          }, 1000);
        });
        $cell.querySelector(".bomb").addEventListener("click", (event) => {
          event.target.classList.add("boom");
          event.target.classList.add("hidden");
          clearTimeout(holes[index]); // 기존 내려가는 타이머 제거
          setTimeout(() => {
            holes[index] = 0;
            event.target.classList.remove("boom");
          }, 1000);
        });
      });
    </script>
  </body>
</html>
```
