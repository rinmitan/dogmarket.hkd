// ================================
// DogMarket app.js Part1
// ================================

// 犬カード取得
const cards = document.querySelectorAll(".card");

// 検索ボタン
const searchBtn = document.getElementById("searchBtn");

// 入力欄
const searchInput = document.getElementById("search");

// 性別
const sexSelect = document.getElementById("sex");

// 価格
const priceSelect = document.getElementById("price");

// ================================
// 検索
// ================================

function searchDogs() {

    const keyword = searchInput.value.toLowerCase();

    const sex = sexSelect.value;

    const price = priceSelect.value;

    cards.forEach(card => {

        const dogName = card.dataset.name.toLowerCase();

        const dogSex = card.dataset.sex;

        const dogPrice = Number(card.dataset.price);

        let visible = true;

        // 犬種検索
        if (keyword !== "" && !dogName.includes(keyword)) {

            visible = false;

        }

        // 性別検索
        if (sex !== "" && dogSex !== sex) {

            visible = false;

        }

        // 価格検索
        if (price !== "") {

            const range = price.split("-");

            const min = Number(range[0]);

            const max = Number(range[1]);

            if (dogPrice < min || dogPrice > max) {

                visible = false;

            }

        }

        if (visible) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

}

// ================================
// 検索ボタン
// ================================

if (searchBtn) {

    searchBtn.addEventListener("click", searchDogs);

}

// Enterキーでも検索

if (searchInput) {

    searchInput.addEventListener("keyup", function(e){

        if(e.key === "Enter"){

            searchDogs();

        }

    });

}
// ================================
// DogMarket app.js Part2
// ================================

// --------------------
// 詳細ページへ
// --------------------

const detailButtons = document.querySelectorAll(".detailBtn");

detailButtons.forEach((button) => {

    button.addEventListener("click", function () {

        const card = this.closest(".card");

        const dog = {

            name: card.dataset.name,

            sex: card.dataset.sex,

            age: card.dataset.age,

            prefecture: card.dataset.prefecture,

            price: card.dataset.price,

            status: card.dataset.status,

            image: card.querySelector("img").src

        };

        localStorage.setItem("selectedDog", JSON.stringify(dog));

        window.location.href = "detail.html";

    });

});

// --------------------
// 詳細ページ表示
// --------------------

const dog = JSON.parse(localStorage.getItem("selectedDog"));

if (dog && document.getElementById("dogName")) {

    document.getElementById("dogName").textContent = dog.name;

    document.getElementById("dogImage").src = dog.image;

    document.getElementById("dogSex").textContent = dog.sex;

    document.getElementById("dogAge").textContent = dog.age;

    document.getElementById("dogPrefecture").textContent = dog.prefecture;

    document.getElementById("dogPrice").textContent =
        "¥" + Number(dog.price).toLocaleString();

    document.getElementById("dogStatus").textContent = dog.status;

}

// --------------------
// お気に入り
// --------------------

function addFavorite() {

    if (!dog) return;

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    const exists = favorites.find(item => item.name === dog.name);

    if (!exists) {

        favorites.push(dog);

        localStorage.setItem("favorites", JSON.stringify(favorites));

        alert("お気に入りに追加しました！");

    } else {

        alert("すでにお気に入りに登録されています。");

    }

}

// --------------------
// お気に入りボタン
// --------------------

const favoriteBtn = document.getElementById("favoriteBtn");

if (favoriteBtn) {

    favoriteBtn.addEventListener("click", addFavorite);

}

// --------------------
// ページトップへ戻る
// --------------------

const topButton = document.getElementById("topButton");

if (topButton) {

    topButton.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}
