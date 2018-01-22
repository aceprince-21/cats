 export const environment = {
  production: true,
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
}