import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AuthProvider from "./context/authContext";
import Template from "./components/template";
import AppRouter from "./router/appRouter";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Template>
          <AppRouter />
        </Template>
      </Router>
    </AuthProvider>
  );
};

export default App;
