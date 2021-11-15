var ERROR = "ERROR";

// Create or Open Database.
var db = window.openDatabase("FGW", "1.0", "FGW", 20000);

// To detect whether users use mobile phones horizontally or vertically.
$(window).on("orientationchange", onOrientationChange);

$(document).on('vclick', '#page-home #panel-open', function () {
  $('#page-home #panel').panel('open');
});

$(document).on('vclick', '#page-create #panel-open', function () {
  $('#page-create #panel').panel('open');
});

$(document).on('vclick', '#page-list #panel-open', function () {
  $('#page-list #panel').panel('open');
});

$(document).on('vclick', '#page-search #panel-open', function () {
  $('#page-search #panel').panel('open');
});

$(document).on('vclick', '#page-about #panel-open', function () {
  $('#page-about #panel').panel('open');
});


// Display messages in the console.
function log(message, type = "INFO") {
  console.log(`${new Date()} [${type}] ${message}`);
}

function onOrientationChange(e) {
  if (e.orientation == "portrait") {
    log("Portrait.");
  } else {
    log("Landscape.");
  }
}

// To detect whether users open applications on mobile phones or browsers.
if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
  $(document).on("deviceready", onDeviceReady);
} else {
  $(document).on("ready", onDeviceReady);
}

// Display errors when executing SQL queries.
function transactionError(tx, error) {
  log(`SQL Error ${error.code}. Message: ${error.message}.`, ERROR);
}

// Run this function after starting the application.
function onDeviceReady() {
  log(`Device is ready.`);
  prepareDatabase(db);

  db.transaction(function (tx) {
    // Create table ACCOUNT.
    var query = `CREATE TABLE IF NOT EXISTS Property 
                                                        (Id INTEGER PRIMARY KEY AUTOINCREMENT,
                                                         propertyName TEXT NOT NULL UNIQUE,
                                                         propertyAddress TEXT NOT NULL UNIQUE,
                                                         propertyCity TEXT NOT NULL UNIQUE,
                                                         propertyDistrict TEXT NOT NULL UNIQUE,
                                                         propertyWard TEXT NOT NULL UNIQUE,
                                                         propertyType TEXT NOT NULL UNIQUE,
                                                         bedroom TEXT NOT NULL UNIQUE,
                                                         date TEXT NOT NULL UNIQUE,
                                                         monthlyRentPrice TEXT NOT NULL,
                                                         furnitureType TEXT NULL,
                                                         notes TEXT NULL,
                                                         reporterName TEXT NOT NULL)`;
    tx.executeSql(
      query,
      [],
      function (tx, result) {
        log(`Create table 'Property' successfully.`);
      },
      transactionError
    );

    // Create table COMMENT.
    var query = `CREATE TABLE IF NOT EXISTS Comment (Id INTEGER PRIMARY KEY AUTOINCREMENT,
                                                         Comment TEXT NOT NULL,
                                                         Datetime DATE NOT NULL,
                                                         AccountId INTEGER NOT NULL,
                                                         FOREIGN KEY (AccountId) REFERENCES Account(Id))`;
    tx.executeSql(
      query,
      [],
      function (tx, result) {
        log(`Create table 'Comment' successfully.`);
      },
      transactionError
    );
  });
}

// Submit a form to add new property
$(document).on("submit", "#page-create #frm-register", confirmProperty);
$(document).on("submit", "#page-create #frm-confirm", registerProperty);

function confirmProperty(e) {
  e.preventDefault();

  var propertyName = $("#page-create #frm-register #propertyName").val();
  var propertyAddress = $("#page-create #frm-register #propertyAddress").val();
  var propertyCity = $("#page-create #frm-register #city option:selected").text();
  var propertyDistrict = $("#page-create #frm-register #district option:selected").text();
  var propertyWard = $("#page-create #frm-register #ward option:selected").text();
  var propertyType = $("#page-create #frm-register #propertyType").val();
  var bedroom = $("#page-create #frm-register #bedroom").val();
  var date = new Date(Date.now()).toString();
  var monthlyRentPrice = $("#page-create #frm-register #monthlyRentPrice").val();
  var furnitureType = $("#page-create #frm-register #furnitureType").val();
  var notes = $("#page-create #frm-register #notes").val();
  var reporterName = $("#page-create #frm-register #reporterName").val();

  $("#page-create #frm-confirm #propertyName").val(propertyName);
  $("#page-create #frm-confirm #propertyAddress").val(propertyAddress);
  $("#page-create #frm-confirm #city").val(propertyCity);
  $("#page-create #frm-confirm #district").val(propertyDistrict);
  $("#page-create #frm-confirm #ward").val(propertyWard);
  $("#page-create #frm-confirm #propertyType").val(propertyType);
  $("#page-create #frm-confirm #bedroom").val(bedroom);
  $("#page-create #frm-confirm #date").val(date);
  $("#page-create #frm-confirm #monthlyRentPrice").val(monthlyRentPrice);
  $("#page-create #frm-confirm #furnitureType").val(furnitureType);
  $("#page-create #frm-confirm #notes").val(notes);
  $("#page-create #frm-confirm #reporterName").val(reporterName);

  $("#page-create #frm-confirm").popup("open");
}

