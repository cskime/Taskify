# Taskify: 커뮤니티 일정 관리 및 공유 서비스

## 소개

- 코드잇 스프린트 FE 18기 과정에서 2주간 진행한 두 번째 팀 프로젝트
- 주제 선정 이유
  - GitHub project, Jira 등 평소에 자주 사용하는 kanban board 를 실제로 구현해 보는 경험
  - 높은 난이도의 프로젝트에 도전
- 배우지 않은 기술과 외부 라이브러리 사용을 최소화하고 필요한 기능들을 가능한 직접 구현하며 학습한 기술들의 숙련도 향상에 초점을 맞추어 진행

## 사용 기술

- Next.js(page router)
  - Pre-rendering을 통한 FCP 개선을 위해 도입
  - Next.js의 API routes를 http only cookie 관리를 위한 proxy server로 활용
- TypeScript
  - Type safe한 코드 작성을 위해 도입
- CSS modules
  - CSS-in-JS 방식의 styled-components와 성능 및 개발 경험을 비교해보기 위해 CSS-in-CSS 방식의 CSS modules 도입
  - 프로젝트 규모가 작아서 유의미한 성능 차이는 없었지만, 동적 스타일링이 필요한 상황에서 CSS-in-JS의 장점이 돋보임
  - 다른 프로젝트에서는 'Vanilla Extract' 등 Zero-runtime CSS-in-JS 라이브러리를 사용해봐도 좋을 것 같다.
- Axios
  - Fetch API 대신 팀원들에게 더 익숙한 axios 사용
- Vercel
  - 배포에 소요되는 시간을 최소화하기 위해 쉽고 간단하게 배포할 수 있는 Vercel 사용
- GitHub Actions
  - GitHub 조직 계정의 repository를 Vercel에 무료 tier로 배포하기 위해 개인 repository로 push하여 우회하는 workflow 작성

## 담당 역할 및 개발 내용

### Modal 공통 컴포넌트 개발

