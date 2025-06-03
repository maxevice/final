import { Component } from "./Component.js";

class LoginForm extends Component {
  render() {
    this.clear();

    const title = this.createTitle('Вхід');
    const form = document.createElement('form');
    const email = this.createInput({ name: 'email', type: 'email', placeholder: 'Email' });
    const password = this.createInput({ name: 'password', type: 'password', placeholder: 'Пароль' });
    const submit = this.createButton('Увійти');
    const error = this.createErrorDiv();

    form.append(email, password, submit);

    const p = document.createElement('p');
    p.innerHTML = `Немає акаунта? <a href="#" id="to-register">Зареєструватися</a>`;

    this.container.append(title, form, p, error);

    p.querySelector('#to-register').addEventListener('click', (e) => {
      e.preventDefault();
      this.onNavigate('/register');
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      try {
        const res = await fetch('/api/users/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: email.value,
            password: password.value
          })
        });

        const data = await res.json();

        if (!res.ok) {
          error.textContent = data.error || 'Помилка входу';
        } else {
          localStorage.setItem('token', data.token);
          this.onNavigate('/habits');
        }
      } catch {
        error.textContent = 'Сервер не відповідає';
      }
    });
  }
}

export {LoginForm}