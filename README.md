# hackernewssearch

## Good to know
- As I am a mac user, the app has only been tested in Chrome, Firefox and Safari.
- Due to CORS issues (Safari doesn't support `Access-Control-Allow-Headers: *`), hitting the API will not work in Safari, thus the app won't work as expected. This is a problem with the API, and not my implementation, as the API needs to return `request.headers.origin` instead of `*` to have full support for all browsers. Please see https://stackoverflow.com/questions/49304677/cors-error-in-safari-not-in-chrome and https://stackoverflow.com/questions/13146892/cors-access-control-allow-headers-wildcard-being-ignored. Please use Chrome or Firefox for testing.
- You have to type six or more characters to search.
- The app will throttle the API calls when typing, so there are no 'unnecessary' API calls made.
- If a search result has a url, a pointer will be shown when hovering over it, and clicking it will open the link in a new tab.
- I have found the API to be quite unpredictable, as the initial request for a 'fuzzy' search like "Javasipt" (note the lack of characters) will for page 1 say that there are 6 pages with a max of 8 articles in total, but for page 2 return that there are 0 pages in total and 0 articles. Weird.

## How to run it
- Clone this project.
- Duplicate `.env.example` and rename the duplicate to `.env`.
- Open your terminal and `cd` into the project root.
- Execute `npm i` to install all dependencies.
- Execute `npm start` to run the project, which will automatically open it in your browser of choice.
