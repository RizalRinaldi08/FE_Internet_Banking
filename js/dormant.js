// createElement();
const username = localStorage.getItem("username");

//GET elemen dengan ID User
const userElement = document.getElementById("user-display");

//Mengubah teks atau konten dengan nama pengguna
if (username) {
  userElement.textContent = `🙍‍♂️ Welcome : ${username}`;
}

async function getDormant() {
  try {
    const result = await fetch("http://127.0.0.1:5000/api/dormant_report", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });

    if (result.status != 200) {
      throw new Error(`HTTP error! Status: ${result.status}`);
    }

    const res = await result.json();
    // dormantData = res.dormant_accounts;
    // return dormantData;
    return res;
  } catch (error) {
    console.error("Error fetching data:", error);
    // Handle the error or show a user-friendly message
    return null; // or handle it according to your requirements
  }
}

async function createElement() {
  const tableDormant = document.querySelector("#table-dormant tbody");
  let dataDormant = await getDormant();
  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };
  dataDormant.forEach((e, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${index + 1}</td>
        <td>${e.name}</td>
        <td>${e.account_name}</td>
        <td>${e.account_number}</td>
        <td>${e.branch_name}</td>
        <td>${e.branch_code}</td>
        <td>${e.dormant_period}</td>
        <td>${e.is_active ? "Active" : "Deactive"}</td>
        <td>${rupiah(e.balance)}</td>
      `;
    tableDormant.appendChild(row);
  });
}

createElement();
