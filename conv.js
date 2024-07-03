const dropList = document.querySelectorAll(".dropList select");
cont apiKey = Your API Key: 053d110482ad3a1ca02cca59;
FromCurrency = document.querySelector(".From select");
ToCurrency = document.querySelectorAll(".To  select");

country_code = {
    "USA":"US",
    "FRA":"FR",
    "BEN":"BJ",
    "GHA":"US",
    "MAR":"MA",
    "NGA":"NG",
}
getButton = document.querySelector("form button")
for (let i = 0; i < dropList.length; i++) {
    for(currency_code in  country_code){
        let selected;
        if(i ==0){
            selected = currency_code == "USA"? "selected" : "";
        }else if(i ==1){
            selected = currency_code == "FRA "? "selected" : "";
        }
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        dropList[i].insertAdjacentHTML("beforeend",optionTag)
    }
}
getButton.addEventListener("click" , e =>{
       e.preventDefault();
       getConvertir();
});

function getConvertir(){
    const amount = document.querySelector(".amount input");
    let amountVal = amount.value;
    if(amountVal == "" || amountVal == "0"){
        amountVal = "1";
        amountVal = 1;
    }
    let url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${FromCurrency.value}`; 
    fetch(url).then(response => console.log(response.json()))

}