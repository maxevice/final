import { Component } from "./Component.js";
import { APIProxy } from "../apiProxy.js";
import { eventBus } from "../eventBus.js";

class Dashboard extends Component {
  async render() {
    this.clear();
    this.container.className = "page dashboard-page";

    const title = this.createTitle("Ваші звички");
    this.statusBar = document.createElement("div");
    this.statusBar.className = "habit-status";
    this.container.append(title, this.statusBar);

    const list = document.createElement("ul");
    list.className = "habit-list";
    this.container.appendChild(list);

    const form = document.createElement("form");
    const input = this.createInput({
      name: "title",
      type: "text",
      placeholder: "Нова звичка",
    });
    const addButton = this.createButton("Додати");
    form.append(input, addButton);
    this.container.appendChild(form);

    try {
      const data = await APIProxy.get("/api/habits");
      this.updateHabitStatus(data);

      this.renderHabits(data, list);

      list.addEventListener("change", async (event) => {
        const target = event.target;
        if (target.tagName === "INPUT" && target.type === "checkbox") {
          const habitId = target.getAttribute("data-id");
          const done = target.checked;

          try {
            await APIProxy.patch(`/api/habits/${habitId}`, { done });
            eventBus.emit("habitStatusChanged");
          } catch (err) {
            console.error("Помилка при оновленні статусу звички:", err);
          }
        }
      });

      list.addEventListener("click", async (event) => {
        const target = event.target;

        if (
          target.tagName === "BUTTON" &&
          target.classList.contains("delete-btn")
        ) {
          const habitId = target.getAttribute("data-id");

          try {
            await APIProxy.delete(`/api/habits/${habitId}`);
            const updated = await APIProxy.get("/api/habits");
            list.innerHTML = "";
            this.renderHabits(updated, list);
            this.updateHabitStatus(updated);
          } catch (err) {
            console.error("Помилка при видаленні звички:", err);
          }
        }
      });

      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const title = input.value.trim();
        if (!title) return;
        try {
          await APIProxy.post("/api/habits", { title });
          input.value = "";
          const updated = await APIProxy.get("/api/habits");
          list.innerHTML = "";
          this.renderHabits(updated, list);
          this.updateHabitStatus(updated);
        } catch (err) {
          console.error("Помилка при додаванні звички:", err);
        }
      });

      eventBus.subscribe("habitStatusChanged", async () => {
        try {
          const updatedHabits = await APIProxy.get("/api/habits");
          this.updateHabitStatus(updatedHabits);
        } catch (err) {
          console.error("Помилка при оновленні статусу:", err);
        }
      });
    } catch (err) {
      console.error("Помилка завантаження звичок:", err);
    }
  }

  updateHabitStatus(habits) {
    const total = habits.length;
    const doneCount = habits.filter((h) => h.done).length;
    this.statusBar.textContent = `Виконано ${doneCount} з ${total} звичок`;
  }
  renderHabits(data, list) {
    for (const h of data) {
      const li = document.createElement("li");
      li.setAttribute("data-id", h._id);

      const span = document.createElement("span");
      span.textContent = h.title;

      const checkbox = this.createInput({ type: "checkbox" });
      checkbox.setAttribute("data-id", h._id);
      checkbox.checked = h.done;

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "✖";
      deleteBtn.className = "delete-btn";
      deleteBtn.setAttribute("data-id", h._id);

      li.append(checkbox, span, deleteBtn);
      list.appendChild(li);
    }
  }
}

export { Dashboard };
