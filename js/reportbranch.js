const username = localStorage.getItem("username");

//GET elemen dengan ID User
const userElement = document.getElementById("user-display");

//Mengubah teks atau konten dengan nama pengguna
if (username) {
  userElement.textContent = `🙍‍♂️ Welcome : ${username}`;
}

//Buat Fungsi FETCH GET BRANCH REPORT
async function getBranchs() {
  try {
    const result = await fetch("http://127.0.0.1:5000/api/branch_report", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });

    if (result.status != 200) {
      throw new Error(`HTTP error! Status: ${result.status}`);
    }
    const res = await result.json();
    dataReport = res.branch_report;
    return dataReport;
  } catch (error) {
    console.log("Error fetching data:", error);
    return null;
  }
}

async function createBranchs() {
  const tableBranchs = document.querySelector("#table-reporting-branch");

  let dataBranchs = await getBranchs();
  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };
  dataBranchs.forEach((e, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${index + 1}</td>
        <td>${e.branch_name}</td>
        <td>${e.branch_code}</td>
        <td>${e.city}</td>
        <td>${e.address}</td>
        <td>${e.number_of_users}</td>
        <td>${e.number_of_accounts}</td>
        <td>${rupiah(e.total_balance ? e.total_balance : "0")}</td>`;
    tableBranchs.appendChild(row);
  });
}

createBranchs();
