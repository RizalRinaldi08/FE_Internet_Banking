const buttonLogout = document.getElementById("b-logout");
console.log(buttonLogout);
buttonLogout.addEventListener("click", function (e) {
  console.log(e);
  logOut(e);
});
function logOut(e) {
  e.preventDefault();
  localStorage.clear();
  sessionStorage.clear();
  window.location.href = "index.html";
  alert("log out");
}
