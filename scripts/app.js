async function fetchData(req) {
    let response = await fetch(req);
    if (response.statusText == "OK") {
        return await response.json();      
    }else{
        throw new Error(response.statusText);
    }
}

function showCategories(){
    fetchData('/data/words.json')
        .then(categories=>{
            let output = "Which Category would you like:";
            let a = Object.keys(categories).sort();
            a.forEach(c => output += (` ${c},`));
            
            document.getElementById("wordCat").innerHTML = output + "?";

        }).catch(error=>this.alert(error))
        
}

function selectWord(){
    fetchData('/data/words.json')
    .then(response=>{
        let output="";
        let userWord=document.getElementById("txtCat").value; 
        let randomNum = ((Math.random()*2)+ 0);
        randomNum=(Math.round(randomNum));
        let word = undefined;
        
        
        if(userWord == "animals"){
            word = response.animals[randomNum]
        }
        else if (userWord == "sports")
            word = response.sports[randomNum]

        else if (userWord == "video games")
            word = response["video games"][randomNum]
        
        
        
        for (let x of word){
            if (x==" "){
                output+= "&nbsp;&nbsp;&nbsp;&nbsp;";
            }
            else
            {
                output+="_ ";
            }

        }


        document.getElementById("hiddenWord").innerHTML = output;
        
        

    }).catch(error=>this.alert(error))
    
} 


window.addEventListener('load', function(){
    showCategories();
    
});

document.getElementById("btnCat").addEventListener("click",function(){
    
    
    selectWord();
});