//Ambil data username dar session Storage
const username = localStorage.getItem("username");

//GET elemen dengan ID User
const userElement = document.getElementById("user-display");

//Mengubah teks atau konten dengan nama pengguna
if (username) {
  userElement.textContent = `🙍‍♂️ Welcome : ${username}`;
}

document.addEventListener("DOMContentLoaded", async function () {
  let branch = await getBranch();
  //   const apiResult = this.document.querySelector("#table-filter tbody");
  const selectBranch = document.querySelector("#branch-name");
  selectBranch.innerHTML = "";
  branch.branch_report.forEach((e) => {
    selectBranch.innerHTML += `<option value="${e.branch_name}">${e.branch_name}</option>`;
  });

  document.querySelector("#form-filter-branch").addEventListener("submit", async function (e) {
    e.preventDefault();

    const start_date = this.querySelector("#start-date").value;
    const end_date = this.querySelector("#end-date").value;
    const branch_name = this.querySelector("#branch-name").value;

    let data = {
      start_date,
      end_date,
      branch_name,
    };
    console.log(data);

    try {
      console.log("ss", JSON.stringify(data));
      const result = await fetchApi(data);
      tableBranch(result);
      console.log("x", result);
      return result;
    } catch (error) {
      console.error("Error Fetching API :", error);
      //   apiResult.innerHTML = "<tr>Error Fetching API</tr>";
    }
  });

  async function fetchApi(data) {
    const apiUrl = "http://127.0.0.1:5000/api/branch_report_filter";
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    // window.location.href = "filterbranch.html";
    return response.json();
  }

  function tableBranch(result) {
    const tableFilter = document.querySelector("#table-filter tbody");
    tableFilter.innerHTML += `<tr>
    <td>${result.branch_name}</td>
    <td>${result.start_date}</td>
    <td>${result.end_date}</td>
    <td>${result.credit}</td>
    <td>${result.debit}</td>
    </tr>`;
  }

  //   function displayResult(result) {
  //     apiResult.innerHTML = `<tr>
  //         <td>${result.start_date}</td>
  //         <td>${result.end_date}</td>
  //         <td>${result.branch_name}</td>
  //         <td>${result.credit}</td>
  //         <td>${result.debit}</td>
  //     </tr>`;
  //   }

  //   fetch("http://127.0.0.1:5000/api/branch_report_filter", {
  //     method: "POST",
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(),
  //   })
  // .then((result) => {
  //   if (result.ok) {
  //     alert("Failed To Check Branch Report");
  //   } else {
  //     //   window.location.href = "branchFilter.html";
  //     return result.json();
  //   }
  // })
  // .then((data) => {
  //   console.log(data);
  //   const crediValue = data.credit;
  //   const debitValue = data.debit;
  // })
  // .catch((error) => {
  //   console.error("Error during fetch:", error);
  // });
});

//Fetch POST Filter
// async function filterBranch() {
//   try {
//     const result = await fetch("http://127.0.0.1:5000/api/branch_report_filter", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });
//     const res = await result.json();
//     console.log(res);
//     return res;
//   } catch (error) {
//     console.error(error);
//   }
// }

//fetch GET data Branch
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

// filterBranch();
