import {kkboxConfig} from "./configs.js"
import {searchSongsName,enterEvent} from "./searchValue.js"

const searchBtn =document.querySelector("[data-searchBtn]")
const searchResponse =document.querySelector("[data-searchResponse]")
const kkboxPlayer =document.querySelector("[data-kkboxPlayer]")

searchBtn.addEventListener("click",searchSongsName)
//擷取每頁傳送的搜尋參數
const url = location.search
if(url.indexOf("?")!==-1){
    const sarechName = decodeURIComponent(url.substring(1)) 
    searchSongs(sarechName)
}

async function searchSongs(sarechName){
    const res =  await axios.get(`https://api.kkbox.com/v1.1/search?q=${sarechName}&type=track&territory=TW&limit=30`,kkboxConfig)
    const searchData = res.data.tracks.data
    renderSearchCard(searchData)
}
//渲染畫面
function renderSearchCard(searchData){
    let searchStr = "";
    searchData.forEach((item) => {
        searchStr += `<div class="col card-hover">
        <div class="card border border-4 h-100 border-black2 rounded-2">
          <img src="${item.album.images[1].url}" class="card-img-top bg-black2 p-2" alt="">
          <div class="card-body bg-black2 text-light d-flex flex-column justify-content-between">
            <h4 class="card-title fw-bolder fs-6">${item.album.artist.name}</h4>
            <p class"mb-auto"> ${item.name} </p>
            <button type="button" class="btn  btn-outline-light fw-bolder  w-100" data-songId="${item.id}">試聽</button>
          </div>
        </div>
      </div>`
    })
    searchResponse.innerHTML = searchStr
}

//KKBOX PLAYER
searchResponse.addEventListener("click",(e) =>{
    let id = `${e.target.dataset.songid}`
    if(e.target.nodeName === "BUTTON"){
        let kkbox = `<iframe type="text/html" width="100%" height="100px"
        src="https://widget.kkbox.com/v1/?id=${id}&type=song"
        frameborder="0" class="kkbox rounded-3" ></iframe>`;
        kkboxPlayer.innerHTML = kkbox;
    }else if(e.target.nodeName !== "BUTTON"){
        kkboxPlayer.innerHTML = `<div></div>`;
    }
});

//enter輸入
const searchArea =document.querySelector("[data-searchArea]")
searchArea.addEventListener("keyup",enterEvent)