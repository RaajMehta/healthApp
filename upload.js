$(document).on("click", "#upload", function () {
    var file_data = $("#avatar").prop("files")[0];   // Getting the properties of file from file field
    var form_data = new FormData();                  // Creating object of FormData class
    form_data.append("file", file_data)              // Appending parameter named file with properties of file_field to form_data
    form_data.append("user_id", 123)                 // Adding extra parameters to form_data
    $.ajax({
        url: "upload_file.php",
        dataType: 'script',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data, // Setting the data attribute of ajax with file_data
        type: 'post'
    })
})

