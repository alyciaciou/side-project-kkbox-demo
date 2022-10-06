import { kkboxConfig,ytToken } from "./configs.js"
import { sessionResponse } from "./getApidata.js"
import { searchSongsName,enterEvent } from "./searchValue.js"
const session1Data = sessionResponse.data.data[0].id;
const session1title = sessionResponse.data.data[0].title
console.log(sessionResponse.data.data)

function getTracks(id){
    axios.get(`https://api.kkbox.com/v1.1/new-hits-playlists/${id}/tracks?territory=TW&limit=30`,kkboxConfig).then((res) => {
        const session1Song = res.data.data
        hitsSongsPlay(session1Song)
        title.textContent = session1title
    })
}

getTracks(session1Data)

const chartsYt = document.querySelector("[data-chartsYt]");
const sessionSongsList = document.querySelector("[data-sessionSongsList]");
const playBtns = document.querySelector("[data-btns]");
const kkboxPlayer = document.querySelector("[data-kkboxPlayer]");
const title = document.querySelector("[data-title]");


//播放列表
function hitsSongsPlay(hitsData){
    let session1spalyer = ""
    hitsData.forEach((item,index) => {
        session1spalyer+=`<li data-songId="${item.id}" class="list-group-item
        list-group-item-action
        align-items-center text-light d-flex">
        <img src="${item.album.images[0].url}" style="width:80px;height:80px" alt="">
        <div class="title ms-3 me-auto">
            <p class="artist">${item.album.artist.name}</p>
            <p class="song">${item.name}</p>
        </div>
        <button type="button" class="btn btn-outline-light text-nowrap fw-bolder ms-2" data-song="${item.name}" data-artist="${item.album.artist.name}">觀看</button>
        </li>`
    });
    sessionSongsList.innerHTML = session1spalyer;
};
//YT影片
sessionSongsList.addEventListener("click",(e) => {
    console.log(e.target.nodeName)
    if(e.target.nodeName === "BUTTON"){
        axios.get("https://www.googleapis.com/youtube/v3/search",{
            params:{
                part:"snippet",
                q:`${e.target.dataset.artist} & ${e.target.dataset.song}`,
                maxResult:5,
                key:ytToken
            }
        }).then((res) =>{
            let ytPlayer =`<iframe type="text/html" width="100%" height="400px"
            src="https://www.youtube.com/embed/${res.data.items[0].id.videoId}"
            frameborder="0" allow="autoplay" allowfullscreen></iframe>
            <div class="description text-white fw-bolder " style="overflow-y:scroll;height:100px">
                </p>${res.data.items[0].snippet.title}</p>
                <p>${res.data.items[0].snippet.channelTitle}</p>
                <p>${res.data.items[0].snippet.description}</p>
            </div>`;
            chartsYt.innerHTML = ytPlayer;
        }).catch((err) => console.log(err.response))
    }else{
        return
    }
})
//KKBOX PLAYER
playBtns.addEventListener("click",(e) =>{
    if(e.target.dataset.start === "start"){
        let kkbox = `<iframe type="text/html" width="100%" height="500px"
        src="https://widget.kkbox.com/v1/?id=${session1Data}&type=playlist"
        frameborder="0" class="kkbox rounded-3" ></iframe>`;
        kkboxPlayer.innerHTML = kkbox;
    }else if(e.target.dataset.end === "end"){
        kkboxPlayer.innerHTML = `<div></div>`;
    }
});

//搜尋
const searchBtn =document.querySelector("[data-searchBtn]")
searchBtn.addEventListener("click",searchSongsName);

//enter輸入
const searchArea =document.querySelector("[data-searchArea]")
searchArea.addEventListener("keyup",enterEvent)