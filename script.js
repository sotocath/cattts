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
    let item=`
    <div class="card">
            <h1 class="name">${data.name}</h1>
            <p class="age">${data.age} ${getWord(data.age, "год", "года", "лет")}</p>
            <div class="imglink" style="background-image: url(${data.img_link})">
            </div>

            <div class="rate">
            ${setRate(data.rate)}
            </div>
        </div>
    `
    divAbout.innerHTML+=item;
}
cats.forEach(renderItem)
