$(document).ready(() => {
  // eslint-disable-next-line prettier/prettier
  $("[data-toggle=\"tooltip\"]").tooltip();
  // Append table with add inventory row on add new button click
  $(".submit").click(event => {
    event.preventDefault();
    const name = $("#new-name");
    const quantity = $("#new-quantity");
    const stockAmount = $("#new-stock-amount");
    const stockNumber = $("#new-stock-number");
    const restaurantid = $("#new-restaurant-id");

    if (!name || !quantity || !stockAmount || !stockNumber) {
      return;
    }

    console.log("Hello");

    $.post("/api/inventory", {
      name: name.val().trim(),
      quantity: quantity.val().trim(),
      stockAmount: stockAmount.val().trim(),
      stockNumber: stockNumber.val().trim(),
      restaurantid: restaurantid.val().trim()
    })
      .then(() => {
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  });
  // Edit row on edit button click
  $(document).on("click", ".edit", function() {
    $(this)
      .parents("tr")
      .find("td:not(:last-child)")
      .each(function() {
        $(this).html(
          // eslint-disable-next-line prettier/prettier
          "<input type=\"text\" class=\"form-control\" value=\"" +
            $(this).text() +
            // eslint-disable-next-line prettier/prettier
            "\">"
        );
      });
    $(this)
      .parents("tr")
      .find(".add, .edit")
      .toggle();
    $(".add-new").attr("disabled", "disabled");
  });

  // Delete row on delete button click
  $(document).on("click", ".delete", handleDeleteItem);

  function deleteItem(id) {
    console.log("id = " + id);
    $.ajax({
      method: "DELETE",
      url: "/api/inventory/" + id
    }).then(() => {
      console.log(".then");
      window.location.reload();
    });
  }

  function handleDeleteItem() {
    console.log("in handleDeleteItem");
    deleteItem($(this).attr("data-id"));
  }
});
