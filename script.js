
      function searchbox() {
        const searchcontainer = document.createElement("div");
        searchcontainer.className = "search-container";
             searchcontainer.innerHTML =   `<div class = "header-inline"><h1 class = "header"> Welcome to currency exchanger</h1>
             <p class = "description">Know your currency exchange value at a single click</p></div>
             <div class = "header-inline">
             Convert <input class='from-currency-code' placeholder='Enter currency code eg."inr"'/>
            
             <button class="search-currencys" onclick="refreshpage() , getcurrencyvalues()"> Search </button>
             <button class="sort-currencys" onclick="sortcurrencys()"> Sort by higher value </button></div>
                `;
                
                document.body.append(searchcontainer);
                getcurrencyvalues();
                
      }
      async function getcurrencyvalues() {
          
          
        let code1 = document.querySelector(".from-currency-code").value;
        code1 = code1.toLowerCase();
        if(code1!=""){
            const data = await fetch(
                `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${code1}.json`,
                {
                  method: "GET"
                }
              );
              
              try{
                let currencyvaluesjson = await data.json();
                currencyvaluesjson = currencyvaluesjson[code1];
                let currencyvaluesarray = [];
                for(key in currencyvaluesjson){
                    currencyvaluesarray.push({"code":key,"value":currencyvaluesjson[key]})
      
                }
                localStorage.setItem("currencyvaluesstring",JSON.stringify(currencyvaluesarray));

              }
              catch {
                alert("Enter a valid code. Codes for currencies are given below");
              }

                
        }
        getcurrencycodes();
      
      
        
     
    }    
      async function getcurrencycodes() {
      const data = await fetch(
        `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json`,
        {
          method: "GET"
        }
      );

      
        try{
          const currencyjson = await data.json();
      loadcurrencyvalues(currencyjson);
        }
        catch{
          alert("check internet connection");
        }
     
    }  
    function loadcurrencyvalues(currencyjson) {
        const currencyvaluesstring = localStorage.getItem("currencyvaluesstring");
        const currencyvalues = JSON.parse(currencyvaluesstring);
       const loadcodes = document.createElement("div");
       loadcodes.className = "load-codes";
      if(currencyvalues != null){
        currencyvalues.forEach(currency => {   
            const eachcode = document.createElement("div");  
            eachcode.className = "each-code"  ; 
                eachcode.innerHTML = `<div class = "currency-code">${currency["code"]}</div>
                 : <div class = "currency-value">${currency["value"]}</div>
                 <div class = "currency"> ${currencyjson[currency["code"]]} </div>`;         
            loadcodes.append(eachcode);
              
          })}
      
      else {
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
                
     
            
         
      
      function sortcurrencys() {
          
          const currencyvaluesstring = localStorage.getItem("currencyvaluesstring");
          const currencyvalues = JSON.parse(currencyvaluesstring);
          if(currencyvalues!=null){
            refreshpage();
            currencyvalues.sort((a,b) => b.value - a.value);
            localStorage.setItem("currencyvaluesstring",JSON.stringify(currencyvalues));
            getcurrencycodes();
          }
      } 
      
        function refreshpage() {
        
          document.querySelector(".load-codes").remove(); 
              
         
        }   

  
