document.addEventListener("DOMContentLoaded", function () {
  const username = document.getElementById("name");
  const showList = document.getElementById("all");
  const ticketsList = document.getElementById("allTickets");

  /**
  * retrieve information about the current user
  */
  async function getUser() {
    const requestOptions = {
      method: "GET",
    };
    const response = await fetch("/user/me", requestOptions);
    if (response.ok) {
      const user = await response.json();
      username.innerText = user.name || "";
    } else {
      const error = await response.json();
      handleError(error);
    }
  }

  /**
  * manages the display of shows
  */
  async function displayShows() {
    const response = await fetch("/user/adminShows");
    if (!response.ok) {
      console.log("erreur récuperation des spectacles");
      handleError(await response.json());
    }
    const shows = await response.json();
    console.log("shows:", shows);
    shows.forEach((show) => {
      const infoShow = document.createElement("div");
      infoShow.id = "spectacle-info";
      infoShow.innerHTML = `
          <span><span id="nameShow">${show.description}</span> : <b><span id="nbPlace"> ${show.tickets}</span></b> places </span>
          <button class="addTicket" data-show-id="${show._id}">Ticket</button>
        `;
      showList.appendChild(infoShow);
    });
  }

  /**
  * manages the display of tickets
  */
  async function displayTickets() {
    handleAdminDeleteShow();
    const response = await fetch("/user/me");
    console.log(response);
    if (!response.ok) {
      console.log("erreur récuperation des tickets");
      handleError(await response.json());
    }
    const userData = await response.json();
    const tickets = userData.tickets;
    console.log("tickets:", tickets);
    ticketsList.innerHTML = "";
    tickets.forEach((ticket) => {
      const ticketInfo = document.createElement("div");
      ticketInfo.id = "ticket-info";
      ticketInfo.innerHTML = `
          <span><span id="nameShow">${ticket.description}</span> : <b><span id="nbTicket">${ticket.nb}</span></b> ticket </span>
          <button class="deleteTicket" data-ticket-id="${ticket._id}">Annuler</button>
        `;
      ticketsList.appendChild(ticketInfo);
    });
  }

  /**
  * manage the reservation of a show
  * @param {ObjectId} showId - The id of the show
  */
  async function takeTicket(showId) {
    const nbTickets = prompt("Combien de tickets voulez-vous réserver ?");
    const ticketsToTake = parseInt(nbTickets);
    if (nbTickets && ticketsToTake > 0) {
      for (let i = 0; i < ticketsToTake; i++) {
        const response_post = await fetch(`/user/takeTicket/${showId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response_post.ok) {
          console.log("erreur réservation de ticket");
          handleError(await response.json());
        }
        const showData = await response_post.json();
        const description = showData.description;
        const response_put = await fetch(`/user/takeTicket`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ description }),
        });
        if (!response_put.ok) {
          console.log("erreur mise à jour du ticket");
          handleError(await response.json());
        }
      }
        displayTickets();
    } else {
      console.log("Veuillez saisir un nombre valide de tickets.");
    }
  }

  // handle the reservation of a show
  showList.addEventListener("click", function (event) {
    if (event.target.classList.contains("addTicket")) {
      const showId = event.target.dataset.showId;
      takeTicket(showId);
    }
  });

  /**
  * manages the deletion of shows that are no longer available
  */
  async function handleAdminDeleteShow() {
    const response = await fetch("/user/adminShows");
    if (!response.ok) {
      console.log("erreur récupération des spectacles");
      handleError(await response.json());
    }
    const shows = await response.json();
    const response2 = await fetch("/user/me");
    if (!response2.ok) {
      console.log("erreur récupération des tickets");
      handleError(await response.json());
    }
    const user = await response2.json();
    user.tickets.forEach((ticket) => {
      const show = shows.find(
        (show) => show.description === ticket.description
      );
      if (!show) {
        deleteTicket(ticket._id);
      }
    });
  }

  /**
  * manages the deletion of tickets
  */
  async function deleteTicket(ticketId) {
    const response = await fetch(`/user/deleteTicket/${ticketId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      displayTickets();
    } else {
      const error = await response.json();
      handleError(error);
    }
  }

  // handle the deletion of tickets
  ticketsList.addEventListener("click", async function (event) {
    if (event.target.classList.contains("deleteTicket")) {
      const ticketId = event.target.dataset.ticketId;
      await deleteTicket(ticketId);
    }
  });

  getUser();
  displayTickets();
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

  // manage when the user wants to log out
  document.getElementById("disconnect").addEventListener("click", logout);
});
