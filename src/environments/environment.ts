// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  
  mainData:{
    method: "get",
    //url : "../assets/mock/data.json"
    url : "http://localhost:8080/user/document"
  },
  postData:{
    method: "get",
    url : "http://localhost:8080/documents/api/upload"
  },
  getData:{
      //url : "../assets/mock/response.json"
      url : "http://localhost:8080/user/document/"
 },
  hostApp:{
    //url : "../assets/mock/hostapp.json"
    url : "http://localhost:8080/document/hostapps"
  },
  doctype:{
    //url : "../assets/mock/doctype.json"
    url : "http://localhost:8080/document/doctypes"
 }
 
};
