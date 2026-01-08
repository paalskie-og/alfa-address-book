const form = document.getElementById("contactForm");
const contactList = document.getElementById("contactList");
const editIndexInput = document.getElementById("editIndex");
const formTitle = document.getElementById("formTitle");
const darkToggle = document.getElementById("darkToggle");
const searchInput = document.getElementById("searchInput");

let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

/* =====================
   DARK MODE
===================== */
if (localStorage.getItem("darkMode") === "enabled") {
  document.documentElement.classList.add("dark");
}

darkToggle.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
  localStorage.setItem(
    "darkMode",
    document.documentElement.classList.contains("dark")
      ? "enabled"
      : "disabled"
  );
});

/* =====================
   FORM SUBMIT
===================== */
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = nameInput().value.trim();
  const phone = phoneInput().value.trim();
  const email = emailInput().value.trim();
  const location = locationInput().value.trim();
  const editIndex = editIndexInput.value;

  if (!name || !phone || !email || !location) {
    alert("Mohon lengkapi atau isi seluruh data kontak.");
    return;
  }

  const contact = { name, phone, email, location };

  if (editIndex === "") {
    contacts.push(contact);
  } else {
    contacts[editIndex] = contact;
    editIndexInput.value = "";
    formTitle.textContent = "Tambah Kontak";
  }

  saveAndRender();
  form.reset();
});

/* =====================
   SEARCH
===================== */
searchInput.addEventListener("input", renderContacts);

/* =====================
   RENDER
===================== */
function renderContacts() {
  contactList.innerHTML = "";
  const keyword = searchInput.value.toLowerCase();

  const filtered = contacts.filter(c =>
    c.name.toLowerCase().includes(keyword) ||
    c.phone.includes(keyword) ||
    c.email.toLowerCase().includes(keyword) ||
    c.location.toLowerCase().includes(keyword)
  );

  if (filtered.length === 0) {
    contactList.innerHTML =
      `<li class="text-center text-sm opacity-70">Kontak tidak ditemukan.</li>`;
    return;
  }

  filtered.forEach((c, i) => {
    const realIndex = contacts.indexOf(c);

    const li = document.createElement("li");
    li.className =
      "p-4 rounded-lg bg-gray-100 dark:bg-gray-700 flex justify-between gap-3";

    li.innerHTML = `
      <div>
        <p class="font-semibold">${c.name}</p>
        <p class="text-sm">📞 ${c.phone}</p>
        <p class="text-sm">📧 ${c.email}</p>
        <p class="text-sm">📍 ${c.location}</p>
      </div>
      <div class="flex flex-col gap-2 text-sm">
        <button onclick="editContact(${realIndex})" class="text-blue-400">Edit</button>
        <button onclick="deleteContact(${realIndex})" class="text-red-400">Hapus</button>
      </div>
    `;

    contactList.appendChild(li);
  });
}

/* =====================
   ACTIONS
===================== */
function editContact(index) {
  const c = contacts[index];
  nameInput().value = c.name;
  phoneInput().value = c.phone;
  emailInput().value = c.email;
  locationInput().value = c.location;
  editIndexInput.value = index;
  formTitle.textContent = "Edit Kontak";
}

function deleteContact(index) {
  if (confirm("Yakin ingin menghapus kontak ini?")) {
    contacts.splice(index, 1);
    saveAndRender();
  }
}

/* =====================
   HELPERS
===================== */
function saveAndRender() {
  localStorage.setItem("contacts", JSON.stringify(contacts));
  renderContacts();
}

function nameInput() { return document.getElementById("name"); }
function phoneInput() { return document.getElementById("phone"); }
function emailInput() { return document.getElementById("email"); }
function locationInput() { return document.getElementById("location"); }

renderContacts();
