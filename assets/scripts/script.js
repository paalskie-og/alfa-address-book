const form = document.getElementById("contactForm");
const contactList = document.getElementById("contactList");

let contacts = [];

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const location = document.getElementById("location").value.trim();

  // VALIDASI
  if (name === "" || phone === "" || email === "" || location === "") {
    alert("Mohon lengkapi atau isi seluruh data kontak.");
    return;
  }

  const contact = { name, phone, email, location };
  contacts.push(contact);

  tampilkanKontak();
  form.reset();
});

function tampilkanKontak() {
  contactList.innerHTML = "";

  if (contacts.length === 0) {
    contactList.innerHTML = `
      <p class="text-gray-500 italic">Belum ada data kontak.</p>
    `;
    return;
  }

  contacts.forEach((contact, index) => {
    const card = document.createElement("div");
    card.className =
      "bg-white rounded-xl shadow p-4 flex justify-between items-start hover:shadow-md transition";

    card.innerHTML = `
      <div>
        <p class="text-lg font-semibold">${contact.name}</p>
        <p class="text-sm text-gray-600">📞 ${contact.phone}</p>
        <p class="text-sm text-gray-600">📧 ${contact.email}</p>
        <p class="text-sm text-gray-600">📍 ${contact.location}</p>
      </div>
      <button
        onclick="hapusKontak(${index})"
        class="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition">
        Hapus
      </button>
    `;

    contactList.appendChild(card);
  });
}

function hapusKontak(index) {
  contacts.splice(index, 1);
  tampilkanKontak();
}
