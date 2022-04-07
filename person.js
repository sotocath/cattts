const storage = window.localStorage;

const catId = +window.location.hash.split("#")[1];
console.log(catId);

let path = {
    getAll: "http://sb-cats.herokuapp.com/api/2/katya--38/show",
    getOne: "http://sb-cats.herokuapp.com/api/2/katya--38/show/",
    getId: "http://sb-cats.herokuapp.com/api/2/katya--38/ids",
    add: "http://sb-cats.herokuapp.com/api/2/katya--38/add",
    upd: "http://sb-cats.herokuapp.com/api/2/katya--38/update/",
    del: "http://sb-cats.herokuapp.com/api/2/katya--38/delete/"
}

const setContent = function (obj) {
    return `
    <h1 class="cat_name"><span class="${obj.favourite ? "fav" : ""}" name ="name">${obj.name}</span><button class="delBtn">Delete</button></h1>
    <div class="person_pic" style="background-image: url(${obj.img_link || 'img/cat.png'})"></div>
    <table>
       <tr><th>Возраст</th><td><span name="age">${obj.age || 0}<button class="upd" onclick="updateRow(this)">upd</button></span></td></tr>
       <tr><th>Рейтинг</th><td><span name="rate">${obj.rate || 0}<button class="upd" onclick="updateRow(this)">upd</button></span></td></tr>
       <tr><th>Описание</th><td><span name="description">${obj.description || "Тут пока ничего нет"}
       <button class="upd" onclick="updateRow(this)">upd</button>
       </span></td></tr>
    </table>
    `
}


const updateRow = function (el) {
    let row = el.parentElement;
    let parent = row.parentElement;
    let clone = row.cloneNode(true);
    let name = row.getAttribute("name");
    let text = el.previousSibling.textContent.trim();
    parent.innerHTML = `
    <input  name="${name}" value="${text}" class="${clone.className}">
    <button class="accept" onclick="acceptUpd(this)">ok</button>
    <button class="cancel">no</button>
    `;
    parent.querySelector(".cancel").addEventListener("click", function () {
        console.log(clone);
        parent.innerHTML = "";
        parent.append(clone);
    })
}

const acceptUpd = function (el) {
    const val = el.previousElementSibling.value;
    const name = el.previousElementSibling.name;
    const parent = el.parentElement;
    let fav = el.previousElementSibling.classList.contains("fav");
    console.log(val, name);
    const body = {};
    body[name] = val;
    updateCat(catId, body, parent, fav);
}

const updateCat = async function (id, body, parent, fav) {
    let res = await fetch(`http://sb-cats.herokuapp.com/api/2/katya--38/update/${id}`, {
        method: "put",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(body)
    });
    let ans = await res.json();
    console.log(ans);
    let name = Object.keys(body)[0];
    parent.innerHTML = `
    <span name="${name}" class="${fav ? "fav" : null}">${body[name]}
       <button class="upd" onclick="updateRow(this)">upd</button>
       </span>
    `

}


const getCat = async function (id) {
    let res = await fetch("http://sb-cats.herokuapp.com/api/2/katya--38/show/" + id);
    let ans = await res.json();
    console.log(ans);
    document.querySelector("main").innerHTML = setContent(ans.data);

    let catBlocks = document.querySelectorAll(".delBtn");
    catBlocks.forEach(name => {
        name.addEventListener("click", function (e) {
            e.stopPropagation();

            fetch(`${path.del}${catId}`, { method: "delete" })
                .then(function (res) {
                    let cats = storage.getItem("cats");
                    if (cats) {
                        let obj = JSON.parse(cats);
                        let index = obj.findIndex((el, i) => el.id === catId);
                        obj.splice(index, 1);
                        console.log(obj);
                        storage.setItem("cats", JSON.stringify(obj));
                    }
                    window.location.href = "/index.html";
                });

        });
    });
}

getCat(catId);

