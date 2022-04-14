window.onload = function () {
  var adityatawade = document.getElementById("database");

  const queryString = window.location.search;

  const urlParams = new URLSearchParams(queryString);

  const urlTicketId = urlParams.get("ticket");
  console.log("Ticket ID:- " + urlTicketId);
  // console.log(urlTicketId);

  const ticketName = "Ticket ID: " + urlTicketId;
  document.querySelector("#ticket_id").innerHTML = ticketName;

  // adityatawade.onclick = async (e) => {
  //   let response = await fetch(
  //     "https://iconnectsolutionspvtltd.freshservice.com/api/v2/tickets",
  //     {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: "Basic " + btoa("06V67kkU0TCe13xxkK:x"),
  //       },
  //     }
  //   );

  //   let text = await response.text(); // read response body as text
  //   data = JSON.parse(text);
  //   document.querySelector("#encoded").innerHTML = text;
  // };

  formElem.onsubmit = async (e) => {
    e.preventDefault();
    var form = document.querySelector("#formElem");

    data = {
      custom_fields: {
        approval_status: form.querySelector('input[name="ApprovalStatus"]')
          .value,
      },
    };

    let response = await fetch(
      "https://iconnectsolutionspvtltd.freshservice.com/api/v2/tickets/" +
        urlTicketId,
      {
        method: "PUT", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa("06V67kkU0TCe13xxkK:x"),
        },
        body: JSON.stringify(data),
      }
    );

    let text = await response.text(); // read response body as text
    document.querySelector("#decoded").innerHTML = text;
  };
};
