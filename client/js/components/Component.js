class Component {
  constructor(container, onNavigate) {
    this.container = container;
    this.onNavigate = onNavigate;
  }

  clear() {
    this.container.innerHTML = "";
  }

  createInput({ name, type = "text", placeholder }) {
    const input = document.createElement("input");
    input.name = name;
    input.type = type;
    input.placeholder = placeholder;
    input.required = true;
    return input;
  }

  createButton(text) {
    const button = document.createElement("button");
    button.textContent = text;
    return button;
  }

  createErrorDiv() {
    const error = document.createElement("div");
    error.style.color = "red";
    error.style.marginTop = "10px";
    return error;
  }

  createTitle(text) {
    const h2 = document.createElement("h2");
    h2.textContent = text;
    return h2;
  }
}

export { Component };
