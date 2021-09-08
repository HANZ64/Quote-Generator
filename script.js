const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");
let errorCount = 0;
let apiQuotes = [];

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// Show New Quote
function newQuote() {
  showLoadingSpinner();
  // Pick a random quote from apiQuotes array 
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  // Check if the Author field is blank and replace it with 'Unknown'
  if(!quote.author) {
      authorText.textContent = 'Unknown';
  } else {
      authorText.textContent = quote.author;
  }
  // Check Quote length to determine styling 
  if (quote.text.length > 50) {
      quoteText.classList.add('long-quote');
  } else {
      quoteText.classList.remove('long-quote');
  }

  //Set Quote, Hide loader
  quoteText.textContent = quote.text;
  removeLoadingSpinner();
}

// Get Quote From API (old version)
// async function getQuote() {
//   showLoadingSpinner();
//   const proxyUrl = "https://whispering-tor-04671.herokuapp.com/";
//   const apiUrl = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
//   try {
//     const response = await fetch(proxyUrl + apiUrl);
//     const data = await response.json();
//     // If Author is blank, add 'Unknown'
//     if (data.quoteAuthor === "") {
//       authorText.innerText = "Unknown";
//     } else {
//       authorText.innerText = data.quoteAuthor;
//     }
//     // Reduce font size for long quotes
//     if (data.quoteText.length > 120) {
//       quoteText.classList.add("long-quote");
//     } else {
//       quoteText.classList.remove("long-quote");
//     }
//     quoteText.innerText = data.quoteText;
//     removeLoadingSpinner();
//     //throw new Error("ERROR!");
//   } catch (error) {
//     if (error) {
//       errorCount++;
//       if (errorCount > 10) {
//         console.log("STOP! Too many errors!");
//         // alert("Something went wrong. Please reload the page.");
//         if (confirm("Something went wrong! Please click ok to reload the page and try again.")) {
//           window.location.reload();
//         }
//         return null;
//       }
//     }
//     console.log(error);
//     //console.log(errorCount);
//     getQuote();
//   }
// }

// Get Quotes From API
async function getQuotes() {
  showLoadingSpinner();
  const apiUrl = 'https://type.fit/api/quotes';
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json(); 
    newQuote();
  } catch(error){
    console.log(error);
  }
}

// Tweet Quote
function tweetQuote() {
  const quote = quoteText.textContent;
  const author = authorText.textContent;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuotes();
