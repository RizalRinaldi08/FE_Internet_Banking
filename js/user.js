let listUser = [];

document.addEventListener("DOMContentLoaded", async function () {
  document.querySelector("#form-add-user").addEventListener("submit", function (e) {
    e.preventDefault();

    //Ambil Data Dari Form Add User
    const name = this.querySelector("#name-user").value;
    const username = this.querySelector("#username").value;
    const password = this.querySelector("#password").value;
    const address = this.querySelector("#address").value;
    const phone_number = this.querySelector("#phone-number").value;

    let data = {
      name,
      username,
      password,
      address,
      phone_number,
    };
    console.log(data);

    //Kirim permintaan POST ke Backend USER
    fetch("http://127.0.0.1:5000/api/user", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((result) => {
        if (!result.ok) {
          alert("Failed to Create User, Please Check Your Data");
        } else {
          alert("Account Created Successfully");
          window.location.href = "user.html";
        }
        return result.json();
      })
      .catch((error) => console.error("Error:", error));
  });

  let dataUser = await getUser();
  listUser = dataUser;
  // console.log(dataUser);
  const tableUser = this.querySelector("#table-user tbody");
  console.log(dataUser);
  dataUser.forEach((element, index) => {
    tableUser.innerHTML += `<tr>
    <td>${index + 1}</td>
    <td>${element.name}</td>
    <td>${element.Username}</td>
    <td>${element.address}</td>
    <td>${element.phone_number}</td>
    <td>
      <a href="account.html?id=${element.id}" class="btn btn-primary">Detail</a>
      <button type="button"  class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#editUser" onClick="editData('${element.Username}')">Edit</button>
    </td>
  </tr>`;
    // console.log(element);
  });
});

function editData(username) {
  const data = Array.from(listUser).find((x) => x.Username == username);
  const modal = document.getElementById("form-edit-user");
  const name = modal.querySelector("#edit-name-user");
  console.log(name);
  const id = modal.querySelector("#id-user");
  const edit_username = modal.querySelector("#edit-username");
  const phoneNumber = modal.querySelector("#edit-phone-number");
  const password = modal.querySelector("#edit-password");
  const address = modal.querySelector("#edit-address");
  id.value = data.id;
  name.value = data.name;
  password.value = data.password;
  edit_username.value = data.Username;
  phoneNumber.value = data.phone_number;
  address.value = data.address;
}

//FETCH GET API USER
async function getUser() {
  const result = await fetch("http://127.0.0.1:5000/api/user", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
  const res = await result.json();
  return res;
}

//FETCH PUT API
async function updateUser(id, dataUser) {
  try {
    const result = await fetch("http://127.0.0.1:5000/api/user/" + id, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataUser),
    });
    if (result.status != 200) {
      throw new Error("Failed To Update");
    } else {
      alert("Update Success");
      window.location.href = "user.html";
    }
    const res = await result.json();
    return res;
  } catch (error) {
    alert(error);
  }
  // console.log("http://127.0.0.1:5000/api/user/" + id);
}

const saveUser = document.getElementById("form-edit-user");

saveUser.addEventListener("submit", async function (e) {
  e.preventDefault();
  e.stopPropagation();

  const dataUserForm = new FormData(this);
  const data = {
    name: dataUserForm.get("name-user"),
    username: dataUserForm.get("username"),
    password: dataUserForm.get("password"),
    phone_number: dataUserForm.get("phone-number"),
    address: dataUserForm.get("address"),
  };
  // console.log("data:", data);

  let updateData = await updateUser(dataUserForm.get("id"), data);
  // console.log(updateData);
});