function registerProperty(e) {
  e.preventDefault();

  var propertyName = $("#page-create #frm-register #propertyName").val();
  var propertyAddress = $("#page-create #frm-register #propertyAddress").val();
  var propertyCity = $("#page-create #frm-register #city option:selected").text();
  var propertyDistrict = $("#page-create #frm-register #district option:selected").text();
  var propertyWard = $("#page-create #frm-register #ward option:selected").text();
  var propertyType = $("#page-create #frm-register #propertyType").val();
  var bedroom = $("#page-create #frm-register #bedroom").val();
  var date = new Date(Date.now()).toString();
  var monthlyRentPrice = $("#page-create #frm-register #monthlyRentPrice").val();
  var furnitureType = $("#page-create #frm-register #furnitureType").val();
  var notes = $("#page-create #frm-register #notes").val();
  var reporterName = $("#page-create #frm-register #reporterName").val();

  db.transaction(function (tx) {
    var query =
      "INSERT INTO Property (propertyName, propertyAddress, propertyCity, propertyDistrict, propertyWard, propertyType, bedroom, date, monthlyRentPrice, furnitureType, notes, reporterName) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    tx.executeSql(
      query,
      [
        propertyName,
        propertyAddress,
        propertyCity,
        propertyDistrict,
        propertyWard,
        propertyType,
        bedroom,
        date,
        monthlyRentPrice,
        furnitureType,
        notes,
        reporterName,
      ],
      transactionSuccess,
      transactionError
    );

    function transactionSuccess(tx, result) {
      log(`Add a new property '${propertyName}' successfully.`);

      // Reset the form.
      $("#frm-register").trigger("reset");
      $("#page-create #error").empty();
      $("#page-create #frm-confirm").popup("close");
    }
  });
}

// Display Account List.
$(document).on("pagebeforeshow", "#page-list", showList);

function showList() {
  db.transaction(function (tx) {
    var query =
      "SELECT Id, propertyName, propertyAddress, propertyCity, propertyDistrict, propertyWard, propertyType, bedroom, date, monthlyRentPrice, furnitureType, notes, reporterName FROM Property";
    tx.executeSql(query, [], transactionSuccess, transactionError);

    function transactionSuccess(tx, result) {
      log(`Get list of accounts successfully.`);

      // Prepare the list of accounts.
      var listProperty = `<ul id='list-account' data-role='listview' data-filter='true' data-filter-placeholder='Search properties...'
                                                     data-corners='false' class='ui-nodisc-icon ui-alt-icon'>`;
      for (let property of result.rows) {
        listProperty += `<li><a data-details='{"Id" : ${property.Id}}'>
                                    <img src='img/logo5.png'>
                                    <h3>Property: ${property.propertyName}</h3>
                                    <p>ID: ${property.Id}</p>
                                </a></li>`;
      }
      listProperty += `</ul>`;

      // Add list to UI.
      $("#page-list #list-account")
        .empty()
        .append(listProperty)
        .listview("refresh")
        .trigger("create");

      log(`Show list of properties successfully.`);
    }
  });
}

// Save Account Id.
$(document).on("vclick", "#list-account li a", function (e) {
  e.preventDefault();

  var id = $(this).data("details").Id;
  localStorage.setItem("currentPropertyId", id);

  $.mobile.navigate("#page-detail", { transition: "none" });
});

// Show Account Details.
$(document).on("pagebeforeshow", "#page-detail", showDetail);

