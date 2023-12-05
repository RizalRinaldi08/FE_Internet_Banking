//Ambil data username dar session Storage
const userName = localStorage.getItem("username");

//GET elemen dengan ID User
const userDisplay = document.getElementById("user-display");

//Mengubah teks atau konten dengan nama pengguna
if (userName) {
  userDisplay.textContent = `🙍‍♂️ Welcome : ${userName}`;
}


//Create Accordion Accounts
async function createAccordion() {
  const tabelAccounts = document.querySelector("#accordionFlushExample");
  const noAccounts = document.querySelector("#no-accounts");
  let accounts = await getAccounts();
  console.log("x", accounts);

  if (accounts.length != 0) {
    noAccounts.style.display = "none";
  } else {
    noAccounts.style.display = "block";
  }
  let totalAccountBalance = 0;
  const totalBalance = document.querySelector("#total-balance");
  accounts.forEach((e) => {
    totalAccountBalance += e.balance;
    tabelAccounts.innerHTML += `<div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-${e.account_number}" aria-expanded="false" aria-controls="flush-${e.account_number}">${e.account_name}</button>
        </h2>
        <div id="flush-${e.account_number}" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
          <div class="accordion-body">
          <table>
            <tr>
                <th>Name </th>
                <td>: ${e.name}</td>
            </tr>
              <tr>
                <th>Account Name </th>
                <td>: ${e.account_name}</td>
              </tr>
              <tr>
                <th>Account Number </th>
                <td>: ${e.account_number}</td>
              </tr>
              <tr>
                <th>Status </th>
                <td>: ${e.account_active ? "Active" : "Deactive"}</td>
              </tr>
              <tr>
                <th>Branch Name </th>
                <td>: ${e.branch_name}</td>
              </tr>
              <tr>
                <th>Branch Code :</th>
                <td>: ${e.branch_code}</td>
              </tr>
              <tr>
                <th>City </th>
                <td>: ${e.city}</td>
              </tr>
              <tr>
                <th>Balance </th>
                <td>: ${e.balance}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>`;
  });
  totalBalance.innerHTML = totalAccountBalance;
}

// FETCH  GET API ACCOUNTS
async function getAccounts() {
  const result = await fetch("http://127.0.0.1:5000/api/account/" + localStorage.getItem("id"), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      "Content-Type": "application/json",
    },
  });
  const res = await result.json();
  //   console.log(res);
  return res;
}

//Create Select Accounts
async function createSelectAccounts() {
  const selectAccounts = document.querySelector("#history-accounts");

  let accounts = await getAccounts();

  accounts.forEach((e) => {
    selectAccounts.innerHTML += `<option value="${e.account_number}">${e.account_name}</option>`;
  });
  selectAccounts.addEventListener("change", function () {
    const buttonHistroy = document.querySelector("#downloadHistory");
    buttonHistroy.dataset.account_number = this.value;
    let data = { account_number: this.value };
    data = JSON.stringify(data);
    createTableHistory(data);
  });
  // console.log(selectAccounts);
}

//FETCH GET Histroy Transaction Accounts
async function getHistory(data) {
  const result = await fetch("http://127.0.0.1:5000/api/history", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: data,
  });
  const res = await result.json();
  //   console.log(res);
  return res;
}

//Create Table History by Accounts Number
async function createTableHistory(data) {
  let dataHistroy = await getHistory(data);
  const tableHistory = document.querySelector("#table-history tbody");

  tableHistory.innerHTML = "";
  dataHistroy.transaction.forEach((e, index) => {
    tableHistory.innerHTML += `<tr class="table table-striped">
      <td>${index + 1}</td>
      <td>${e.credit}</td>
      <td>${e.debit}</td>
      <td>${e.notes}</td>
      <td>${e.transaction_date}</td>
      <td>${e.balance}</td>
    </tr>`;
  });
}

// async function downloadHistory(data) {
//   try {
//     let downloadHistory = await getHistory(data);
//     const response = await fetch("http://127.0.0.1:5000/api/download?q=get_history_account&account_number=" + data.account_number);
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     const download = await response.json();
//     console.log(download);
//   } catch (error) {
//     console.error("Error Fetching Data :", error);
//   }
// }
// const downloadhistory = document.getElementById("downloadHistory");
// downloadhistory.addEventListener("click", downloadHistory);
async function downloadHistory(id) {
  try {
    let link = "http://127.0.0.1:5000/api/download?q=get_history_account&account_number=" + id;
    const result = await fetch(link, {
      method: "GET",
      headers: { "Content-type": "application/json" },
    });
    if (!result.ok) {
      throw new Error("Error");
    } else {
      window.location.href = link;
      return link;
    }
    // const res = await result;
    // return res;
    // const result = await fetch("http://127.0.0.1:5000/api/download?q=get_history_account&account_number"+)
  } catch (error) {
    console.error(error);
  }
}

createAccordion();
downloadHistory();
createSelectAccounts();
