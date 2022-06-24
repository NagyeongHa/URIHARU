import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Header from "./components/Header";
//import Main from "./components/Main";
import Home from "./route/Home";
import NotFound from "./components/NotFound";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import DiaryWrite from "./components/DiaryWrite";
import DiaryModify from "./components/DiaryModify";
import AuthRoute from "./Context/AuthRoute";
import MyPage from "./components/MyPage";
import Header from "./components/Header";
import theme from "./styles/theme";
import { ThemeProvider } from "styled-components";

function App() {
  return (
    <div>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Header />
          <Routes>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/signup' element={<SignUp />}></Route>
            <Route
              path='/'
              element={
                <AuthRoute>
                  <Home />
                </AuthRoute>
              }
            ></Route>
            <Route
              path='/diary/create'
              element={
                <AuthRoute>
                  <DiaryWrite />
                </AuthRoute>
              }
            ></Route>
            <Route
              path='/diary/modify'
              element={
                <AuthRoute>
                  <DiaryModify />
                </AuthRoute>
              }
            ></Route>
            <Route
              path='/mypage'
              element={
                <AuthRoute>
                  <MyPage />
                </AuthRoute>
              }
            ></Route>
            <Route path='*' element={<NotFound />}></Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