function showDetail() {
  var id = localStorage.getItem("currentPropertyId");

  db.transaction(function (tx) {
    var query = "SELECT * FROM Property WHERE Id = ?";
    tx.executeSql(query, [id], transactionSuccess, transactionError);

    function transactionSuccess(tx, result) {
      var errorMessage = "Property not found.";
      var propertyName = errorMessage;
      var propertyAddress = errorMessage;
      var propertyCity = errorMessage;
      var propertyDistrict = errorMessage;
      var propertyWard = errorMessage;
      var propertyType = errorMessage;
      var bedroom = errorMessage;
      var date = errorMessage;
      var monthlyRentPrice = errorMessage;
      var furnitureType = errorMessage;
      var notes = errorMessage;
      var reporterName = errorMessage;

      if (result.rows[0] != null) {
        log(`Get details of property '${id}' successfully.`);

        propertyName = result.rows[0].propertyName;
        propertyAddress = result.rows[0].propertyAddress;
        propertyCity = result.rows[0].propertyCity;
        propertyDistrict = result.rows[0].propertyDistrict;
        propertyWard = result.rows[0].propertyWard;
        propertyType = result.rows[0].propertyType;
        bedroom = result.rows[0].bedroom;
        date = result.rows[0].date;
        monthlyRentPrice = result.rows[0].monthlyRentPrice;
        furnitureType = result.rows[0].furnitureType;
        notes = result.rows[0].notes;
        reporterName = result.rows[0].reporterName;
      } else {
        log(errorMessage, ERROR);

        $("#page-detail #btn-update").addClass("ui-disabled");
        $("#page-detail #btn-delete-confirm").addClass("ui-disabled");
      }

      $("#page-detail #id").val(id);
      $("#page-detail #propertyName").val(propertyName);
      $("#page-detail #propertyAddress").val(propertyAddress);
      $("#page-detail #propertyCity").val(propertyCity);
      $("#page-detail #propertyDistrict").val(propertyDistrict);
      $("#page-detail #propertyWard").val(propertyWard);
      $("#page-detail #propertyType").val(propertyType);
      $("#page-detail #bedroom").val(bedroom);
      $("#page-detail #date").val(date);
      $("#page-detail #monthlyRentPrice").val(monthlyRentPrice);
      $("#page-detail #furnitureType").val(furnitureType);
      $("#page-detail #notes").val(notes);
      $("#page-detail #reporterName").val(reporterName);

      showComment();
    }
  });
}

// Update Account.
$(document).on("vclick", "#page-detail #frm-update #btn-update", updateAccount);

function updateAccount(e) {
  e.preventDefault();

  var id = localStorage.getItem("currentPropertyId");
  var propertyName = $("#page-detail #frm-update #propertyName").val();
  var propertyAddress = $("#page-detail #frm-update #propertyAddress").val();
  var propertyCity = $("#page-detail #frm-update #city option:selected").text();
  var propertyDistrict = $(
    "#page-detail #frm-update #district option:selected"
  ).text();
  var propertyWard = $("#page-detail #frm-update #ward option:selected").text();
  var propertyType = $("#page-detail #frm-update #propertyType").val();
  var bedroom = $("#page-detail #frm-update #bedroom").val();
  var date = new Date();
  var monthlyRentPrice = $("#page-detail #frm-update #monthlyRentPrice").val();
  var furnitureType = $("#page-detail #frm-update #furnitureType").val();
  var notes = $("#page-detail #frm-update #notes").val();
  var reporterName = $("#page-detail #frm-update #reporterName").val();

  db.transaction(function (tx) {
    var query =
      "UPDATE Property SET propertyName = ?, propertyAddress = ?, propertyCity = ?, propertyDistrict = ?, propertyWard = ?, propertyType = ?, bedroom = ?, date = ?, monthlyRentPrice = ?, furnitureType = ?, notes = ?, reporterName = ? WHERE Id = ?";
    tx.executeSql(
      query,
      [
        propertyName,
        propertyAddress,
        propertyCity,
        propertyDistrict,
        propertyWard,
        propertyType,
        bedroom,
        date,
        monthlyRentPrice,
        furnitureType,
        notes,
        reporterName,
        id,
      ],
      transactionSuccess,
      transactionError
    );

    function transactionSuccess(tx, result) {
      $("#page-detail #propertyName").val(propertyName);
      $("#page-detail #propertyAddress").val(propertyAddress);
      $("#page-detail #propertyType").val(propertyType);
      $("#page-detail #bedroom").val(bedroom);
      $("#page-detail #date").val(date);
      $("#page-detail #monthlyRentPrice").val(monthlyRentPrice);
      $("#page-detail #furnitureType").val(furnitureType);
      $("#page-detail #notes").val(notes);
      $("#page-detail #reporterName").val(reporterName);

      $.mobile.navigate("#page-detail", { transition: "none" });
    }
  });
}

