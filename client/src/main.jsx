import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/tailwind.css";
import "./styles/index.css";
import { Provider } from "react-redux";
import rootReducer from "./store/actions/reducers/index.js";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

// DevTools
import { composeWithDevTools } from "redux-devtools-extension";
import { readPdf } from "./store/actions/pdf.actions.js";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

store.dispatch(readPdf());

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
