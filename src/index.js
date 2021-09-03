import { render } from "react-dom";
import App from "./App";
import "bulma/css/bulma.css";

// src/index.js が src/App.js からインポートした App コンポーネントを、#content にマウントすることで、App コンポーネントが組み立てた JSX 式によってレンダリングされた HTML を Web ブラウザ上に表示
render(<App />, document.querySelector("#content"));
