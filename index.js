import {getFileBytesWithHeader} from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.8/api.js";
import { getCookie } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.8/cookie.js";
import { displayConcatenatedPDFs } from "./lib.js";

const decodedURL = atob(decodeURIComponent(window.location.hash.substring(1)));

console.log("A2B: ", decodedURL);

if (!decodedURL) {
    // If hash URL is empty, redirect to 404.html
    window.location.href = '404.html';
}

const hashParams = decodedURL.split('&&');
const pdfByteslist = [];

// Function to fetch and store PDF bytes
async function fetchPDFs() {
    const promises = hashParams.map(param => {
        const value = decodeURIComponent(param);
        console.log(value);
        return getFileBytesWithHeader(value, 'login', getCookie('login'));
    });

    // Wait for all PDFs to be fetched and store them in pdfByteslist
    const pdfResults = await Promise.all(promises);
    pdfResults.forEach(result => {
        if (result) {
            pdfByteslist.push(result);
        }
    });

    // Once all PDFs are fetched, display them
    displayConcatenatedPDFs(pdfByteslist);
}

fetchPDFs();
