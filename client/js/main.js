import { LoginForm } from "./components/LoginForm.js";
import { RegisterForm } from "./components/RegisterForm.js";
import { Dashboard } from "./components/Dashboard.js";

const app = document.getElementById("app");

const navigate = (path) => {
  history.pushState(null, "", path);
  router(path);
};

const router = (path) => {
  const token = localStorage.getItem("token");
  if (path === "/login") {
    new LoginForm(app, navigate).render();
  } else if (path === "/register") {
    new RegisterForm(app, navigate).render();
  } else if (path === "/habits") {
    if (!token) {
      navigate("/login");
    } else {
      new Dashboard(app, navigate).render();
    }
  } else {
    navigate("/login");
  }
};

window.addEventListener("popstate", () => {
  router(location.pathname);
});

router(location.pathname);
