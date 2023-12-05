//Ambil data username dar session Storage
const username = localStorage.getItem("username");

//GET elemen dengan ID User
const userElement = document.getElementById("user-display");

//Mengubah teks atau konten dengan nama pengguna
if (username) {
  userElement.textContent = `🙍‍♂️ Welcome : ${username}`;
}

// Get Transaction Type
const transactionType = document.querySelector("#transact-type");

//Get Transaction Form:
const transferCard = document.querySelector(".transfer-card");
const depositCard = document.querySelector(".deposit-card");
const withdrawCard = document.querySelector(".withdraw-card");
// const historyCard = document.querySelector(".history-card");

// document.addEventListener("DOMContentLoaded", function () {
//   // Your code here
//   withdrawCard.style.display = "none";
//   depositCard.style.display = "none";
//   historyCard.previousElementSibling.style.display = "none";
//   // historyCard.style.display = "none";
//   // alert("Document content is loaded!");
// });

//Check For Transaction Event Listener
transactionType.addEventListener("change", function () {
  //check for transaction type and display form:
  switch (transactionType.value) {
    case "transfer":
      transferCard.style.display = "block";
      transferCard.nextElementSibling.style.display = "none";
      withdrawCard.style.display = "none";
      // historyCard.style.display = "none";
      break;

    case "deposit":
      depositCard.previousElementSibling.style.display = "none";
      depositCard.style.display = "block";
      depositCard.nextElementSibling.style.display = "none";
      // historyCard.style.display = "none";
      break;

    case "withdraw":
      withdrawCard.previousElementSibling.style.display = "none";
      withdrawCard.style.display = "block";
      transferCard.style.display = "none";
      // historyCard.style.display = "none";
      break;
    // case "history":
    //   transferCard.style.display = "none";
    //   depositCard.style.display = "none";
    //   historyCard.previousElementSibling.style.display = "none";
    //   historyCard.style.display = "block";
    //   break;
  }
  //End check for transaction type and display form:
});
