# like-lion-session2

< 에러 - CSS 적용 안됨 >

```
Refused to apply style from 'http://localhost:63342/style/sign.css' because its MIME type ('text/html') is not a supported stylesheet MIME type, and strict MIME checking is enabled.
```
<hr>
< 해결 >

- a 태그 속성 추가
`
type="text/html"
`

- 파일 구조 변경
    ```
  .
  ├── 📄 README.md
  ├── 📂 html
  │   ├── 📄 index.html
  │   ├── 📄 signin.html
  │   ├── 📄 signup.html
  │   └── 📂 style
  │       ├── 📄 index.css
  │       └── 📄 sign.css
  └── 📂 js
