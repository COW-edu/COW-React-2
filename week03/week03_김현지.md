# Week03 학습내용 정리

## CSS

- CSS : Cascading Style Sheets
- HTML 문서에 스타일을 더해줌
- 기본문법
  ```css
  선택자 {
    속성명: 속성값;
    /* 주석 */
  }
  ```
  - **선택자 : 어떤 요소에 스타일을 적용할 지에 대한 정보** (선택자 우선 순위 : 아이디 선택자 > 클래스 선택자 > 태그 선택자>
    - 기본선택자
      1. 전체선택자 : 모든 요소를 선택, \*는 문서내의 모든 요소를 의미
      2. 태그선택자(유형선택자) : 주어진 이름을 가진 요소 선택
      3. 클래스선택자 : 주어진 class 속성값을 가진 요소를 선택
      4. 아이디 선택자 : 주어진 id 속성값을 가진 요소를 선택, id 는 고유한 식별자 역할을 하는 전역 속성
    - 그룹선택자 : 다양한 유형의 요소를 한꺼번에 선택하고자 할때 사용, 쉽표를 사용해 선택자를 그룹화
    - 특성 선택자 : 주어진 속성의 존재여부나 그 값에 따라 요소 선택
      1. 컨셉

         ```css
         [class="item"] {
           background-color: tomato;
         }
         /* 클래스가 item 인요소 선택 */
         ```

      2. 값확인: 기호를 추가하여 요소를 선택하는 방식 다양화할 수있음

         ```css
         [class*="it"] {
           color: white;
         }
         /* 클래스 값에 it 가 포함되는 요소 선택 */
         [class^="it"] {
           color: white;
         }
         /* 클래스 값에 it 로 시작하는 요소 선택 */
         [class$="it"] {
           color: white;
         }
         /* 클래스 값에 it 로 끝나는 요소 선택 */
         ```
    - 결합선택자 : 두 개이상의 선택자를 결합시켜 결합된 조건을 만족하는 요소를 선택
      - 자손결합자 : 두개의 선택자 중 첫번째 선택자 요소의 자손을 선택할 수 있음
        ```css
        div p {
          color: white;
        }
        /* div 요소 안에 위치하는 모든 p 요소 선택 */
        div > p {
          color: white;
        }
        /* div 요소의 바로 아래에 위치하는 모든 p 요소 선택 */
        ```
      - 형제결합자
        ```css
        h1 ~ p {
          color: white;
        }
        /* h1 요소의 뒤에 오는 형제 중 모든 p 요소 선택 */
        h1 + p {
          color: white;
        }
        /* h1 요소의 바로 뒤에 오는 형제 p 요소 선택 */
        ```
    - 의사클래스 : 선택자에 추가하는 키워드로, 요소가 어떤 특정한 상태가 되었을때 요소를 선택하겠다는 의미
      - hover, active, focus, disabled, nth-child() 등
      ```css
      h1:hover {
        color: white;
      }
      /* h1 요소에 마우스 커서가 올라오면 글자를 하얀색으로 */
      ```
    - 의사요소 : 선택한 요소의 특정 부분에 대한 스타일을 정의할 수 있다
      - after, before, first-line, marker, placeholder 등
      ```css
      li::first-letter {
        font-size: 20px;
      }
      /* li 요소의 첫번째 글자만 크기를 20px로 */
      ```
  - 속성명 : 어떤 스타일을 정의하고 싶은지에 대한 정보 (색상, 크기 등)
  - 속성값 : 어떻게 정의하고 싶은지에 대한 정보
- HTML 문서에 CSS 문서(코드) 적용하는 방식
  - 인라인 스타일 : 태그에 직접 기술
    - 태그에 style 속성을 추가하여 요소에 직접적으로 스타일 정의
    ```html
    <p style="color: blue;">파란글자</p>
    ```
  - 스타일 태그: 스타일시트를 위한 태그를 추가하여 기술
    - HTML 문서에 <style></style>태그를 추가하여 그 안에
      CSS 코드를 작성할 수 있음
    ```html
    <style>
      /* style 태그안에는 css코드를 작성해야 함 */
      p {
        color: red;
      }
    </style>
    ```
  - 문서 간의 연결 : 스타일시트 문서를 따로 작성하여 HTML 문서와 연결
    - 확장자가 _.css 인 스타일시트 파일을 생성해 그 안에 CSS 코드를 작성하고, HTML 문서에 이를 연결해 줄 수 있다. 이때는 <link>태그를 사용 >>> _<link> 태그는 HTML 문서의 <head></head> 내부에서 사용해야 함\*
    ```html
    <link href="./style.css" rel="stylesheet" />
    <!-- href: 연결하고자 하는 외부소스의 url을 기술하는 속성
    rel: 현재문서 (HTML)와 외부소스의 연관관계를 기술하는 속성-->
    ```

---

### TEXT 관련 속성

- font-family : 여러개의 글꼴을 연달아 기입하여 우선순위를 지정할 수 잇다.
  ```css
  * {
    font-family: Times, monospace, serif;
  }
  /* Times를 우선 지정하되, 지원되지 않을 경우 monospace를 지정 */
  ```
- font-size
  - px: 모니터 상의 화소 하나 크기에 대응하는 절대적인 크기
  - rem: <html> 태그의 font-size에 대응하는 상대적인 크기
  - em: 부모태그(상위태그)의 font-size에 대응하는 상대적인 크기
- text-align : 블록 내에서 텍스트의 정렬 방식을 정의
  - center
  - left/right
  - justify : 양끌 정렬 (마지막 줄 제외)
- color : 텍스트의 색상을 정의
  - 키워드 : 미리정의된 색상별 키워드를 사용
  - RGB : 색상코드 # + 여섯자리 16진수 값 형태로 지정
  - RGB 함수: Red, Green, Blue 의 수준을 각각 정의해 지정

---

### display & border

- 블록 레벨 요소 : 자기가 속한 영역의 너비를 모두 차지 하여 블록 형성
- 인라인 요소: 자기에게 필요한 만큼의 공간만 차지 - width, height 가질 수 없음 , display를 inline-block 으로 변경하면 가질 수 있음
- **display 속성**
  - 블록과 인라인 요소 중 어느쪽으로 처리할지를 정의
  - 속성값 : inline, block, inline-block(인라인으로 배치하되, 블록 레벨 요소의 속성을 추가할 수 있도록 처리), none(디스플레이하지 않음)
- border 속성
  - 요소가 차지하고 있는 영역에 테두리를 그릴 수 있음, 테두리의 두깨, 모양, 크기 등을 함께 지정할 수 있음(단축속성)
    ```css
    span {
      border: 2px solid green;
    }
    ```
  - 하위속성 : border-color, border-width, border-style

---

### Box Model

- 브라우저가 요소를 렌더링 할때, 각각의 요소는 기본적으로 사각형 형태로 영역을 차지하게 된다. 이 영역을 ‘박스’라 표현하며, CSS 는 박스의 크기, 위치, 속성 등을 결정할 수 있다.
- 하나의 박스는 **콘텐츠 영역, 안쪽 여백, 경계선(테두리), 바깥쪽 여백** 으로 구성됨
- 박스 각 영역의 크기를 정의할 수 있는 속성
  - 콘텐츠 영역 : width, height
  - 안쪽 여백 : padding(여러값한번에 지정가능)
    - padding-top
    - padding-right
    - padding-bottom
    - padding-left
  - 바깥쪽 여백 : margin(여러값한번에 지정가능)
    - margin-top
    - margin-right
    - margin-bottom
    - margin-left
  - 테두리 : border-width
- box-sizing
  - box-sizing 속성은 요소의 너비와 높이를 계산하는 방법을 지정
  - content-box : 기본값, 너비와 높이가 콘텐츠 영역만을 포함
  - border-box : 너비와 높이가 안쪽 여백과 테두리까지 포함
  - ⇒ 너비와 높이가 같더라도, box-sizing 속성값에 따라 크기가 달라질 수 있음
- background : 콘텐츠의 배경을 정의
  - 단축 속성으로써 색상, 이미지, 반복 등 다양한 하위 속성을 정의할 수 있음
  - background-color : 배경색 정의
  - background-image : 배경이미지 정의
  - background-position : 배경이미지의 초기 위치를 정의
  - background-size : 배경이미지의 크기를 정의
  - background-repeat : 배경이미지의 반복 방법을 정의
- float
  - float 속성은 요소가 문서의 일반적인 흐름에서 제외되어 자신을 포함하고 있는 컨테이너의 왼쪽이나 오른쪽에 배치되게 한다.
  - none : 기본값, 원래 상태
  - left : 자신을 포함하고 있는 박스의 왼편에 떠 있어야 함
  - right : 자신을 포함하고 있는 박스의 오른편에 떠 있어야함
- clear
  - clear 속성은 float 요소 이후에 표시되는 요소가 float 을 해제하여 float 요소의 아래로 내려가게 할 수 있다.
  - none : 기본값, 아래로 이동되지 않음을 나타내는 키워드
  - left : float 이 left인 요소의 아래로 내려가겠다
  - right : float 이 right인 요소의 아래로 내려가겠다
  - both : float 이 left 및 right 인 요소의 아래로 내려가겠다
  - `clear: both;` 를 사용하면 한번에 해결 !

---

### position

- position : 문서 상에 요소를 배치하는 방법을 정의
  - position이 요소의 배치 방법을 결정하면, top, bottom, right, left가 최종 위치를 결정하는 방식
  - 속성값
    - _static_ : 기본값, 요소를 일반적인 문서 흐름에 따라 배치
    - _relative_ : 일반적인 문서 흐름에 따라 배치하되, 상하좌우 위치 값에 따라 오프셋을 적용
      ```css
      div {
        position: relative;
        top: 100px;
        left: 100px;
      }
      /* 원래 위치보다 위에서 100px, 왼쪽에서부터 100px떨어져있어라
      */
      ```
    - _absolute_ : 일반적인 문서 흐름에서 제거하고, 가장 가까운 position 지정 요소에 대해 상대적으로 오프셋을 적용
    - _fixed_ : 일반적인 문서흐름에서 제거하고, 지정한 위치에 고정시킴
    - _sticky_ : 요소를 일반적인 문서흐름에 따라 배치하고, 스크롤되는 가장 가까운 상위요소에 대해 오프셋을 적용

---

### flexbox

- flexbox란 박스 내 요소 간의 공간 배분과 정렬기능을 제공하기 위한 1차원 레이아웃 모델
- flex 컨테이너를 만들기 위해서는 컨테이너에 `display:flex;`를 적용해야함
- **_main-axis(주축)_**
- **_cross-axis(교차축)_**
- flex-direction : flexbox 내 요소를 배치할 때 사용할 주축 및 방향(정방향, 역방향)을 지정
  - row : 기본값, 주축은 행이고 방향은 콘텐츠의 방향과 동일
  - row-reverse : 주축은 행이고 콘텐츠의 방향과 반대
  - column : 주축은 열이고 방향은 콘텐츠의 방향과 동일
  - column-reverse : 주축은 열이고 방향은 콘텐츠의 방향과 반대
- 속성
  - 주축배치방법 : justify-content
  - 교차축배치방법 : align-items
  - 교차축개별요소배치방법 : align-self
  - 줄바꿈여부 : flex-wrap

---

### 상속 , 공용 키워드

- 상속 : 하위요소가 상위 요소의 스타일 속성값을 물려 받는 것
  - 상위요소로부터 상속이 이루어지는 속성이 있는 반면, 그렇지 않은 속성도 있음 !
- 공용키워드: 모든 CSS 속성에 사용가능한 키워드가 있음. 때문에 이를 전역값이라 표현하기 도함
  - 키워드
    - inherit : 상위요소로부터 해당 속성의 값을 받아 사용
    - initial : 해당 속성의 기본값을 요소에 적용
    - unset : 상속 속성에 대해서는 inherit 처럼, 상속되지 않는 속성에 대해서는 initial 처럼 적용됨

---

### z-index

- z-index 속성은 요소의 쌓임 순서를 정의 할 수 있음
- 정수값을 지정하여 쌓임 맥락에서의 레벨을 정의하는 방식으로 적용되며, 위치 지정 요소에 대해 적용할 수 있는 속성
- ⇒ 위치지정 요소: position 속성이 정의되어있는 요소
- 동일한 위치에 요소들이 배치되면, 요소들은 z축에서 쌓이게 됨
- 기본값 : auto - 새로운 쌓임 맥락이 형성되지 않은 자연스러운 상태
