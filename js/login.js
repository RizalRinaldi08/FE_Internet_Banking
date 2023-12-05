//Function Login
const loginForm = document.querySelector("#login_form");
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  // e.stopPropagation();
  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;

  let data = {
    username,
    password,
  };

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  try {
    console.log("test");
    const result = await fetch("http://127.0.0.1:5000/api/login", {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });
    const res = await result.json();
    console.log(res);
    localStorage.setItem("access_token", res.access_token);
    localStorage.setItem("refresh_token", res.refresh_token);
    localStorage.setItem("id", res.id);
    localStorage.setItem("username", data.username);

    if (result.status == 200 && res.is_admin) {
      window.location.href = "/admin.html";
      alert("Welcome Admin");
    } else if (result.status == 200) {
      window.location.href = "/dashboard.html";
    } else {
      alert("Login Gagal, Cek Kembali username dan password anda !");
    }

    // console.log(res);s
  } catch (error) {
    console.log(error);
  }
});
