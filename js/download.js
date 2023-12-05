const downloadDataBranch = document.querySelector("#download-branch");
downloadDataBranch.addEventListener("click", async function (e) {
  e.preventDefault();
  try {
    const result = await fetch("http://127.0.0.1:5000/api/download?q=get_branch", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
    });
    if (result.ok) {
      window.location.href = "http://127.0.0.1:5000/api/download?q=get_branch";
    }
    return result;
  } catch (error) {
    console.error(error);
  }
});


