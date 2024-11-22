"use strict";
const countriesContainer = document.querySelector(".countries")

const fetchData = async(url, options) => {
    try{
        const response = await fetch(url, options);

        const responseData = await response.json();

        if (response?.ok){
            return responseData
        }else{
            throw new Error(responseData.msg);
        }
    } catch(error){
        console.error("SORRY ERROR OCCURRED:", error);
        return error;
    }
};
 const countriesData = fetchData(`https://countriesnow.space/api/v0.1/countries/info?returns=currency,flag,cities,capital`);
 const countriesPopulation = fetchData(`https://countriesnow.space/api/v0.1/countries/population`);

 console.log({countriesData})

 const formatter = (number) =>
    Intl.NumberFormat({
        maximumSignificantDigits:3,
    }).format(number);

const renderCountry = async(country) =>{
    countriesPopulation.then((data) => {
        const population = data?.data
        .find((item) =>{
            return country?.name?.toLowerCase() === item?.country.toLowerCase();   
        })
        ?.populationCounts.slice(-1)[0].value;

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
                <p class="country__row"><span>💰 Currency:</span>${country.currency}</p>
            </div>
        </div>
        `;
        countriesContainer.insertAdjacentHTML("beforeend", html);
        countriesContainer.style.opacity = 1;
        console.log({ population });
        
        });
    };
    const renderError = function(msg){
        countriesContainer.insertAdjacentText("beforeend", msg);
        countriesContainer.style.opacity = 1;
    };

    countriesData
        .then((data) => 
        {
            console.log({data})
            data?.data?.map((country)=>{
                renderCountry(country);
            })
        }
        )
        .catch((err)=>{
            renderError(err);
        });
  