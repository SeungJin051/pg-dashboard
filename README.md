## pg-dashboard

PG 대시보드를 위한 React + Vite + TypeScript 프로젝트입니다.

### 요구사항

- 대시보드 개발
  - API를 활용하여, 결제/가맹점 관련 데이터를 시각화하는 대시보드 화면 페이지 개발

### 시스템 요구사항

- Node.js: 20.x LTS (필수)
- 패키지 매니저: npm
- React 18 이상

### 설치

### .env 파일 생성 후 API Base URL 추가

```env
VITE_API_BASE_URL: ...
```

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 표시되는 로컬 주소(예: `http://localhost:5173`)로 접속하면 됩니다.

### 프론트엔드 폴더 구조

```bash
pg-dashboard
├─ .eslintrc.cjs
├─ .prettierignore
├─ .prettierrc
├─ README.md
├─ index.html
├─ package-lock.json
├─ package.json
├─ postcss.config.cjs
├─ public
│  └─ vite.svg
├─ src # 앱 루트
│  ├─ App.tsx
│  ├─ api # API 클라이언트
│  ├─ components # 재사용 가능한 공용 컴포넌트
│  │  └─ layout # 기본 Layout 컴포넌트
│  │  └─ ui # 기본 UI 컴포넌트
│  ├─ constants # 상수, 공통 설정 값 정의
│  ├─ hooks # 공용 커스텀 훅 정의
│  ├─ main.tsx
│  ├─ pages # 페이지 단위 화면
│  │  ├─ Dashboard # 대시보드 '/'
│  │  │  ├─ components # 대시보드 전용 UI/컴포넌트
│  │  │  ├─ hooks # 대시보드 전용 데이터/상태 훅
│  │  │  └─ index.tsx
│  │  └─ Merchants # 가맹점 '/merchants'
│  │     ├─ Detail # 가맹점 상세 페이지
│  │     ├─ List # 가맹점 목록 페이지
│  │     ├─ components # 가맹점 전용 UI/컴포넌트
│  │     ├─ hooks # 가맹점 전용 데이터/상태 훅
│  │     └─ index.tsx
│  ├─ router # 라우팅 설정
│  ├─ styles # 전역 CSS (TailwindCSS)
│  ├─ types # 전역 타입 정의
│  │  └─ api # API 요청/응답용 타입 정의
│  └─ utils # 공통 유틸 함수 모음
├─ tailwind.config.cjs
├─ tsconfig.json
└─ vite.config.ts
```

### 개발 내용

- 대시보드는 SEO가 중요하지 않고 클라이언트 사이드 렌더링이 중요하다 생각하여 Vite빌드
- 안정성을 위한 TypeScript API 타입 작성
- CSS: Tailwind CSS 커스텀
  - **디자인 의도:**
    - 대시보드에 맞도록 플랫 디자인 통일 및 사이드바를 통한 페이지 이동
    - 가맹점의 결제 상태, 활성 상태, 업종을 구별하여 컬러 지정

  - **UI/UX 포인트:**
    - 사용자 경험 개선을 위한 반응형을 고려(브레이크 포인트 768px)
    - 탐색 피로도를 줄이는 UX 목표


[feature/dashboard #1](https://github.com/SeungJin051/pg-dashboard/pull/1)

[feature/merchant #2](https://github.com/SeungJin051/pg-dashboard/pull/2)

[feature/merchant-write #3](https://github.com/SeungJin051/pg-dashboard/pull/3)
