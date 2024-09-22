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

//get file bytes if 200, otherwise return json
export function getFileBytesWithHeader(target_url, tokenkey, tokenvalue) {
    let myHeaders = new Headers();
    myHeaders.append(tokenkey, tokenvalue);

    let requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    };

    return fetch(target_url, requestOptions)
        .then(response => {
            if (response.status === 200) {
                // If status is 200, return the file bytes
                return response.arrayBuffer();  // This is a function call
            } else {
                // For non-200 responses, parse as JSON
                return response.json().then(result => {
                    console.log('Error:', result); // Log the error response
                    Swal.fire({
                      icon: 'error',
                      title: 'Oops...',
                      text: result.response,
                    });
                    return null;  // Return null if there is an error
                });
            }
        })
        .catch(error => {
            console.log('Fetch error:', error);
            return null; // Return null in case of an error
        });
}
