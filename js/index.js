import { kkboxConfig } from "./configs.js"
import { enterEvent } from "./searchValue.js"

const chartSongs = document.querySelector("[data-chartSongs]")
const hitsSongs = document.querySelector("[data-hitsSongs]")
const sessionSongs =document.querySelector("[data-sessionSongs]")

//請求kkbox資料
async function getMusicData(){
    const response = Promise.all([
        axios.get("https://api.kkbox.com/v1.1/charts/LZPhK2EyYzN15dU-PT/tracks?territory=TW&limit=30",kkboxConfig),
        axios.get("https://api.kkbox.com/v1.1/new-hits-playlists?territory=TW&limit=4",kkboxConfig),
        axios.get("https://api.kkbox.com/v1.1/session-playlists?territory=TW&limit=4",kkboxConfig),
    ])
    try{
        const [chartResponse,hitsResponse,sessionResponse] = await response
        let chartData = chartResponse.data.data
        let hitsSongData = hitsResponse.data.data
        let sessionData = sessionResponse.data.data
        renderChart(chartData)
        renderHists(hitsSongData)
        rendersession(sessionData)
    }catch(error){
        console.log(error)
    }
}
//新歌榜畫面
function renderChart(chartData){
    let chartCard = "";
    let chartList = chartData.slice(0,4)
    chartList.forEach((item) => {
        chartCard += `<div class="col card-hover">
        <div class="card border border-black2 border-4 h-100 rounded-2">
          <img src="${item.album.images[1].url}" class="card-img-top p-2 bg-black2" alt="" >
          <div class="card-body bg-black2 text-light ">
            <h4 class="card-title fw-bolder">${item.album.artist.name}</h4>
            <p class""> ${item.name} </p>
          </div>
        </div>
      </div>`
    })
    chartSongs.innerHTML = chartCard;
}
//情境歌單,速爆新歌
function conbimeStrCard(item,index){
    return `<div class="col card-hover">
      <div class="card border border-4 border-black2 h-100 rounded-2" >
        <img src="${item.images[1].url}" class="card-img-top p-2 bg-black2 " alt="">
        <div class="card-body bg-black2 text-white d-flex flex-column justify-content-between" >
          <h4 class="card-title fw-bolder ">${item.title}</h4>
          <p class"mb-auto card-text"> ${item.description} </p>
          <button type="button"  class=" btn  fw-bolder btn-outline-light w-100" data-title="${item.title}" data-index="${index}">前往歌單</button>
        </div>
      </div>
  </div>`
}
//速爆新歌畫面
function renderHists(hitsSongData){
    let histsCard = "";
    hitsSongData.forEach((item,index) => {
        histsCard += conbimeStrCard(item,index)
    })
    hitsSongs.innerHTML = histsCard;
}
//情境歌單畫面
function rendersession(sessionData){
    let sessionCard = "";
    sessionData.forEach((item,index) => {
        sessionCard += conbimeStrCard(item,index)
    })
    sessionSongs.innerHTML = sessionCard;
}

getMusicData()

//點擊前往完整歌單
hitsSongs.addEventListener("click",function(e)  {
  let title = e.target.dataset.title;
  if(title === "華語速爆新歌"){
    window.location.href="./pages/chineseHits.html"
  }else if(title === "西洋速爆新歌"){
    window.location.href="./pages/englishHits.html"
  }else if(title === "日語速爆新歌"){
    window.location.href="./pages/japaneseHits.html"
  }else if(title === "韓語速爆新歌"){
    window.location.href="./pages/koreanHits.html"
  }
})

sessionSongs.addEventListener("click",function(e) {
  let index = e.target.dataset.index;
  if(index === "0"){
    window.location.href="./pages/session1.html"
  }else if(index === "1"){
    window.location.href="./pages/session2.html"
  }else if(index === "2"){
    window.location.href="./pages/session3.html"
  }else if(index === "3"){
    window.location.href="./pages/session4.html"
  }
})

//搜尋
const searchBtn =document.querySelector("[data-searchBtn]")
searchBtn.addEventListener("click",searchSongsName);

async function searchSongsName(){
  const searchArea =document.querySelector("[data-searchArea]")
  let txtvalue = "";
  if(searchArea.value.trim() === ""){
        alert("請輸入歌名");
  }else{
      txtvalue = searchArea.value;
      searchArea.value = ""
      window.location.href=`./pages/search.html?${txtvalue}`
  }
}

//enter輸入搜尋
const searchArea =document.querySelector("[data-searchArea]")
searchArea.addEventListener("keyup",enterEvent)