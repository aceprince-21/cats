 export const environment = {
  production: false,
  mainData: {
    method: "get",
   url: "{origin}/user/document"
  },
  postData: {
    method: "get",
    url: "{origin}/documents/upload"
  },
  reUploadData: {
    method: "get",
    url: "{origin}/documents/edit"
  },
  getData: {
    url: "{origin}/user/document/"
  },
  setData:{
	 url : "{origin}/documents/upload/"
  }, 
  hostApp: {
    url: "{origin}/document/hostapp-search"
  },
  doctype: {
    url: "{origin}/document/doctype-search"
  },
  editedResponse: {
    url: "{origin}/document/doctype-search"
  },
  reUploaddResponse: {
    url: "{origin}/user/document"
  },
   deleteResponse: {
    url: "{origin}/documents/delete/"
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



