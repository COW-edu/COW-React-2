# Week18 학습 내용 정리

- 웹 개발에서 HTTP 요청
  - 웹 개발에서 클라이언트와 서버 간의 데이터 교환은 필수적인데 이 데이터 교환은 주로 HTTP(HyperText Transfer Protocol) 요청을 통해 이루어진다.
  - 따라서 웹 애플리케이션의 사용자 경험을 개선하고, 서버와의 효율적인 통신을 보장하기 위해서는 안정적이고 강력한 HTTP 클라이언트 도구의 사용이 필수적이다.
- **Axios:** JavaScript에서 널리 사용되는 HTTP 클라이언트 라이브러리
  - Promise 기반의 API를 제공하며, 클라이언트 사이드와 서버 사이드 모두에서 사용될 수 있다.
- **Fetch API:** 브라우저 내장 API로, 네트워크 요청을 보내고 받는 기능을 제공한다.
  - Promise 기반으로 작동하며, 모던 브라우저에서 기본적으로 지원된다.

> Promise란? JavaScript에서 비동기 연산의 최종 완료(또는 실패) 및 그 결과값을 나타내는 객체이다.

### Axios

- Axios는 Node.js 및 브라우저 환경에서 모두 사용할 수 있다.
- HTTP 요청 방식: GET, POST, PUT, DELETE 등 다양한 HTTP 요청 메서드를 지원한다.
- 요청 및 응답 인터셉터: 요청을 보내기 전후로 데이터를 가공하거나, 응답을 처리하기 전에 추가 작업을 수행할 수 있다.
  - 예를 들어, 모든 요청에 헤더를 추가하거나, 특정 상황에서 자동으로 로그아웃 처리를 할 수 있다.
  ```jsx
  // 요청 인터셉터 추가
  axios.interceptors.request.use(
    function (config) {
      // 요청을 보내기 전에 수행할 작업
      config.headers.Authorization = "Bearer your-token";
      return config;
    },
    function (error) {
      // 요청 에러 처리
      return Promise.reject(error);
    }
  );

  // 응답 인터셉터 추가
  axios.interceptors.response.use(
    function (response) {
      // 2xx 범위의 상태 코드를 받은 경우 수행할 작업
      return response;
    },
    function (error) {
      // 응답 에러 처리
      return Promise.reject(error);
    }
  );
  ```
- 전역 설정 옵션: 공통된 설정을 전역적으로 적용할 수 있어, 반복적인 코드 작성을 줄일 수 있다.
  ```jsx
  // 전역적으로 baseURL 설정
  axios.defaults.baseURL = "https://api.example.com";
  ```
- 에러 처리
  - Axios에서 응답 상태 코드를 기반으로 한 세밀한 에러 처리를 추가할 수 있다
  ```jsx
  axios
    .get("https://api.example.com/data")
    .then((response) => console.log(response.data))
    .catch((error) => {
      if (error.response) {
        console.log(`Error ${error.response.status}: ${error.response.data}`);
      } else if (error.request) {
        console.log("The request was made but no response was received");
      } else {
        console.log("Error", error.message);
      }
    });
  ```

```jsx
// Axios를 사용한 GET 요청
axios
  .get("https://api.example.com/data")
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

// Axios를 사용한 POST 요청
axios
  .post("https://api.example.com/submit", { name: "Hyunji" })
  .then((response) => {
    console.log("Data submitted successfully");
  })
  .catch((error) => {
    console.error("Submission error:", error);
  });
```

### Fetch

- 요청 및 응답 객체: Fetch는 Request 및 Response 객체를 사용하여 요청과 응답을 캡슐화한다
- Headers, Request, Response 객체 사용법: 이 객체들을 통해 HTTP 헤더를 설정하고, 요청을 보내고, 응답을 받는 등의 작업을 수행할 수 있다.
  - Fetch API를 사용할 때, 보다 세밀한 HTTP 헤더 설정을 할 수 있다. 예를 들어, 캐시 제어, 콘텐츠 유형 등의 다양한 HTTP 헤더를 조작할 수 있다.
  ```jsx
  fetch("https://api.example.com/data", {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
    },
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
  ```
- 비동기 처리: Promise를 사용하여 비동기 요청을 처리하며, `async` 및 `await` 구문과도 잘 호환된다.
  ```jsx
  async function fetchData() {
    try {
      const response = await fetch("https://api.example.com/data");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Fetching error:", error);
    }
  }

  fetchData();
  ```

```jsx
// Fetch를 사용한 GET 요청
fetch("https://api.example.com/data")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));

// Fetch를 사용한 POST 요청
fetch("https://api.example.com/submit", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ name: "Hyunji" }),
})
  .then((response) => response.json())
  .then((data) => console.log("Submission successful:", data))
  .catch((error) => console.error("Submission failed:", error));
```

### \***\*axios vs fetch\*\***

| axios                                           | fetch                                                          |
| ----------------------------------------------- | -------------------------------------------------------------- |
| 써드파티 라이브러리로 설치가 필요               | 현대 브라우저에 빌트인이라 설치 필요 없음                      |
| XSRF 보호를 해준다.                             | 별도 보호 없음                                                 |
| data 속성을 사용                                | body 속성을 사용                                               |
| data는 object를 포함한다                        | body는 문자열화 되어있다                                       |
| status가 200이고 statusText가 ‘OK’이면 성공이다 | 응답객체가 ok 속성을 포함하면 성공이다                         |
| 자동으로 JSON데이터 형식으로 변환된다           | .json()메서드를 사용해야 한다.                                 |
| 요청을 취소할 수 있고 타임아웃을 걸 수 있다.    | 해당 기능 존재 하지않음                                        |
| HTTP 요청을 가로챌수 있음                       | 기본적으로 제공하지 않음                                       |
| download진행에 대해 기본적인 지원을 함          | 지원하지 않음                                                  |
| 좀더 많은 브라우저에 지원됨                     | Chrome 42+, Firefox 39+, Edge 14+, and Safari 10.1+이상에 지원 |
