const dropList = document.querySelectorAll(".dropList select");
const apiKey = "e164d62ab5ae91c9da7bb361";
const fromCurrency = document.querySelector(".From select");
const toCurrency = document.querySelector(".To  select");

country_code = {
    "USD": "USA",
    "EUR": "FR",
    "XOF": "BJ", 
    "GHS": "GH",
    "MAD": "MA",
    "NGN": "NG",
}
const getButton = document.querySelector("form button")
for (let i = 0; i < dropList.length; i++) {
    for(currency_code in  country_code){
        let selected;
        if(i ==0){
            selected = currency_code == "USA"? "selected" : "";
        }else if(i ==1){
            selected = currency_code == "FRA "? "selected" : "";
        }
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        dropList[i].insertAdjacentHTML("beforeend",optionTag);
    }
    dropList[i].addEventListener("change", e =>{
        loadFlag(e.target);
    })
}
function loadFlag(element){
    for(code in country_code){
        if(code == element.value){
            let imgTag = element.parentElement.querySelector("img");
            imgTag.src = `https://flagsapi.com/${country_code}/flat/64.png`;
        }
    }
}
window.addEventListener("load" , () =>{
       getConvertir();
});
getButton.addEventListener("click" , e =>{
    e.preventDefault();
    getConvertir();
});

const exchangerateIcon = document.querySelector(".icon");
exchangerateIcon.addEventListener("click" , ()=>{
    let tempCode = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCode;
    loadFlag(fromCurrency);
    loadFlag(toCurrency);
    getConvertir();
})

function getConvertir(){
    const amount = document.querySelector(".amount input");
    const exchangeRateTxt = document.querySelector(".result"); 
    let amountVal = amount.value;
    if(amountVal == "" || amountVal == "0"){
        amount.value = "1";
        amountVal = 1;
    }
    exchangeRateTxt.innerText = "Getting convertion..."
    let url = ` https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency.value}`
    fetch(url).then(response => response.json()).then(result =>{
        let exchangeRate = result.conversion_rates[toCurrency.value];
        let totalexchangeRate = (amountVal * exchangeRate).toFixed(2);
        exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value}= ${totalexchangeRate} ${toCurrency.value}`; 
    }).catch(() =>{
        exchangeRateTxt.innerText = "Something went wrong"
    })

}