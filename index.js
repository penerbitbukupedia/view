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

// Function to fetch PDF bytes and handle asynchronous behavior
async function fetchPDFBytes() {
    const promises = hashParams.map(async (param) => {
        const value = decodeURIComponent(param);
        console.log(value);

        // Fetch PDF bytes with appropriate headers
        const bytev = await getFileBytesWithHeader(value, 'login', getCookie('login'),runafterFetch);
        console.log(bytev);

        return bytev;  // Return the PDF bytes
    });

    // Wait for all the PDFs to be fetched
    const pdfByteslist = await Promise.all(promises);

    // Once all PDFs are fetched, display concatenated PDFs
    displayConcatenatedPDFs(pdfByteslist);
}

// Execute the PDF fetching
fetchPDFBytes();


function runafterFetch(result){
    console.log(result);
}