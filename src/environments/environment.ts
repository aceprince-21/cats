 export const environment = {
  production: false,
  mainData: {
    method: "get",
   url: "http://localhost:8080/user/document"
  },
  postData: {
    method: "get",
    url: "http://localhost:8080/documents/upload"
  },
  reUploadData: {
    method: "get",
    url: "http://localhost:8080/documents/edit"
  },
  getData: {
    url: "http://localhost:8080/user/document/"
  },
  setData:{
	 url : "http://localhost:8080/documents/upload/"
  }, 
  hostApp: {
    url: "http://localhost:8080/document/hostapp-search"
  },
  doctype: {
    url: "http://localhost:8080/document/doctype-search"
  },
  editedResponse: {
    url: "http://localhost:8080/document/doctype-search"
  },
  reUploaddResponse: {
    url: "http://localhost:8080/user/document"
  },
   deleteResponse: {
    url: "http://localhost:8080/documents/delete/"
  }
}; 


// export const environment = {
//   production: false,

//   mainData: {
//     method: "get",
//     url : "../assets/mock/data.json"
//   },
//   postData: {
//     method: "get",
//     url: "http://localhost:8080/documents/api/upload"
//   },
//   reUploadData: {
//     method: "get",
//     url: "http://localhost:8080/documents/edit"
//   },
//   getData: {
//     url : "../assets/mock/response.json"
//   },
//   setData: {
//     url : "../assets/mock/response.json"
//   },
//   hostApp: {
//     url : "../assets/mock/hostapp.json"
//   },
//   doctype: {
//     url : "../assets/mock/doctype.json"
//   },
//   editedResponse: {
//     url: "http://localhost:8080/document/doctypes"
//   },
//   reUploaddResponse: {
//     url: "http://localhost:8080/document/edit/"
//   },
//    deleteResponse: {
//     url: "http://localhost:8080/document/delete/"
//   }
// };