- 목표 : 앱 전체에서 modal 요소를 개발할 때 사용할 공통 컴포넌트 구현
- 활동
  - Modal 요소를 구현할 수 있는 `Modal` 공통 컴포넌트 구현 ([관련 PR](https://github.com/Codeit-FE18-Part3-Team4/Taskify/pull/37))
  - 사용자에게 message를 보여주는 `Dialog` 컴포넌트 구현 ([관련 PR](https://github.com/Codeit-FE18-Part3-Team4/Taskify/pull/47))
  - 사용자와 '확인'/'취소' action을 사용해서 상호작용 할 수 있는 `Alert` 컴포넌트 구현 ([관련 PR](https://github.com/Codeit-FE18-Part3-Team4/Taskify/pull/53))
  - 사용자로부터 다양한 형태의 값을 입력받을 수 있는 `Sheet` 컴포넌트 구현 ([관련 PR](https://github.com/Codeit-FE18-Part3-Team4/Taskify/pull/73))
- 성과
  - `Modal` 공통 컴포넌트를 독립적으로 개발하여 `Dialog`, `Alert`, `Sheet` 등 다양한 형태의 modal을 빠르게 개발할 수 있었음
  - 다른 팀원들도 필요에 따라 modal UI를 빠르게 구현하고 기능 개발에 집중할 수 있었음
- 아쉬운 점
  - Animation으로 닫히는 modal을 구현하기 위해 mount와 animation 두 가지 상태를 사용하여 복잡도가 높아짐
  - 상탯값 1개만 사용하여 복잡도를 낮추는 방향으로 개선해 볼 예정

### 코드 리뷰

- 목표ㄴ
  - 잠재적인 버그나 잘못 구현된 코드가 병합되지 않도록 방지
  - 팀원들이 서로의 코드를 리뷰하며 현업에서 다른 개발자들과 협업하는 과정을 간접적으로 경험
- 활동
  - 팀원들이 개발한 PR에서 적극적으로 코드 리뷰를 진행 ([총 115개 PR 중 44개에 comment 작성](https://github.com/Codeit-FE18-Part3-Team4/Taskify/pulls?q=is%3Apr+is%3Aclosed+commenter%3Acskime))
- 성과
  - 코드 스타일을 일관되게 맞추고 실수하거나 잘못 작성된 코드가 병합되지 않도록 사전에 방지
  - 담당하지 않은 파트의 코드 이해도가 높아져서 공통 컴포넌트를 설계할 때 도움이 됨
- 아쉬운 점
  - 초반에 세세한 부분까지 리뷰하는 데에 시간이 소요된 점
  - 팀원들이 리뷰를 반영하기 위해 수정에 많은 시간을 할애하면서 전체적으로 개발 속도와 생산성이 저하되는 것을 느낌
  - 프로젝트 기한과 일정을 고려하여 버그 수정, 성능 개선 등 우선순위가 높은 부분 위주로 리뷰했다면 더 좋았을 것 같다.

## 문제 해결

### Page에서 `useMediaQuery` custom hook을 사용할 때 error가 발생하는 문제

- 문제 상황
  - TypeScript 코드에서 responsive UI 구성을 위해 `@uidotdev/usehooks` package의 `useMediaQuery`를 활용한 [`useResponsive` custom hook](https://github.com/Codeit-FE18-Part3-Team4/Taskify/blob/develop/src/hooks/use-responsive.tsx) 구현
  - Modal 컴포넌트에서는 정상적으로 사용 가능했지만, page 컴포넌트에서 사용하면 "useMediaQuery is a client-only hook" error 발생
    <br><img src="/docs/images/image-01.png" /><br>
- 문제 원인
  - Next.js 서버에서 page가 pre-rendering 될 때, `useMediaQuery` 내부에서 `matchMedia` Web API를 사용하여 발생하는 문제
  - `@uidotdev/usehooks` package는 `useSyncExternalStore` hook을 사용하여 server에서 실행될 때 해당 error를 throw 하는 것을 확인 ([source code](https://github.com/uidotdev/usehooks/blob/945436df0037bc21133379a5e13f1bd73f1ffc36/index.js#L785-L807))
  - Modal component는 page 로드 후 CSR 방식으로 rendering 되므로 문제가 없었음
- 해결 방법
  - `matchMedia` Web API가 client에서만 실행될 수 있도록 구현해야 함
  - Server에서도 error 없이 `matchMedia`를 사용할 수 있는 [`react-responsive` package로 교체](https://github.com/Codeit-FE18-Part3-Team4/Taskify/blob/develop/src/hooks/use-ssr-responsive.tsx)
    - `react-responsive` package는 [server에서 실행될 때 device 정보를 주입하여 Web API가 아닌 별도의 라이브러리에 구현된 `matchMedia`를 실행](https://github.com/yocontra/react-responsive/blob/ff23a19f49576a3f06c8334affbef5996f147e12/src/useMediaQuery.ts#L72-L92)
    - Web API의 `matchMedia`는 [component가 mount 된 시점 이후에 client 에서만 호출되도록 보장](https://github.com/yocontra/react-responsive/blob/ff23a19f49576a3f06c8334affbef5996f147e12/src/useMediaQuery.ts#L72-L92)

### Response body로 받는 access token을 안전하게 관리하기

- 문제 상황
  - 실습 API 서버는 만료 기간이 없는 access token만 제공하고 refresh token은 제공하지 않음
  - Access token을 외부에 노출시키지 않고 관리할 수 있는 방법 필요
- 해결 방법
  - Next.js의 API routes 기능을 활용한 proxy 서버 사용
  - Proxy 서버를 통해 로그인 요청을 보내면 실습 API 서버가 반환하는 access token을 `HttpOnly`, `Secure`, `SameSite=strict` 설정된 cookie로 저장
  - Dynamic catch all API routes를 활용하여 모든 API 요청을 proxy 서버로 보내고, 실제 API 서버로 요청을 보낼 때 `Authorization` header에 token을 담아서 전송
- 성과
  - `HttpOnly` cookie에 저장하고 사용하여 XSS 공격에 대응
  - `Secure`, `SameSite=strict` 설정을 통해 CSRF 공격에 대응
  - Access token이 브라우저를 통해 외부로 노출되지 않음
- 아쉬운 점
  - 모든 API 요청이 proxy 서버를 경유해야 하므로 리소스를 더 많이 사용해야 함
  - 보안 문제를 해결하기 위해 access token과 refresh token을 함께 사용하는 시나리오를 경험해 보지 못함
