import  {Component}  from "./Component.js";

class RegisterForm extends Component {
  render() {
    this.clear();

    const title = this.createTitle('Реєстрація');
    const form = document.createElement('form');
    const email = this.createInput({ name: 'email', type: 'email', placeholder: 'Email' });
    const password = this.createInput({ name: 'password', type: 'password', placeholder: 'Пароль' });
    const submit = this.createButton('Зареєструватися');
    const error = this.createErrorDiv();

    form.append(email, password, submit);

    const p = document.createElement('p');
    p.innerHTML = `Вже є акаунт? <a href="#" id="to-login">Увійти</a>`;

    this.container.append(title, form, p, error);

    p.querySelector('#to-login').addEventListener('click', (e) => {
      e.preventDefault();
      this.onNavigate('/login');
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      try {
        const res = await fetch('/api/users/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: email.value,
            password: password.value
          })
        });

        const data = await res.json();

        if (!res.ok) {
          error.textContent = data.error || 'Помилка реєстрації';
        } else {
          this.onNavigate('/login');
        }
      } catch {
        error.textContent = 'Сервер не відповідає';
      }
    });
  }
}

export {RegisterForm}