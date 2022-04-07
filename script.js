const storage = window.localStorage;

const divAbout=document.querySelector("div.about");
function setRate(num){
    let plus="<img src='img/ello-brands.svg'>";
    let minus="<img src='img/face-meh-blank-regular.svg'>";
    let rate="";
    let quantity=10;
    for(let i=0;i<quantity;i++){
        if(i<num){
            rate+=plus;
        }else{
            rate+=minus;
        }  
    }
    return rate;
}

  function getWord(n, w1, w2, w0) {
    if (n % 100 < 11 || n % 100 > 14) {
        if (n % 10 === 1) {
            return w1;
        } else if (n % 10 >= 2 && n % 10 <= 4) {
            return w2;
        } else {
            return w0;
        }
    } else {
        return w0;
    }
}

function renderItem(data){
     let div= document.createElement("div");
     div.className = "card";
    div.innerHTML=`
            <h1 class="name">${data.name}</h1>
            <p class="age">${data.age} ${getWord(data.age, "год", "года", "лет")}</p>
            <div class="imglink" style="background-image: url(${data.img_link})">
            </div>

            <div class="rate">
            ${setRate(data.rate)}
            </div>
        
    `;
    div.addEventListener("click", function(e){
        window.location.replace(`cat.html#${data.id}`);
    })
    
    return div;
}



let container=document.querySelector(".card");
function setCard(cat={}){
        divAbout.append(renderItem(cat));
    }
    


let path = {
    getAll: "http://sb-cats.herokuapp.com/api/2/katya--38/show",
    getOne: "http://sb-cats.herokuapp.com/api/2/katya--38/show/",
    getId: "http://sb-cats.herokuapp.com/api/2/katya--38/ids",
    add: "http://sb-cats.herokuapp.com/api/2/katya--38/add",
    upd: "http://sb-cats.herokuapp.com/api/2/katya--38/update/",
    del: "http://sb-cats.herokuapp.com/api/2/katya--38/delete/"
}


let cats = storage.getItem("cats");
if (!cats) {
    fetch(path.getAll)
        .then(res => res.json())
        .then(result => {
            console.log(result);
            if (result.data) {
                storage.setItem("cats", JSON.stringify(result.data));
                result.data.forEach(cat => {
                    setCard(cat);
                });
            }
        });
} else {
    JSON.parse(cats).forEach(cat => {
        setCard(cat);
    });
}

