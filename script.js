let kontakList = JSON.parse(localStorage.getItem('kontakList')) || [];
let editIndex = null;

const form = document.getElementById('kontakForm');
const namaInput = document.getElementById('nama');
const emailInput = document.getElementById('email');
const teleponInput = document.getElementById('telepon');
const tbody = document.querySelector('#tabelKontak tbody');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const nama = namaInput.value.trim();
  const email = emailInput.value.trim();
  const telepon = teleponInput.value.trim();

  if (!nama || !email || !telepon) return alert("Semua field wajib diisi!");

  const kontak = { nama, email, telepon };

  if (editIndex === null) {
    kontakList.push(kontak);
  } else {
    kontakList[editIndex] = kontak;
    editIndex = null;
  }

  simpanKeLocalStorage();
  tampilkanKontak();
  form.reset();
});

function simpanKeLocalStorage() {
  localStorage.setItem('kontakList', JSON.stringify(kontakList));
}

function tampilkanKontak() {
  tbody.innerHTML = '';
  kontakList.forEach((kontak, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${kontak.nama}</td>
      <td>${kontak.email}</td>
      <td>${kontak.telepon}</td>
      <td>
        <button class="edit-btn" onclick="editKontak(${index})">Edit</button>
        <button class="hapus-btn" onclick="hapusKontak(${index})">Hapus</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function editKontak(index) {
  const kontak = kontakList[index];
  namaInput.value = kontak.nama;
  emailInput.value = kontak.email;
  teleponInput.value = kontak.telepon;
  editIndex = index;
}

function hapusKontak(index) {
  if (confirm("Yakin ingin menghapus kontak ini?")) {
    kontakList.splice(index, 1);
    simpanKeLocalStorage();
    tampilkanKontak();
  }
}

tampilkanKontak();
