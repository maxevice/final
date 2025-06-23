import { APIProxy } from "../apiProxy.js";
import { Component } from "./Component.js";

class LoginForm extends Component {
  render() {
    this.clear();
    this.container.className = "page login-page";

    const title = this.createTitle("Вхід");
    const form = document.createElement("form");

    const email = this.createInput({
      name: "email",
      type: "email",
      placeholder: "Email",
    });

    const password = this.createInput({
      name: "password",
      type: "password",
      placeholder: "Пароль",
    });

    const submit = this.createButton("Увійти");
    const error = this.createErrorDiv();

    form.append(email, password, submit);

    const p = document.createElement("p");
    p.innerHTML = `Немає акаунта? <a href="#" id="to-register">Зареєструватися</a>`;

    this.container.append(title, form, p, error);

    p.querySelector("#to-register").addEventListener("click", (e) => {
      e.preventDefault();
      this.onNavigate("/register");
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      error.textContent = "";

      try {
        const data = await APIProxy.post("/api/users/login", {
          email: email.value,
          password: password.value,
        });

        localStorage.setItem("token", data.token);
        this.onNavigate("/habits");
      } catch (err) {
        error.textContent = err.message || "Сервер не відповідає";
      }
    });
  }
}

export { LoginForm };
