//Ambil data username dar session Storage
const username = localStorage.getItem("username");

//GET elemen dengan ID User
const userElement = document.getElementById("user-display");

//Mengubah teks atau konten dengan nama pengguna
if (username) {
  userElement.textContent = `🙍‍♂️ Welcome : ${username}`;
}

let keyword = window.location.search;
let q = new URLSearchParams(keyword);
let id = q.get("id");

document.addEventListener("DOMContentLoaded", async function () {
  let user = await getUser();
  let branch = await getBranch();
  let name = document.querySelector("#name");
  name.value = user.name;
  const userId = document.querySelector("#id-user");
  userId.value = user.id;
  const selectBranch = document.querySelector("#branch");
  selectBranch.innerHTML = "";
  branch.branch_report.forEach((e) => {
    selectBranch.innerHTML += `<option value="${e.id_branch}">${e.branch_name}</option>`;
  });

  document.getElementById("form-add-account").addEventListener("submit", function (e) {
    e.preventDefault();
    //Ambil Data dari Form Add Account
    const id_user = this.querySelector("#id-user").value;
    const id_branch = this.querySelector("#branch").value;
    const account_name = this.querySelector("#account-name").value;
    const account_number = this.querySelector("#account-number").value;
    const balance = this.querySelector("#balance").value;
    let data = {
      id_user,
      id_branch,
      account_name,
      account_number,
      balance,
    };

    fetch("http://127.0.0.1:5000/api/account", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((result) => {
        // console.log(result.status);
        if (!result.ok) {
          alert("Failed to create Account, Please Check Your Data");
        } else {
          alert("Account Created Succesfully");
          window.location.href = "account.html?id=" + id;
          // getAkun();
        }
        console.log("result: ", result);
        return result.json();
      })
      .catch((error) => console.error("Error:", error));
  });
});

async function getAkun() {
  try {
    const result = await fetch("http://127.0.0.1:5000/api/account/" + id, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
    });
    const res = await result.json();
    console.log(res);
    return res;
  } catch (error) {
    console.error(error);
  }
}

async function createTableAccounts() {
  const createAccounts = document.querySelector("#table-account tbody");

  let akun = await getAkun();

  createAccounts.innerHTML = "";

  let rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  akun.forEach((e) => {
    createAccounts.innerHTML += `<tr>
    <td>${e.name}</td>
    <td>${e.branch_name}</td>
    <td>${e.account_name}</td>
    <td>${e.account_number}</td>
    <td>${e.account_active ? "Active" : "Deactive"}</td>
    <td>${rupiah(e.balance)}</td>
    <td>
      <button type="submit" class="btn btn-warning">Edit</button>
      <!-- Button trigger modal -->
      <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#modalClose">
        Close
      </button>
    </td>
  </tr>`;
  });
}

async function getUser() {
  try {
    const result = await fetch("http://127.0.0.1:5000/api/user", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
    });
    const res = await result.json();
    let user = res.find((u) => u.id == id);
    // console.log(user);
    return user;
  } catch (error) {
    console.error(error);
  }
}

async function closeAccount() {
  try {
    const result = await fetch("http://127.0.0.1:5000/api/account/close/", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
    });
    const res = await result.json();
    return res;
  } catch (error) {
    console.error(error);
  }
}

async function getBranch() {
  try {
    const result = await fetch("http://127.0.0.1:5000/api/branch_report", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
    });
    const res = await result.json();
    console.log(res);
    return res;
  } catch (error) {
    console.error(error);
  }
}

createTableAccounts();
// getAccount();
// getBranch();
// getUser();
