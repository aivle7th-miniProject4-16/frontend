---

## 📘 AIVLE Book Manager – Frontend

이 프로젝트는 AIVLE SCHOOL 6반 16조가 개발한 **도서 관리 웹 애플리케이션의 프론트엔드**입니다.
사용자는 도서를 등록하고, OpenAI DALL·E API를 통해 책 표지를 생성할 수 있습니다.

---

### 🚀 주요 기능

* 도서 목록 조회 / 상세 보기
* 도서 등록 (제목, 저자, 설명)
* **OpenAI API 키를 통한 책 표지 이미지 생성**
* 도서 정보 수정 및 삭제
* React + MUI 기반 UI 구성

---

### 🛠️ 기술 스택

| 분류                 | 기술                                 |
| ------------------ | ---------------------------------- |
| Frontend Framework | React (Vite 기반)                    |
| UI Framework       | MUI (Material UI)                  |
| 라우팅                | React Router                       |
| API 호출             | Axios                              |
| 이미지 생성             | OpenAI DALL·E API                  |
| 상태관리               | useState / useEffect (Local State) |

---

### 📂 프로젝트 구조

```
src/
├── api/                  # axios 요청 함수 모음 (bookApi, generateCoverImage)
├── components/           # Header 등 공통 컴포넌트
├── pages/                # AddBookPage, EditBookPage, DetailPage 등
├── App.jsx               # 라우터 설정
├── main.jsx              # React 진입점
└── ...
```

---

### 🧪 실행 방법

```bash
# 1. 의존성 설치
npm install

# 2. 개발 서버 실행
npm run dev
```

---

### 🔐 OpenAI API 키 사용법

> **이 프로젝트는 사용자의 API 키를 직접 입력받아 DALL·E 이미지 생성을 요청합니다.**

1. [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)에서 개인 API 키를 발급받습니다.
2. 도서 등록 또는 수정 시, 입력 필드에 API 키를 직접 입력합니다.
3. 해당 키는 서버에 저장되지 않으며, 브라우저 내 메모리에만 존재합니다.

---

### 📸 이미지 생성 예시 흐름

1. 도서 제목과 설명 입력
2. OpenAI API 키 입력
3. `이미지 생성` 버튼 클릭
4. DALL·E를 통한 표지 이미지 생성 및 미리보기 표시
5. 저장 시 서버에 URL 저장

---

### ✅ TODO / 개선 사항

* [ ] OpenAI 모델/사이즈 옵션 UI 추가
* [ ] localStorage를 통한 API 키 임시 저장
* [ ] 표지 이미지 다운로드 기능
* [ ] 반응형 개선 (모바일 뷰)