// Delete Account.
$(document).on("submit", "#page-detail #frm-delete", deleteAccount);
$(document).on(
  "keyup",
  "#page-detail #frm-delete #txt-delete",
  confirmDeleteAccount
);

function confirmDeleteAccount() {
  var text = $("#page-detail #frm-delete #txt-delete").val();

  if (text == "confirm delete") {
    $("#page-detail #frm-delete #btn-delete").removeClass("ui-disabled");
  } else {
    $("#page-detail #frm-delete #btn-delete").addClass("ui-disabled");
  }
}

function deleteAccount(e) {
  e.preventDefault();

  var id = localStorage.getItem("currentPropertyId");

  db.transaction(function (tx) {
    var query = "DELETE FROM Property WHERE Id = ?";
    tx.executeSql(query, [id], transactionSuccess, transactionError);

    function transactionSuccess(tx, result) {
      log(`Delete property '${id}' successfully.`);

      $("#page-detail #frm-delete").trigger("reset");

      $.mobile.navigate("#page-list", { transition: "none" });
    }
  });
}

// Update Account.
$(document).on("vclick", "#page-detail #frm-update #btn-update", updateAccount);

$(document).on("submit", "#page-detail #frm-comment", addComment);
function addComment(e) {
  e.preventDefault();

  var accountId = localStorage.getItem("currentPropertyId");
  var comment = $("#page-detail #frm-comment #txt-comment").val();
  var dateTime = new Date();

  db.transaction(function (tx) {
    var query =
      "INSERT INTO Comment (AccountId, Comment, Datetime) VALUES (?, ?, ?)";
    tx.executeSql(
      query,
      [accountId, comment, dateTime],
      transactionSuccess,
      transactionError
    );

    function transactionSuccess(tx, result) {
      log(`Add new comment to account '${accountId}' successfully.`);

      $("#page-detail #frm-comment").trigger("reset");

      showComment();
    }
  });
}

// Show Comment.
function showComment() {
  var accountId = localStorage.getItem("currentPropertyId");

  db.transaction(function (tx) {
    var query = "SELECT * FROM Comment WHERE AccountId = ?";
    tx.executeSql(query, [accountId], transactionSuccess, transactionError);

    function transactionSuccess(tx, result) {
      log(`Get list of comments successfully.`);

      // Prepare the list of comments.
      var listComment = "";
      for (let comment of result.rows) {
        listComment += `<div class = 'list'>
                                    <small>${comment.Datetime}</small>
                                    <h3>${comment.Comment}</h3>
                                </div>`;
      }

      // Add list to UI.
      $("#list-comment").empty().append(listComment);

      log(`Show list of comments successfully.`);
    }
  });
}

// Search.
$(document).on("submit", "#page-search #frm-search", search);


function refresh() {
  window.location.reload("Refresh");
}

