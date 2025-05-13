function createElement(tag, attributes, children, ...callbacks) {
  const element = document.createElement(tag);

  if (attributes) {
    Object.keys(attributes).forEach((key) => {
      element.setAttribute(key, attributes[key]);
    });
  }

  if (Array.isArray(children)) {
    children.forEach((child) => {
      if (typeof child === "string") {
        element.appendChild(document.createTextNode(child));
      } else if (child instanceof HTMLElement) {
        element.appendChild(child);
      }
    });
  } else if (typeof children === "string") {
    element.appendChild(document.createTextNode(children));
  } else if (children instanceof HTMLElement) {
    element.appendChild(children);
  }

  return element;
}

class Component {
  constructor() {
  }

  getDomNode() {
    this._domNode = this.render();
    return this._domNode;
  }
}

class TodoList extends Component {
  constructor() {
    super();
    this.state = {
      tasks: [
        { id: 1, text: "Сделать домашку", completed: false },
        { id: 2, text: "Сделать практику", completed: false },
        { id: 3, text: "Пойти домой", completed: false }
      ]
    };
  }

  onAddTask() {
    this.state.tasks.push({
      id: this.state.tasks.length + 1,
       text: '',
        completed: false}
      );
  }

  onAddInputChange() {
    const input = document.getElementById('new-todo');
    this.state.inputState = {
      placeholder: input.placeholder,
    };
  }

  render() {
    return createElement("div", { class: "todo-list" }, [
      createElement("h1", {}, "TODO List"),
      createElement("div", { class: "add-todo" }, [
        createElement("input", {
          id: "new-todo",
          type: "text",
          placeholder: "Задание",
        }, this.onAddInputChange),
        createElement("button", { id: "add-btn" }, "+", this.onAddTask),
      ]),
      createElement("ul", { id: "todos" }, this.state.tasks.map(task => (
          createElement("li", { key: task.id }, [
            createElement("input", { 
                type: "checkbox",
                checked: task.completed
              }, this.onAddInputChange),
            createElement("label", {}, task.text),
            createElement("button", {}, "🗑️", this.onAddTask)
          ])
      )))
    ]
  );
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.body.appendChild(new TodoList().getDomNode());
});