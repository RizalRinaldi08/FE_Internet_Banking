// FETCH POST TRANSACTION TRANSFER
const transferForm = document.querySelector("#transfer-form");
transferForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const dataForm = new FormData(this);
  //   const toAccount = dataForm.get("to-account");
  //   const fromAccount = dataForm.get("from-account");
  const data = Object.fromEntries(dataForm.entries());
  //   console.log(JSON.stringify(data));

  fetch("http://127.0.0.1:5000/api/transfer_transaction", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((result) => result.json())
    .then((r) => console.log(r))
    .catch((error) => console.error("Error:", error));
});

// FETCH POST TRANSACTION DEPOSIT
const depositForm = document.querySelector("#deposit-form");
depositForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const dataForm = new FormData(this);

  const data = Object.fromEntries(dataForm.entries());

  fetch("http://127.0.0.1:5000/api/credit_transaction", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((result) => {
      if (!result.ok) {
        alert("Failed Check Your Data");
      } else {
        alert("Your Deposit Success");
        window.location.href = "dashboard.html";
      }
      return result.json();
    })
    .catch((error) => console.error("Error: ", error));
});

// FETCH POST TRANSACTION WITHDRAW
const withdrawForm = document.querySelector("#withdraw-form");
withdrawForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const dataForm = new FormData(this);

  const data = Object.fromEntries(dataForm.entries());

  fetch("http://127.0.0.1:5000/api/debit_transaction", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((result) => {
      if (!result.ok) {
        alert("Withdraw Failed, Please Check Your Data");
      } else {
        alert("Withdraw Success");
        window.location.href = "dashboard.html";
      }
      return result.json();
    })
    .catch((error) => console.error("Error: ", error));
});
