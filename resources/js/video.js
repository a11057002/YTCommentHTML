document.getElementById("search").addEventListener("keypress",(e)=>{
    if(e.key=="Enter"){
        document.getElementById("field").style.display = "none";
        let keyword = e.target.value.replace(/\s/g,'');
        // fetch("http://localhost:8080/search?keyword="+keyword,{
        //     method:"GET"
        // }).then((data)=>data.json()).then((res)=>{
        //      addVideo(res);
        // })
        fetch("https://yt-downloader-andy.herokuapp.com/search?keyword="+keyword,{
            method:"GET"
        }).then((data)=>data.json()).then((res)=>{
             addVideo(res);
        })
    }
});

document.getElementById("keyword").addEventListener("keypress",(e)=>{
    if(e.key=="Enter"){
        localStorage.setItem('keyword', document.getElementById("keyword").value);
        location.href = "comment.html";
    }
});


const addVideo = (data)=>{
    const frame = document.getElementById("videoFrame");
    for(let i = 0;i<data.length;i++){
        let div = document.createElement("div");
        let a = document.createElement("a");
        let img = document.createElement("img");
        let title = document.createElement("div");
        let description = document.createElement("div");

        div.setAttribute("class","video");
        img.setAttribute("src",data[i].thumbnail);
        div.onclick = function(){
            localStorage.setItem('videoId', data[i].videoId);
            document.getElementById("fancyTitle").innerHTML = data[i].title;
            $.fancybox.open($("#fancy"));
        };
        title.setAttribute("class","title");
        title.innerHTML = data[i].title;
        description.setAttribute("class","description");
        description.innerHTML = data[i].description;

        div.append(a);
        a.append(img);
        a.append(title);
        a.append(document.createElement("hr"));
        a.append(description);

        frame.append(div);
    }
}