function search(e) {
  e.preventDefault();

  var propertyName = $("#page-search #frm-search #propertyName").val();
  var propertyType = $("#page-search #frm-search #propertyType").val();
  var propertyAddress = $("#page-search #frm-search #propertyAddress").val();
  var propertyCity = $("#page-search #frm-search #city option:selected").text();
  var propertyDistrict = $(
    "#page-search #frm-search #district option:selected"
  ).text();
  var propertyWard = $("#page-search #frm-search #ward option:selected").text();

  var bedroom = $("#page-search #frm-search #bedroom").val();
  var monthlyRentPrice = $("#page-search #frm-search #monthlyRentPrice").val();
  var furnitureType = $("#page-search #frm-search #furnitureType").val();
  var reporterName = $("#page-search #frm-search #reporterName").val();

  db.transaction(function (tx) {
    var query = `SELECT Id, propertyName, propertyAddress, propertyCity, propertyDistrict, propertyWard, propertyType, bedroom, monthlyRentPrice, furnitureType, reporterName FROM Property WHERE`;

    if (propertyName) {
      query += ` propertyName LIKE "%${propertyName}%"   AND`;
    }

    if (propertyType !== "0") {
      query += ` propertyType LIKE "%${propertyType}%"   AND`;
    }

    if (propertyAddress) {
      query += ` propertyAddress LIKE "%${propertyAddress}%"   AND`;
    }

    if (propertyCity !== "Select city" && propertyCity !== "Select City") {
      query += ` propertyCity LIKE "%${propertyCity}%"   AND`;
    }

    if (propertyDistrict !== "Select district" && propertyDistrict !== "Select District") {
      query += ` propertyDistrict LIKE "%${propertyDistrict}%"   AND`;
    }

    if (propertyWard !== "Select ward" && propertyWard !== "Select Ward") {
      query += ` propertyWard LIKE "%${propertyWard}%"   AND`;
    }

    if (bedroom) {
      query += ` bedroom >= ${bedroom}   AND`;
    }

    if (monthlyRentPrice) {
      query += ` monthlyRentPrice >= ${monthlyRentPrice}   AND`;
    }

    if (furnitureType) {
      query += ` furnitureType LIKE "%${furnitureType}%"   AND`;
    }

    if (reporterName) {
      query += ` reporterName LIKE "%${reporterName}%"   AND`;
    }

    query = query.substring(0, query.length - 6);

    console.log(query);

    tx.executeSql(query, [], transactionSuccess, transactionError);

    function transactionSuccess(tx, result) {
      log(`Get list of properties successfully.`);

      // Prepare the list of accounts.
      var listProperty = `<ul id='list-account' data-role='listview' class='ui-nodisc-icon ui-alt-icon'>`;
      for (let property of result.rows) {
        listProperty += `<li><a data-details='{"Id" : ${property.Id}}'>
                                    <img src='img/logo5.png'>
                                    <h3>Property name: ${property.propertyName}</h3>
                                    <p>Property type: ${property.propertyType}</p>
                                </a></li>`;
      }
      listProperty += `</ul>`;

      // Add list to UI.
      $("#page-search #list-account")
        .empty()
        .append(listProperty)
        .listview("refresh")
        .trigger("create");

      log(`Show list of accounts successfully.`);
    }
  });
}

function importCity(form, selectedId = -1) {
  db.transaction(function (tx) {
    var query = "SELECT * FROM City ORDER by Name";
    tx.executeSql(query, [], transactionSuccess, transactionError);

    function transactionSuccess(tx, result) {
      var optionList = `<option value='-1'>Select city</option>`;
      for (let item of result.rows) {
        optionList += `<option value='${item.Id}' ${
          selectedId == item.Id ? "selected" : ""
        }>${item.Name}</option>`;
      }

      $(`${form} #city`).html(optionList);
      $(`${form} #city`).selectedmenu("refresh", true);
    }
  });
}

function importOthers(form, name, parentName, selectedId = -1) {
  var lowerName = name.toLowerCase();
  var id = $(`${form} #${parentName.toLowerCase()}`).val();
  db.transaction(function (tx) {
    var query = `SELECT * FROM ${name} WHERE ${parentName}Id = ? ORDER by Name`;
    tx.executeSql(query, [id], transactionSuccess, transactionError);

    function transactionSuccess(tx, result) {
      var optionList = `<option value='-1'>Select ${name}</option>`;
      for (let item of result.rows) {
        optionList += `<option value='${item.Id}' ${
          selectedId == item.Id ? "selected" : ""
        }>${item.Name}</option>`;
      }

      $(`${form} #${lowerName}`).html(optionList);
      $(`${form} #${lowerName}`).selectedmenu("refresh", true);
    }
  });
}

$(document).on("pagebeforeshow", "#page-create", function () {
  importCity("#page-create #frm-register");
});

$(document).on("change", "#page-create #frm-register #city", function () {
  importOthers("#page-create #frm-register", "District", "City");
  importOthers("#page-create #frm-register", "Ward", "District");
});

$(document).on("change", "#page-create #frm-register #district", function () {
  importOthers("#page-create #frm-register", "Ward", "District");
});

$(document).on("pagebeforeshow", "#page-detail", function () {
  importCity("#page-detail #frm-update");
});

$(document).on("change", "#page-detail #frm-update #city", function () {
  importOthers("#page-detail #frm-update", "District", "City");
  importOthers("#page-detail #frm-update", "Ward", "District");
});

$(document).on("change", "#page-detail #frm-update #district", function () {
  importOthers("#page-detail #frm-update", "Ward", "District");
});

$(document).on("pagebeforeshow", "#page-search", function () {
  importCity("#page-search #frm-search");
});

$(document).on("change", "#page-search #frm-search #city", function () {
  importOthers("#page-search #frm-search", "District", "City");
  importOthers("#page-search #frm-search", "Ward", "District");
});

$(document).on("change", "#page-search #frm-search #district", function () {
  importOthers("#page-search #frm-search", "Ward", "District");
});
