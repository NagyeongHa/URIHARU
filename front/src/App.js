import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./route/Home";
import NotFound from "./components/NotFound";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import TextEdit from "./components/TextEdit";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<SignUp />}></Route>
          <Route path='/' element={<Home />}></Route>
          <Route path='/textedit' element={<TextEdit />}></Route>
          <Route path='*' element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
