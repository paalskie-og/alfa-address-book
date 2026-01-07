const form = document.getElementById("contactForm");
const contactList = document.getElementById("contactList");

let contacts = [];

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const location = document.getElementById("location").value.trim();

  // VALIDASI INPUT
  if (name === "" || phone === "" || email === "" || location === "") {
    alert("Mohon lengkapi atau isi seluruh data kontak.");
    return;
  }

  const contact = {
    name,
    phone,
    email,
    location
  };

  contacts.push(contact);
  tampilkanKontak();
  form.reset();
});

function tampilkanKontak() {
  contactList.innerHTML = "";

  contacts.forEach(function (contact, index) {
    const div = document.createElement("div");
    div.className = "bg-white p-3 rounded shadow";

    div.innerHTML = `
      <p class="font-semibold">${contact.name}</p>
      <p>📞 ${contact.phone}</p>
      <p>📧 ${contact.email}</p>
      <p>📍 ${contact.location}</p>
      <button
        onclick="hapusKontak(${index})"
        class="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
        Hapus
      </button>
    `;

    contactList.appendChild(div);
  });
}

function hapusKontak(index) {
  contacts.splice(index, 1);
  tampilkanKontak();
}
