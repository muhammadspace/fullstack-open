import ReactDOM from "react-dom/client"
import App from "./App"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { NotificationContextProvider } from "./NotificationContext.jsx"
import { UserContextProvider } from "./UserContext.jsx"

const client = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
    <QueryClientProvider client={client}>
        <UserContextProvider>
            <NotificationContextProvider>
                <App />
            </NotificationContextProvider>
        </UserContextProvider>
    </QueryClientProvider>
)