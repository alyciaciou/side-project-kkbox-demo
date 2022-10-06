async function searchSongsName(){
    const searchArea =document.querySelector("[data-searchArea]")
    let txtvalue = "";
    if(searchArea.value.trim() === ""){
          alert("請輸入歌名");
    }else{
        txtvalue = searchArea.value;
        searchArea.value = ""
        window.location.href=`../pages/search.html?${txtvalue}`
    }
}

function enterEvent(e){
    if(e.key ==="Enter"){
        searchSongsName()
    }
}
  
export {searchSongsName,enterEvent}

