// ---------------- GLOBAL FUNKCIJE ----------------

// Delete (DELETE /subjects/delete/:id)
window.brisi = function (id) {
  if (!confirm("Are you sure?")) return;

  $.ajax({
    url: `/subjects/delete/${id}`,
    method: "DELETE",

    success: () => {
      $(`#row_${id}`).remove();
    },

    error: (e) => {
      console.error(e);
      alert("Error deleting subject!");
    },
  });
};

// Update – otvara formu ispod i puni je podacima iz reda
window.azuriraj = function (id) {
  console.log("Update mode:", id);

  const row = $(`#row_${id}`);
  const cells = row.find("td"); // svi <td> u redu

  const name = cells.eq(0).text().trim(); // Name
  const code = cells.eq(1).text().trim(); // Code
  const year = cells.eq(2).text().trim(); // Year

  $("#div_form").show();

  $("#form_subject_id").val(id);
  $("#name").val(name);
  $("#code").val(code);
  $("#year").val(year);

  $("#submit_button").text("Update");
};

// ---------------- jQuery init ----------------

$(document).ready(function () {
  console.log("subjects.js LOADED");

  // "Add new below" – insert mode (prazna forma)
  $("#add_new_button").click(function () {
    console.log("Add new below mode");

    $("#div_form").show();

    $("#form_subject_id").val(""); // nema ID → insert
    $("#name").val("");
    $("#code").val("");
    $("#year").val("");

    $("#submit_button").text("Submit");
  });

  // Jedna forma za INSERT + UPDATE
  $("#subject_form").submit(function (e) {
    e.preventDefault();

    const id = $("#form_subject_id").val();
    const name = $("#name").val().trim();
    const code = $("#code").val().trim();
    const year = $("#year").val().trim();

    if (!name || !code || !year) {
      alert("All fields are required.");
      return;
    }

    const submitButton = $("#submit_button");
    submitButton.prop("disabled", true).text("Saving...");

    // -------- INSERT MODE --------
    if (!id) {
      $.ajax({
        url: "/subjects/add-new-subject-below",
        method: "POST",
        data: { name, code, year },
        success: (response) => {
          if (!response || !response.subject) {
            alert("Unexpected response from server.");
            return;
          }

          const s = response.subject;
          const newRow = `
            <tr id="row_${s.id}">
              <th scope="row">${s.id}</th>
              <td>${s.name}</td>
              <td>${s.code}</td>
              <td>${s.year}</td>
              <td>
                <button class="btn btn-danger" onclick="brisi(${s.id})">Delete</button>
                <button class="btn btn-info" onclick="azuriraj(${s.id})">Update</button>
              </td>
            </tr>
          `;

          $("#subject_table tbody").append(newRow);
          $("#subject_form")[0].reset();
        },
        error: (e) => {
          console.error(e);
          alert("Greška prilikom dodavanja subjecta!");
        },
        complete: () => {
          submitButton.prop("disabled", false).text("Submit");
        },
      });
    }

    // -------- UPDATE MODE --------
    else {
      $.ajax({
        url: `/subjects/update/${id}`,
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify({ name, code, year }),

        success: (response) => {
          if (!response || !response.updated) {
            alert("Unexpected response from server.");
            return;
          }

          const s = response.updated;
          const row = $(`#row_${id}`);
          const cells = row.find("td");

          cells.eq(0).text(s.name);
          cells.eq(1).text(s.code);
          cells.eq(2).text(s.year);

          $("#subject_form")[0].reset();
          $("#form_subject_id").val("");
          $("#div_form").hide();
        },
        error: (e) => {
          console.error(e);
          alert("Update error");
        },
        complete: () => {
          submitButton.prop("disabled", false).text("Submit");
          $("#submit_button").text("Submit");
        },
      });
    }
  });
});
