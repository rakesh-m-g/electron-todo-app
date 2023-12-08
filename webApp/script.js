const apiUrl = "http://localhost:3000/todo";

function fetchData() {
  $.ajax({
    url: apiUrl,
    method: "GET",
    dataType: "json",
    success: function (data) {
      updateDataList(data);
    },
    error: function (error) {
      console.error("Error fetching data:", error);
    },
  });
}

function addData() {
  const dataText = $("#dataInput").val();

  $.ajax({
    url: apiUrl,
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify({ name: dataText }),
    success: function () {
      fetchData();
    },
    error: function (error) {
      console.error("Error adding data:", error);
    },
  });
}

function updateDataList(data) {
  const dataList = $("#dataList");
  dataList.empty();

  data.forEach(function (item) {
    const listItem = $("<li>").text(item.name);

    const updateButton = $("<button>")
      .addClass("update-button")
      .text("Update")
      .click(function () {
        const updatedText = prompt("Enter updated text:", item.name);
        if (updatedText !== null) {
          updateData(item._id, updatedText);
        }
      });

    listItem.append(updateButton);
    dataList.append(listItem);
  });
}

function updateData(_id, updatedText) {
  $.ajax({
    url: `http://localhost:3000/todo/${_id}`,
    method: "PUT",
    contentType: "application/json",
    data: JSON.stringify({ name: updatedText }),
    success: function () {
      fetchData();
    },
    error: function (error) {
      console.error("Error updating data:", error.responseText);
    },
  });
}

function deleteData(_id) {
  $.ajax({
    url: `http://localhost:3000/todo/${_id}`,
    method: "DELETE",
    success: function () {
      fetchData();
    },
    error: function (error) {
      console.error("Error deleting data:", error.responseText);
    },
  });
}

function updateDataList(data) {
  const dataList = $("#dataList");
  dataList.empty();

  data.forEach(function (item) {
    const listItem = $("<li>").text(item.name);

    const updateButton = $("<button>")
      .text("Update")
      .addClass("update-button")
      .click(function () {
        const updatedText = prompt("Enter updated text:", item.name);
        if (updatedText !== null) {
          updateData(item._id, updatedText);
        }
      });

    const deleteButton = $("<button>")
      .text("Delete")
      .addClass("delete-button")
      .click(function () {
        deleteData(item._id);
      });

    listItem.append(updateButton, deleteButton);
    dataList.append(listItem);
  });
}

fetchData();
