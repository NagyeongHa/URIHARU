import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./route/Home";
import NotFound from "./components/NotFound";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import DiaryEdit from "./components/DiaryEdit";
import AuthRoute from "./Context/AuthRoute";
import MyPage from "./components/MyPage";
import Header from "./components/Header";
import theme from "./styles/theme";
import { ThemeProvider } from "styled-components";
import PublicRoute from "./Context/PublicRoute";
import "./styles/index.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Header />
          <Routes>
            <Route
              path='/login'
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path='/signup'
              element={
                <PublicRoute>
                  <SignUp />
                </PublicRoute>
              }
            />
            <Route
              path='/'
              element={
                <AuthRoute>
                  <Home />
                </AuthRoute>
              }
            ></Route>
            <Route
              path='/diary/edit'
              element={
                <AuthRoute>
                  <DiaryEdit />
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
