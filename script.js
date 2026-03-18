function elaveEt() {
    let text = document.getElementById("noteInput").value.trim();

    if (text === "") {
        return;
    }

    let siyahi = JSON.parse(localStorage.getItem("qeydler")) || [];
    siyahi.push(text);
    localStorage.setItem("qeydler", JSON.stringify(siyahi));

    document.getElementById("noteInput").value = "";
    qeydleriGoster();
}

function silQeyd(index) {
    let siyahi = JSON.parse(localStorage.getItem("qeydler")) || [];
    siyahi.splice(index, 1);
    localStorage.setItem("qeydler", JSON.stringify(siyahi));
    qeydleriGoster();
}

function qeydleriGoster() {
    let siyahi = JSON.parse(localStorage.getItem("qeydler")) || [];
    let qeydListesi = document.getElementById("qeydListesi");
    qeydListesi.innerHTML = "";

    siyahi.forEach(function(qeyd, index) {
        let yeniQeyd = document.createElement("li");
        let tarix = new Date().toLocaleString();

yeniQeyd.innerText = qeyd + " (" + tarix + ") ";

       let duzelDugmesi = document.createElement("button");
duzelDugmesi.innerText = "Düzəlt";
duzelDugmesi.onclick = function() {
    let yeniMetn = prompt("Yeni mətni yaz:", qeyd);

    if (yeniMetn !== null && yeniMetn.trim() !== "") {
        let siyahi = JSON.parse(localStorage.getItem("qeydler")) || [];
        siyahi[index] = yeniMetn.trim();
        localStorage.setItem("qeydler", JSON.stringify(siyahi));
        qeydleriGoster();
    }
};

let silDugmesi = document.createElement("button");
silDugmesi.innerText = "Sil";
silDugmesi.onclick = function() {
    silQeyd(index);
};

yeniQeyd.appendChild(duzelDugmesi);
yeniQeyd.appendChild(silDugmesi);
qeydListesi.appendChild(yeniQeyd);
    });
}

function enterYoxla(event) {
    if (event.key === "Enter") {
        elaveEt();
    }
}

qeydleriGoster();