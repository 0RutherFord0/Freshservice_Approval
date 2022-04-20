window.onload = async (e) => {
  var adityatawade = document.getElementById("database");

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const urlTicketId = urlParams.get("ticket");
  const requesterID = urlParams.get("requester");
  console.log("Ticket ID:- " + urlTicketId);
  console.log("Requester ID:- " + requesterID);

  const ticketName = "Ticket ID: " + urlTicketId;
  document.querySelector("#ticket_id").innerHTML = ticketName;

  //Get Ticket Subject Start
  let ticket_response = await fetch(
    "https://iconnectsolutionspvtltd.freshservice.com/api/v2/tickets/" +
      urlTicketId,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa("06V67kkU0TCe13xxkK:x"),
      },
    }
  );

  let ticket_text = await ticket_response.text(); // read response body as text
  data = JSON.parse(ticket_text);
  document.querySelector("#ticket_subject").innerHTML = data.ticket.subject;
  //Get Ticket Subject End

  // Get Requester Name & Email Start

  let requester_response = await fetch(
    "https://iconnectsolutionspvtltd.freshservice.com/api/v2/requesters/" +
      requesterID,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa("06V67kkU0TCe13xxkK:x"),
      },
    }
  );

  let requester_text = await requester_response.text(); // read response body as text
  data = JSON.parse(requester_text);
  document.querySelector("#requester_name").innerHTML =
    data.requester.first_name + " " + data.requester.last_name;
  document.querySelector("#requester_email").innerHTML =
    data.requester.primary_email;
  //Get Requester Name & Email End

  //Get Asset List Start
  let array_response = await fetch(
    `https://iconnectsolutionspvtltd.freshservice.com/api/v2/assets?filter="user_id:${requesterID}"`,

    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa("06V67kkU0TCe13xxkK:x"),
      },
    }
  );
  let array_text = await array_response.text(); // read response body as text
  data = JSON.parse(array_text);
  console.log(data);
  document.querySelector("#asset_list").innerHTML = data.assets
    .map((asset) => asset.name)
    .join(", ");
  //Get Asset List End

  adityatawade.onclick = async (e) => {
    let array_response = await fetch(
      `https://iconnectsolutionspvtltd.freshservice.com/api/v2/assets?filter="user_id:${requesterID}"`,

      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa("06V67kkU0TCe13xxkK:x"),
        },
      }
    );
    let array_text = await array_response.text(); // read response body as text
    data = JSON.parse(array_text);
    console.log(data);
    document.querySelector("#encoded").innerHTML = data.assets
      .map((asset) => asset.name)
      .join(", ");
  };

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
    var jsonPretty = JSON.stringify(JSON.parse(text), null, 2);
    document.querySelector("#decoded").innerHTML = JSON.stringify(
      jsonPretty,
      null,
      4
    );
    console.log(jsonPretty);
  };
};
