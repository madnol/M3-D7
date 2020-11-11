let drowpdownLinks = document.querySelectorAll(".dropdown-menu a");
let actionBtn = document.querySelector(".input-group-prepend .btn");
let filterInput = document.querySelector(".input-group input[type='text']");
filterInput.placeholder = "Filter by name";

for (let i = 0; i < drowpdownLinks.length; i++) {
  drowpdownLinks[i].onclick = () => {
    actionBtn.innerText = drowpdownLinks[i].innerText;
    filterInput.placeholder =
      "Filter by " + drowpdownLinks[i].innerText.toLowerCase();
  };
}

const userCard = (userInfo) => {
  return `<div class="card mb-3">
    <div class="card-header text-info" onclick=(openUser(${userInfo.id})) >
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

let query = "";

const handleSearchQuery = (event) => {
  query = event.target.value.toLowerCase();
};

const fetchUsers = async () => {
  try {
    let response = await fetch("https://jsonplaceholder.typicode.com/users");

    let users = await response.json();

    nameArray(users);
    addressArray(users);

    let row = document.querySelector(".row");

    if (query !== "") {
      if (actionBtn.innerText === "Name") {
        user = users.filter((res) => res.name.toLowerCase().includes(query));
      } else if (actionBtn.innerText === "Username") {
        user = users.filter((res) =>
          res.username.toLowerCase().includes(query)
        );
      } else {
        user = users.filter((res) => res.email.toLowerCase().includes(query));
      }
    } else {
      user = [...users];
    }

    row.innerHTML = "";

    user.forEach((element) => {
      delete element.address.geo;
      let col = document.createElement("div");
      col.classList.add("col-12", "col-md-6", "col-lg-4");

      col.innerHTML = userCard(element);

      row.appendChild(col);
    });
  } catch {
    (err) => console.log(err);
  }
};

window.onload = () => {
  fetchUsers();
};

const addressArray = (address) => {
  addressArr = address.map((res) => res.address);
  for (let i = 0; i < addressArr.length; i++) {
    addressArr[i] = Object.values(addressArr[i]).join(", ");
  }
};

const nameArray = (names) => {
  nameArr = names.map((res) => res.name);
};

let addressArr = [];

let nameArr = [];

let sortedUsers = [];

let user = [];

const sortAsc = () => {
  user.sort(function (a, b) {
    var nameA = a.name.toUpperCase(); // ignore upper and lowercase
    var nameB = b.name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  });
};

const sortDesc = () => {
  user.sort(function (a, b) {
    var nameA = a.name.toUpperCase(); // ignore upper and lowercase
    var nameB = b.name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return 1;
    }
    if (nameA > nameB) {
      return -1;
    }

    // names must be equal
    return 0;
  });
};

document.querySelectorAll(".input-group .btn")[2].onclick = function (e) {
  let node = e.currentTarget;
  if (node.className.includes("manuel")) {
    sortAsc();
    node.className = node.className.replace("manuel", "ermal");
  } else {
    sortDesc();
    node.className = node.className.replace("ermal", "manuel");
  }
  let row = document.querySelector(".row");
  row.innerHTML = "";
  user.forEach((element) => {
    let col = document.createElement("div");
    col.classList.add("col-12", "col-md-6", "col-lg-4");

    col.innerHTML = userCard(element);

    row.appendChild(col);
  });
};

const openUser = (id) => {
  window.open("user.html?id=" + id);
  console.log("user id_____________", id);
};