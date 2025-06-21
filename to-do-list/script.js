const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (text === "") return;

  const li = document.createElement("li");
  li.innerHTML = `
    <span>${text}</span>
    <button class="delete">Hapus</button>
  `;

  li.addEventListener("click", () => {
    li.classList.toggle("done");
  });

  li.querySelector(".delete").addEventListener("click", () => {
    li.remove();
  });

  list.appendChild(li);
  input.value = "";
});
