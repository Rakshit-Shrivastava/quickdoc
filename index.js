// Set your secret key here
const convertApiSecret = "Iw8qk6ne5wh0YmY1";
// DOM element selectors
const loadingText = document.querySelector("#loadingText");
const fileInput = document.querySelector("#fileInput");
const convertBtn = document.querySelector("#convertBtn");
const resultDownloadLink = document.querySelector("#resultDownload");
const resultFileName = document.querySelector("#resultFileName");

// Accepted document types
const documentTypes = [
  "pdf",
  "doc",
  "docx",
  "odt",
  "xls",
  "xlsx",
  "ppt",
  "pptx",
  "key",
  "numbers",
  "slides",
  "odt",
  "txt",
  "rtf",
  "jpeg",
  "png"
];

let file;

// When (fileInput) has (change) event
fileInput.addEventListener("change", function (event) {
  file = event.target.files[0];
  // uploadFile(file);
});

convertBtn.addEventListener('click', function () {
  uploadFile(file);
});

// File upload function
function uploadFile(file, destination = "pdf") {
  // get file extension
  const extension = file.name.split(".").pop();
  // get file size
  const fileSize = file.size;
  // If uploaded document is PDF and destination is not set

    // Check if file is valid
    if (fileValidate(extension, fileSize)) {
      let counter = 5;
      let countDown = setInterval(() => {
        if (counter == 0) {
          clearInterval(countDown);
        } else {
          document.getElementsByTagName('h6')[0].innerHTML = `Please wait for ${counter.toString()} second, converting file to Pdf...`;
          counter--;
        }
      }, 1000);
      // Show loading text and cursor
      loadingText.style.display = "block";
      // Attempt to convert a file
      convertFile(file, extension, destination);
    } else {
      // in case invalid file was uploaded - reset form
      location.reload();
    }
  
}

function convertFile(file, extension, destination) {
  // Initialize ConvertAPI with your secret key
  let convertApi = ConvertApi.auth({ secret: convertApiSecret });
  // Create conversion parameters object
  let params = convertApi.createParams();
  // set uploaded file as one of the parameters
  params.add("file", file);
  // execute the conversion
  convertApi.convert(extension, destination, params).then(
    (x) => {
      let result = x.dto;
      // check if success
      if (result.Files) {
        // Hide loading-text (please-wait) element
        loadingText.style.display = "none";
        // Enabling anchor tag for downloading file
        resultDownloadLink.style.pointerEvents = "auto";
        // Enabling download button
        document.getElementById("downloadBtn").classList.remove("disabled");
        // Set result file download URL
        resultDownloadLink.setAttribute("href", result.Files[0].Url);
        // Set result file name
        resultFileName.innerHTML = result.Files[0].FileName;
      } else {
        // handle error
        if (result.Code === 4010)
          loadingText.innerHTML =
            'Please enter your ConvertAPI secret key in index.js file. You can find the API secret in your <a href="https://www.convertapi.com/a" target="_blank">account dashboard</a>.';
        else loadingText.textContent = `Ooops! ${result.Message}`;
        loadingText.classList.add("error-message");
      }
    },
    (error) => {
      // Throw a network-related error here
      throw error;
    }
  );
}

// File validation function
function fileValidate(fileType, fileSize) {
  // File type validation
  let isDocument = documentTypes.filter(
    (type) => fileType.indexOf(type) !== -1
  );
  // If uploaded file is a valid document
  if (isDocument.length !== 0) {
    // Check if file size is 2MB or less
    if (fileSize <= 2000000) {
      return true;
    } else {
      // Show the file size validation error
      return alert("Max file size is 2 MB");
    }
  } else {
    // Show the file type validation error
    return alert(
      `Please make sure to upload a document. Supported formats are:\r\n.${[
        ...documentTypes
      ].join(", .")}.`
    );
  }
}

