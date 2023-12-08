import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "./app/store"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <GoogleOAuthProvider clientId="234832040518-v3jss0bcvg81s26uts3q25tmgkcdl7nn.apps.googleusercontent.com">
                <DndProvider backend={HTML5Backend}>
                    <App />
                </DndProvider>
            </GoogleOAuthProvider>
        </BrowserRouter>
    </Provider>
)
