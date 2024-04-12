document.addEventListener("DOMContentLoaded", function () {
  const showList = document.getElementById("all");
  const showDescription = document.getElementById("descShow");
  const nbTickets = document.getElementById("nbPlace");
  const createShowBtn = document.getElementById("add");

  /**
  * manages the display of shows
  */
  async function displayShows() {
    const response = await fetch("/admin/shows");
    console.log(response);
    if (!response.ok) {
      console.log("erreur récuperation des spectacles");
      handleError(await response.json());
    }
    const shows = await response.json();
    console.log("shows:", shows);
    showList.innerHTML = "";
    shows.forEach((show) => {
      const infoShow = document.createElement("div");
      infoShow.id = "spectacle-info";
      infoShow.innerHTML = `
          <span><span id="nameShow">${show.description}</span> : <b><span id="nbPlace">${show.tickets}</span></b> places </span>
          <button class="cancel" data-show-id="${show._id}">Annuler</button>
          <button class="edit" data-show-id="${show._id}">Modifier</button>
      `;
      showList.appendChild(infoShow);
    });
  }

  /**
  * manages the creation of a show
  * @param {string} description - The description of the show
  * @param {int} tickets - The number of tickets the show has
  */
  async function createShow(description, tickets) {
    const response = await fetch("/admin/shows", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description, tickets }),
    });
    if (!response.ok) {
      console.log("erreur création du spectacle");
      handleError(await response.json());
    }
    const newShow = await response.json();
    showDescription.value = "";
    nbTickets.value = "";
    console.log("spectacle crée");
    await displayShows();
  }

  // handle the creation event
  createShowBtn.addEventListener("click", function () {
    const description = showDescription.value.trim();
    const tickets = parseInt(nbTickets.value);
    if (description && tickets) {
      createShow(description, tickets);
    } else {
      console.log("saisir une description et un nombre de place");
    }
  });

  /**
  * manages the deletion of a show
  * @param {ObjectId} showId - The id of the show
  */
  async function deleteShow(showId) {
    const response = await fetch(`/admin/deleteShows/${showId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      console.log("erreur supression du spectacle");
      handleError(await response.json());
    }
    await displayShows();
  }

  // handle the deletion of a show
  showList.addEventListener("click", function (event) {
    if (event.target.classList.contains("cancel")) {
      const showId = event.target.dataset.showId;
      deleteShow(showId);
    }
  });

  /**
  * manages the modification of a show
  * @param {ObjectId} showId - The id of the show
  */
  async function editShow(showId) {
    const newDesc = prompt("Entrez la nouvelle description du spectacle :");
    const newTickets = prompt("Entrez le nombre de tickets :");

    const response = await fetch(`/admin/editShows/${showId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description: newDesc, tickets: newTickets }),
    });
    if (!response.ok) {
      console.log("erreur modification du spectacle");
      handleError(await response.json());
    }
    await displayShows();
  }

  // handle the event of modification of a show
  showList.addEventListener("click", function (event) {
    if (event.target.classList.contains("edit")) {
      const showId = event.target.dataset.showId;
      editShow(showId);
    }
  });

  displayShows();

  const handleError = (error) => {
    if (error.redirectTo) window.location.href = error.redirectTo;
    else console.log(`erreur : ${error.message}`);
  };

  const logout = async () => {
    const requestOptions = {
      method: "GET",
    };
    const response = await fetch(`/access/logout`, requestOptions);
    if (response.ok) {
      window.location.href = "/";
    }
  };

  // manage when the admin wants to log out
  document.getElementById("disconnect").addEventListener("click", logout);
});
