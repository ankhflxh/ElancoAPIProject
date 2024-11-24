// I used strict mode here to catch common errors
"use strict";

// Selecting the search input field and the container where country data will be displayed.
const searchIn = document.querySelector(".search");
const countriesContainer = document.querySelector(".countries");

// Function to fetch data from the API with error handling.
const fetchData = async (url, options) => {
  try {
    // Fetching data from the API and Logging the response for debugging purposes and then Parsing the response as JSON.
    const response = await fetch(url, options);
    console.log({ response });
    const responseData = await response.json();
    // Returning the response data if the response is successful, otherwise throwing an error.
    if (response?.ok) {
      return responseData;
    } else {
      throw new Error(responseData.msg);
    }
  } catch (error) {
    console.error("SORRY ERROR OCCURRED:", error);
    return error;
  }
};

// Fetching general information about countries like currency, flag, capital, etc and population data for countries
const countriesData = fetchData(
  `https://countriesnow.space/api/v0.1/countries/info?returns=currency,flag,cities,capital`
);
const countriesPopulation = fetchData(
  `https://countriesnow.space/api/v0.1/countries/population`
);
console.log({ countriesData });

// Function to format large numbers
const formatter = (number) =>
  Intl.NumberFormat({
    maximumSignificantDigits: 3,
  }).format(number);

// Function to generate and display country data on the page.
const renderCountry = async (country) => {
  // Waiting for population data to be fetched, then displaying it for the specific country.
  countriesPopulation.then((data) => {
    const population = data?.data
      .find((item) => {
        // Matching country names to find the correct population data and  the latest population count.
        return country?.name?.toLowerCase() === item?.country.toLowerCase();
      })
      ?.populationCounts.slice(-1)[0].value;

    // Generating the HTML to display country information.
    const html = ` 
        <div class="country">
            <img class="country__img" src="${country.flag}" />
            <div class="country__data">
                <h3 class="country__name">${country.name}</h3>
                <h4 class="country__region">${country.capital}</h4>
                <p class="country__row"><span>👫</span>${
                  population ? `${formatter(population)} people` : "unknown"
                }</p>
                <p class="country__row"><span>🌆</span>${
                  formatter(country?.cities?.length || 0) || "unknown"
                } cities</p>
                <p class="country__row"><span>💰 Currency:</span>${
                  country.currency
                }</p>
            </div>
        </div>
        `;

    // Inserting the generated HTML into the countries container on the page.
    countriesContainer.insertAdjacentHTML("beforeend", html);
    console.log({ population });
  });
};

// Function to display an error message if something goes wrong.
const renderError = function (msg) {
  countriesContainer.insertAdjacentText("beforeend", msg);
};

let allCountries = [];
// Fetching countries' general info and population data, then displaying it for each country.
countriesData
  .then((data) => {
    allCountries = data?.data || [];
    return Promise.all(
      allCountries.map(async (country) => {
        // Fetching population data for each country.
        const populationData = await countriesPopulation;
        const population = populationData?.data
          .find(
            (item) =>
              item?.country.toLowerCase() === country?.name.toLowerCase()
          )
          ?.populationCounts.slice(-1)[0]?.value;
        // Displaying the country’s information.
        renderCountry(country, population);
      })
    );
  })
  .catch((err) => {
    renderError(err);
  });

// Setting up an event listener for the search input field, to filter countries based on the query.
searchIn.addEventListener("input", (e) => {
  const searchItem = e.target.value.toLowerCase();
  countriesContainer.innerHTML = "";

  // Filtering through the countries list and displaying only those that match the search query.
  allCountries
    .filter((country) => country.name.toLowerCase().includes(searchItem))
    .forEach((filteredCountry) => {
      console.log({ filteredCountry });
      const populationData = countriesPopulation;
      populationData
        .then((data) => {
          const population = data?.data
            .find(
              (item) =>
                item?.country.toLowerCase() ===
                filteredCountry?.name.toLowerCase()
            )
            ?.populationCounts.slice(-1)[0]?.value;
          renderCountry(filteredCountry, population);
        })
        .catch((error) => {
          console.error("Error fetching population data:", error);
        });
    });
});
