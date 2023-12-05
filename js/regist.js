const registUser = document.querySelector("#reg_form");
registUser.addEventListener("submit", async (e) => {
  e.preventDefault();

  // e.stopPropagation()
  const name = document.querySelector(".full-name").value;
  const username = document.querySelector(".username").value;
  const phone_number = document.querySelector(".phone-number").value;
  const password = document.querySelector(".password").value;
  const confirm = document.querySelector(".confirm").value;
  const address = document.querySelector(".address").value;

  let data = {
    name,
    username,
    phone_number,
    password, 
    address,
  };

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  try {
    if (password !== confirm) {
      alert("Password Berbeda, pastikan password yang anda masukkan sama");
    } else {
      const result = await fetch("http://127.0.0.1:5000/api/user", {
        method: "POST",
        headers,
        body: JSON.stringify(data),
      });

      if (result.status === 201) {
        const res = await result.json();
        alert("Registrasion berhasil. Akun anda telah dibuat");
        window.location.href = "/login.html";
      } else {
        alert("Registrasi Gagal, Cek Kembali Informasi Registrasi Anda");
      }
    }
  } catch (error) {
    console.log(error);
  }
});

document.addEventListener("DOMContentLoaded", async function () {
  let dataUser = await getUser();
  console.log(dataUser);
  const tableUser = this.querySelector("#table-user tbody");
  dataUser.forEach((element) => {
    console.log(element);
    tableUser.innerHTML += ``;
  });
});

async function getUser() {
  const result = await fetch("http://127.0.0.1:5000/api/user", {
    method: "GET",
    headers: {
      Authorization: localStorage.getItem("access_token"),
    },
  });
  const res = await result.json();
  console.log(res.tb_user);
  return res.tb_user;
}
