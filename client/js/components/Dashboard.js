import { Component } from "./Component.js";

class Dashboard extends Component {
  async render() {
    const token = localStorage.getItem('token');
    if (!token) return this.onNavigate('/login');

    this.clear();
    const title = this.createTitle('Мої звички');
    const counter = document.createElement('div');
    const list = document.createElement('ul');
    const form = document.createElement('form');
    const input = this.createInput({ name: 'title', placeholder: 'Нова звичка' });
    const submit = this.createButton('Додати');
    const logout = this.createButton('Вийти');
    const error = this.createErrorDiv();

    form.append(input, submit);
    logout.style.marginTop = '10px';
    counter.style.marginBottom = '10px';
    counter.style.fontWeight = 'bold';

    this.container.append(title, counter, list, form, logout, error);

    try {
      const res = await fetch('/api/habits', {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Помилка при завантаженні');
      counter.textContent = `Звичок: ${data.length}`;
      
      for (const h of data) {
        const li = document.createElement('li');
        li.textContent = h.title;
        list.appendChild(li);
      }
    } catch (err) {
      error.textContent = err.message;
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const title = input.value.trim();
      if (!title) return;

      const res = await fetch('/api/habits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ title })
      });

        if (!res.ok) {
        const data = await res.json();
        error.textContent = data.error || 'Сталася помилка';
        return;
        }

        input.value = '';
        this.render();

    });

    logout.addEventListener('click', () => {
      localStorage.removeItem('token');
      this.onNavigate('/login');
    });
  }
}

export {Dashboard}