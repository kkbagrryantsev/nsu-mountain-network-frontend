import {BrowserRouter, Routes, Route} from "react-router-dom";
import Default from "./layouts/Default";
import NotFound from "./components/NotFound";
import HomePage from "./components/HomePage";
import "./App.css";

function App() {
    return (<BrowserRouter>
        <div className="App">
            <Routes>
                <Route
                    path="/"
                    element={<Default/>}
                >
                    <Route index element={<HomePage/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Route>
            </Routes>
        </div>
    </BrowserRouter>);
}

export default App;
