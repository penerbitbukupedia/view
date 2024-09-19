import {getFileBytesWithHeader} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.8/api.js";
import {getCookie} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.8/cookie.js";
import { displayConcatenatedPDFs } from "./lib.js";

const decodedURL = atob(decodeURIComponent(window.location.hash.substring(1)));

console.log("A2B: ", decodedURL);

if (!decodedURL) {
    // If hash URL is empty, redirect to 404.html
    window.location.href = '404.html';
}

const hashParams = decodedURL.split('&&');
const pdfByteslist = [];

hashParams.forEach(param => {
    // Assuming param directly contains PDF URLs without keys
    const value = decodeURIComponent(param);
    console.log(value);
    let bytev=getFileBytesWithHeader(value,'login',getCookie('login'),runafterFetch);
    console.log(bytev);
    pdfByteslist.push(bytev);
});

// Load and display concatenated PDFs
displayConcatenatedPDFs(pdfByteslist);

function runafterFetch(result){
    console.log(result);
}