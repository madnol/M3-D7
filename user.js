let url = new URLSearchParams(window.location.search);
let id = url.get("id");

const userCard = (userInfo) => {
  return `<div class="card mb-3">
      <div class="card-header text-info" >
        Name: ${userInfo.name}
      </div>
      <div class="card-header text-danger"  >
        Username: ${userInfo.username}
      </div>
      <div class="card-header text-success"  >
        Email: ${userInfo.email}
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Adress: ${Object.values(
          userInfo.address
        ).join(", ")}</li>
        <li class="list-group-item">Phone: ${userInfo.phone}</li>
        <li class="list-group-item">Company: ${userInfo.company.name}</li>
        <li class="list-group-item">Website: ${userInfo.website}</li>
      </ul>
    </div>`;
};
const fetchUsers = async () => {
  try {
    let response = await fetch(
      "https://jsonplaceholder.typicode.com/users/" + id
    );

    let users = await response.json();
    console.log(users);

    let row = document.querySelector(".row");

    delete users.address.geo;
    let col = document.createElement("div");
    col.classList.add("col-12", "col-md-6", "col-lg-4");

    col.innerHTML = userCard(users);

    row.appendChild(col);
  } catch {
    (err) => console.log(err);
  }
};

window.onload = () => {
  fetchUsers();
};
