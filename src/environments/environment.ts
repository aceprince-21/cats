export const environment = {
  production: false,

  mainData: {
    method: "get",
   // url : "../assets/mock/data.json"
   url: "http://localhost:8080/user/document"
  },
  postData: {
    method: "get",
    url: "http://localhost:8080/documents/api/upload"
  },
  getData: {
    //url : "../assets/mock/response.json"
    url: "http://localhost:8080/user/document/"
  },
  hostApp: {
    //url : "../assets/mock/hostapp.json"
    url: "http://localhost:8080/document/hostapps"
  },
  doctype: {
    //url : "../assets/mock/doctype.json"
    url: "http://localhost:8080/document/doctypes"
  },
  editedResponse: {
    url: "http://localhost:8080/document/doctypes"
  }


};


// export const environment = {
//   production: false,

//   mainData: {
//     method: "get",
//     url : "../assets/mock/data.json"
//    // url: "http://localhost:8080/user/document"
//   },
//   postData: {
//     method: "get",
//     url: "http://localhost:8080/documents/api/upload"
//   },
//   getData: {
//     url : "../assets/mock/response.json"
//    // url: "http://localhost:8080/user/document/"
//   },
//   hostApp: {
//     url : "../assets/mock/hostapp.json"
//     //url: "http://localhost:8080/document/hostapps"
//   },
//   doctype: {
//     url : "../assets/mock/doctype.json"
//     //url: "http://localhost:8080/document/doctypes"
//   },
//   editedResponse: {
//     url: "http://localhost:8080/document/doctypes"
//   }


// };



