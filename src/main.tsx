import { render } from "preact";
import { inject } from "@vercel/analytics";
import { App } from "./App";
import "./style.css";

inject();

render(<App />, document.getElementById("app")!);
