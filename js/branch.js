// FETCH POST
document.addEventListener("DOMContentLoaded", async function () {
  document.querySelector("#form-add-branch").addEventListener("submit", function (e) {
    e.preventDefault();

    // Ambil data dari formulir
    const branch_name = this.querySelector("#name-branch").value;
    const branch_code = this.querySelector("#branch-code").value;
    const city = this.querySelector("#city").value;
    const address = this.querySelector("#address").value;

    let data = {
      branch_name,
      branch_code,
      city,
      address,
    };
    // console.log(data);

    // Kirim permintaan POST ke backend BRANCH
    fetch("http://127.0.0.1:5000/api/branch", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((result) => {
        if (!result.ok) {
          alert("Failed ");
        } else {
          alert("success");
          window.location.href = "branch.html";
        }
        return result.json();
      })
      .catch((error) => console.error("Error:", error));
  });

  let dataBranch = await getAll();
  //   console.log(dataBranch);
  const tableBranch = this.querySelector("#table-branch tbody");
  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };
  dataBranch.forEach((element, index) => {
    // console.log(element);
    tableBranch.innerHTML += `<tr>
      <td>${index + 1}</td>
      <td>${element.branch_name}</td>
      <td>${element.branch_code}</td>
      <td>${element.city}</td>
      <td>${element.address}</td>
      <td>${element.number_of_users}</td>
      <td>${element.number_of_accounts}</td>
      <td>${rupiah(element.total_balance ? element.total_balance : 0)}</td>
      <td>
      <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modalEdit" onClick="editData('${element.id_branch}')">Edit</button>

      </td>
      </tr>`;
  });
});

let dataBranch = [];
function editData(id) {
  // console.log(data);
  const data = Array.from(dataBranch).find((x) => x.id_branch == id);
  const modal = document.getElementById("form-edit-branch");
  const branch_id = modal.querySelector("#id-branch");
  const name = modal.querySelector("#name-branch");
  const code = modal.querySelector("#branch-code");
  const city = modal.querySelector("#city");
  const address = modal.querySelector("#address");
  branch_id.value = data.id_branch;
  name.value = data.branch_name;
  code.value = data.branch_code;
  city.value = data.city;
  address.value = data.address;
}

//FETCH PUT API
async function updateBranch(id, data) {
  try {
    const result = await fetch("http://127.0.0.1:5000/api/branch/" + id, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (result.status != 200) {
      throw new Error("Update Gagal");
    } else {
      alert("Update Success");
      window.location.href = "branch.html";
    }
    const res = await result.json();
    return res;
  } catch (error) {
    alert(error);
  }
}

//FETCH GET API
async function getAll() {
  const result = await fetch("http://127.0.0.1:5000/api/branch_report", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
  const res = await result.json();
  dataBranch = res.branch_report;
  return res.branch_report;
}

async function getBranch() {
  const result = await fetch("http://127.0.0.1:5000/api/branch_report", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
  const res = await result.json();
  return res.branch_report;
}

const saveBranch = document.getElementById("form-edit-branch");

saveBranch.addEventListener("submit", async function (e) {
  e.preventDefault();
  e.stopPropagation();

  const dataForm = new FormData(this);
  const data = { city: dataForm.get("city"), branch_name: dataForm.get("name-branch"), branch_code: dataForm.get("branch-code"), address: dataForm.get("address") };

  let updateData = await updateBranch(dataForm.get("id-branch"), data);
  // console.log(updateData);
});

