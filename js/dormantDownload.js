const downloadDormant = document.querySelector("#download-dormant");
downloadDormant.addEventListener("click", async function (e) {
  e.preventDefault();
  try {
    const result = await fetch("http://127.0.0.1:5000/api/download?q=get_dormant", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
    });
    if (result.ok) {
      window.location.href = "http://127.0.0.1:5000/api/download?q=get_dormant";
    }
    console.log(this);
    return result;
  } catch (error) {
    console.error(error);
  }
});
