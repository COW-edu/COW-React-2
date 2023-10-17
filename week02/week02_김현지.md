# Week02 학습내용 정리

### 입력요소

- `<input/>`
  - 사용자로부터 값을 입력 받을 수 있는 대화형 컨트롤을 나타냄
  - 인라인 요소
  - type 속성 : type 값에 따라 입력 요소의 형태, 입력 데이터 유형 달라짐
    - text , button, color, range, date 등
    - type= “text”
      - placeholder 속성 : 어떠한 값을 입력해야 하는지 알려줄때 사용
      - maxlength 속성 : `<input>` 요소에 입력할 수 있는 최대 문자수를 명시
    - type = “button”
      - 속성에 value = “click” 이라고 하면 버튼에 click 이라고 나타남
    - type = “range”
      - max 속성
      - min 속성
      - step 속성
  - name 식별자 추가 가능 : name 속성으로 input 요소를 구별 가능

---

- `select` : 다수의 옵션을 포함할 수 있는 선택메뉴 - name 지정 가능
  - 메뉴 안에 포함되는 옵션은 `option` 태그 사용 - value 속성 지정 가능 ( value : 실제로 처리될 값 나타냄)
  ```html
  <select>
    <!-- multiple은 값을 요구하지 않는 속성 , 여러개 선택 가능하게끔함-->
    <option selected>강아지</option>
    <!-- selected는 선택된 상태로 시작  -->
    <option>고양이</option>
  </select>
  ```
- `<textarea> 기본적으로 쓰여있는 텍스트</textarea>` : 여러줄의 일반 텍스트를 입력할 수 있는 입력요소 - name 지정가능
  - input은 한줄만 쓸수 있지만 textarea는 그 이상도 가능
  - rows 속성 : 행수
  - cols 속성 : 열수

---

### form

- `form` : 사용자가 입력한 데이터를 서버로 보내기 위해 사용하는 태그
  - 입력요소들을 감싸며, 입력값을 서버측으로 제출할 수 있다.
  - form 의속성
    - action: 입력값을 전송할 서버의 url
    - method: 클라이언트가 입력한 데이터를 어떤식으로 전송할지(GET or POST)
      - GET : 서버에 요청을 보내어 응답을 받아냄
      - POST : 서버에 요청을 보내어 작업을 수행함
  ```html
  <form>
    <input type="text" placeholder="아이디" />
    <input type="text" placeholder="비밀번호" />
    <input type="submit" placeholder="로그인" />
  </form>
  <!-- form 의 내용(입력값)을 제출하기 위해 input 태그의 submit 타입 사용 가능 -->
  ```

---

### 메타태그

- meta 태그는 html 문서에 대한 메타데이터를 정의
- 항상 head 태그의 안에 들어가며, 일반적으로 문자세트, 페이지 설명, 키워드, 문서의 작성자 및 뷰포트를 설정을 지정하는데 사용
- meta 태그가 제공하는 메타데이터의 유형 . 속성
  - charset : 문자세트
  - http-equiv : 콘텐츠 속성 정보에 대한 http 헤더
  - name : 문서정보
  - content : 메타데이터 내용
- name = “viewport”
  - 기기별로 뷰포트가 다르기 때문에 발생하는 배율 문제에 대응하기 위해 meta태그를 통해 뷰포트 관련 설정 추가 가능
  ```html
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <!-- 뷰포트의 너비를 단말기 너비에 맞추고 , 초기배율을 1로 -->
  ```
