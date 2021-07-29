//creates a search box to search the required currencies
      function searchbox() {
        const searchcontainer = document.createElement("div");
        searchcontainer.className = "search-container";
             searchcontainer.innerHTML =   `<div class = "header-inline"><h1 class = "header"> Welcome to currency exchanger</h1>
             <p class = "description">Know your currency exchange value at a single click</p></div>
             <div class = "header-inline">
             Convert <input class='from-currency-code' placeholder='Enter currency code eg."inr"'/>
             <button class="search-currencys" onclick="refreshpage() , getcurrencyvalues()"> Search </button>
             <button class="sort-currencys" onclick="sortcurrencys()"> Sort by higher value </button></div>
             <button class = "clearall" onclick = "clearall()">Refresh</button>
                `;
                document.body.append(searchcontainer);
                getcurrencyvalues();  //calls currency values        
      }
      //gets the values of currencies euivalent to searched cuurency 
      async function getcurrencyvalues() {
        let code1 = document.querySelector(".from-currency-code").value;
        code1 = code1.toLowerCase();
        if(code1!=""){
            const data = await fetch(
              // fetches data as per searched currency
                `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${code1}.json`,
                {
                  method: "GET"
                }
              );
              
              try{
                let currencyvaluesjson = await data.json();
                currencyvaluesjson = currencyvaluesjson[code1];
                let currencyvaluesarray = [];
                //storing the data in array
                for(key in currencyvaluesjson){
                    currencyvaluesarray.push({"code":key,"value":currencyvaluesjson[key]})
                }
                //stores array data in local storage
                localStorage.setItem("currencyvaluesstring",JSON.stringify(currencyvaluesarray));
              }
              //alerts user if fetch fails
              catch {
                alert("Enter a valid code. Codes for currencies are given below");
              }      
        }
        getcurrencycodes();  // calls  a functin to get currency codes
    } 
    // gets currency codes for all currencies
      async function getcurrencycodes() {
      const data = await fetch(
        `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json`,
        {
          method: "GET"
        }
      ); 
        try{
          const currencyjson = await data.json();
      loadcurrencyvalues(currencyjson);  //loads all currency codes
        }
        catch{
          alert("check internet connection"); // alerts user if fetch fails
        }
    } 
    // loading the equivalent currency values with its codes 
    function loadcurrencyvalues(currencyjson) {
        const currencyvaluesstring = localStorage.getItem("currencyvaluesstring"); // gets the currency values from local storage
        const currencyvalues = JSON.parse(currencyvaluesstring);
       const loadcodes = document.createElement("div");
       loadcodes.className = "load-codes"; 
      if(currencyvalues != null){
        //heading for currency values list
        loadcodes.innerHTML =`
        <div class = "each-code">
        <div class = "currency-code heading">CODE</div>
        : <div class = "currency-value heading">VALUE</div>
        <div class = "currency heading">CURRENCY</div></div>`;
        // selecting each currency and displaying its value,code
        currencyvalues.forEach(currency => {  
          if(currencyjson[currency["code"]] == undefined){
            // this currency is not available in api(but its value and code are available)
            currencyjson[currency["code"]] = "Venezuelan Bolivar";  
          }
          // loading currency values and its codes
            const eachcode = document.createElement("div");  
            eachcode.className = "each-code"  ; 
                eachcode.innerHTML = `<div class = "currency-code">${currency["code"]}</div>
                 : <div class = "currency-value">${currency["value"]}</div>
                 <div class = "currency"> ${currencyjson[currency["code"]]} </div>`;         
            loadcodes.append(eachcode); 
          })}
       //if currency is not searched, codes of all currencies will be displayed
      else {
        // displaying all codes without their values
        loadcodes.innerHTML =`<div class = "each-code">
        <div class = "currency-code heading">CODE</div>
        <div class = "currency heading">CURRENCY</div></div>`;
          for(key in currencyjson)
            {
            const eachcode = document.createElement("div");
            eachcode.className = "each-code"  ; 
            eachcode.innerHTML = `<div class = "currency-code">${key} </div> 
            : <div class = "currency">  ${currencyjson[key]}</div>`;
            loadcodes.append(eachcode);            
          }}
        document.body.append(loadcodes);   
      }      
         // sorting cuurency by highest value
      
      function sortcurrencys() {
          const currencyvaluesstring = localStorage.getItem("currencyvaluesstring");
          const currencyvalues = JSON.parse(currencyvaluesstring);
          if(currencyvalues!=null){
            refreshpage(); //removes existing data
            currencyvalues.sort((a,b) => b.value - a.value);//sorts from higher value to lower value
            localStorage.setItem("currencyvaluesstring",JSON.stringify(currencyvalues));
            getcurrencycodes(); //gets the data and load it
          }
      } 
      //removing existing data
        function refreshpage() {
          document.querySelector(".load-codes").remove(); 
        }   
//clears the page and sets back to original
  function clearall(){
    localStorage.clear();
    document.querySelector(".search-container").remove();
    refreshpage();
    searchbox();
  }
