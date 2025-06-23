import { APIProxy } from "../apiProxy.js";
import { Component } from "./Component.js";

class RegisterForm extends Component {
  render() {
    this.clear();
    this.container.className = "page register-page";

    const title = this.createTitle("Реєстрація");
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

    const submit = this.createButton("Зареєструватися");
    const error = this.createErrorDiv();

    form.append(email, password, submit);

    const p = document.createElement("p");
    p.innerHTML = `Вже є акаунт? <a href="#" id="to-login">Увійти</a>`;

    this.container.append(title, form, p, error);

    p.querySelector("#to-login").addEventListener("click", (e) => {
      e.preventDefault();
      this.onNavigate("/login");
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      error.textContent = ""

      try {
        await APIProxy.post("/api/users/register", {
          email: email.value,
          password: password.value,
        });
        this.onNavigate("/login");
      } catch (err) {
        error.textContent = err.message || "Сервер не відповідає";
      }
    });
  }
}

export { RegisterForm };
