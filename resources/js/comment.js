var page = 0;
var size = 10;
var tempsize;
var data;
var commentData = [];

const changePage = () =>{
	let temp = parseInt(getId("jump").value)-1;   //從0開始算
	let min = Math.floor(data.length/size);
	if(data.length==size) min = 0;
	if(isNaN(temp))temp=0;
	if (temp<0) temp=0;
	if (temp>min)temp=min;
	page = temp;
	add(temp);
	getId("jump").value="";
}
const changeTextSize = () =>{
	var content = document.getElementsByClassName("content");
	for(let i = 0;i<content.length;i++){
		content[i].style.fontSize = getId("textsize").value + "px";
	}
}

const changeTitleSize = () =>{
	var name = document.getElementsByClassName("name");
	var time = document.getElementsByClassName("time");
	for(let i = 0;i<name.length;i++){
		name[i].style.fontSize = getId("titlesize").value + "px";
		time[i].style.fontSize = getId("titlesize").value + "px";
	}
}
const changeFont = () => {
	var content = document.getElementsByClassName("comment");
	for(let i = 0;i<content.length;i++){
		content[i].setAttribute("class","comment " + getId("font").value);
	}
}
const changeText = () => {
	var content = document.getElementsByClassName("content");
	for(let i = 0;i<content.length;i++){
		content[i].style.color = getId("textcolor").value;
	}
}
const changeTitleColor = () => {
	var name = document.getElementsByClassName("name");
	var time = document.getElementsByClassName("time");
	for(let i = 0;i<name.length;i++){
		name[i].style.color = getId("titlecolor").value;
		time[i].style.color = getId("titlecolor").value;
	}
}
const changeBack = () =>{
	var div = document.getElementById("canv").children;
	for(let i = 0;i<div.length;i++){
		div[i].style.background = getId("back").value;
	}
}
const changeRadius= () => {
	var div = document.getElementById("canv").children;
	for(let i = 0;i<div.length;i++){
		div[i].style.borderRadius = getId("radius").value+"px";
	}
}
function showComment(){
	console.log(this);
	// this.
}

function setStyle(){
	changeText();
	changeTitleSize();
	changeTextSize();
	changeTitleColor();
	changeBack();
	changeRadius();
	changeFont();
}

function changeSize(event){
	if(event.value=="0")
		size = data.length;
	else
		size = parseInt(event.value);
	page = 0;
	add(page);
}

function test1(){
	page--;
	add(page);
}
function test2(){
	page++;
	add(page);
}

function add(page){
	if(page==="all"){

	}
	else{
		document.getElementById("canv").innerHTML="";
		if (data.length!=size)
			getId("page").innerHTML = "第 "+(page+1)+" / " + Math.floor(data.length/size+1) +" 頁";
		else
			getId("page").innerHTML = "第 1/1 頁";
		let radius = getId("radius").value;
		let back = getId("back").value;
		let length = page*size+size;
		if(length>=data.length){
			length = data.length;
			getId("test2").disabled=true;
		}
		else
			getId("test2").disabled=false;
		for (let i = size*page; i < length; i++) {
			getId('canv').appendChild(commentData[i].cloneNode(true));
		}
		if(page == 0)
			getId("test1").disabled=true;
		else
			getId("test1").disabled=false;
		
		setStyle();
	}
}

function getTime(time){
	let nowDate = new Date();
	let myDate = new Date(time);
	let diff = (nowDate - myDate)/1000;
	if(diff>31536000) //年
		return Math.floor(diff/31536000) + "年前";
	if(diff>2592000) //月
		return Math.floor(diff/2592000) + "個月前";
	if(diff>345600)
		return Math.floor(diff/345600) + "周前";
	if(diff>86400)
		return Math.floor(diff/86400) + "天前";
	if(diff>3600)
		return Math.floor(diff/3600) + "小時前";
	if(diff>60)
		return Math.floor(diff/60) + "分鐘前";
	
	return Math.floor(diff) + "秒前";
}

function getId(name){
	return document.getElementById(name);
}

function gogo() {
    var zip = new JSZip();
    var img = zip.folder("images");
    var aaa;
	var my_page=0;
	var progress = getId("progress");
	var disabledAll = getId("disabledAll");
	progress.max = data.length;
	progress.value = 0;
	progress.hidden = false;
	disabledAll.hidden = false;
	tempsize = size;
	size = 10;
    var i = (input) => {
		var comment = document.getElementsByClassName("comment");
		let length = getId("canv").children.length;
		for(let i = 0;i<comment.length;i++){
			comment[i].style.height = "fit-content";
		}
        if ((my_page*size)>=data.length) {
			size = tempsize;
        	add(0);
        	progress.hidden = true;
        	disabledAll.hidden = true;
            zip.generateAsync({
                type: "blob",
            }).then(function (content) {
                saveAs(content, "example.zip");
            });
            
        } else if(input < length) {
        	progress.value++;
            html2canvas(comment[input], {
            	scale:1.75,
                useCORS: true,
				backgroundColor:"transparent",		
            }).then(function (canvas) {
//               document.body.append(canvas);
				var r = canvas.toDataURL('image/png');
				aaa = r.slice(r.indexOf(',') + 1);
				let text = document.getElementsByClassName("content")[input].innerText.replace(/\*|\/|\_|,|\.|:|_/ig," ").slice(0,100);
				img.file(text +".png", r.slice(r.indexOf(',') + 1), {
					base64: true	
				});
				i(input + 1);
			}); 
         }else{
        	my_page++;
        	add(my_page);
        	setTimeout(i(0),0);
        }
	}
	add(my_page);
    setTimeout(i(0),0);
}


function load()
{
	for (let i = 0; i < data.length; i++) {
		
		let myDiv = document.createElement("div");
		let div1 = document.createElement("div");
		let div2 = document.createElement("div");
		let div3 = document.createElement("div");
		let span1 = document.createElement("span");
		let span2 = document.createElement("span");
		let myTime = getTime(data[i].time);
		let myImg = document.createElement("img");

		myDiv.setAttribute("class", "comment");
		myDiv.onclick = showComment;
		div1.setAttribute("class","grid");
		span1.setAttribute("class", "name");
		span1.innerHTML = data[i].name;
		span2.setAttribute("class", "time");
		span2.innerHTML = myTime;
		div3.setAttribute("class", "content");
		div3.innerHTML = data[i].text;
		myImg.setAttribute("src", data[i].img);
		
		div2.append(span1);
		div2.append(span2);
		div1.append(div2);
		div1.append(div3);
		myDiv.append(myImg);
		myDiv.append(div1);
		commentData[i] = myDiv;
	}
}


async function start(){
	var videoId = localStorage.getItem('videoId');
	var keyword = localStorage.getItem('keyword');
	// await fetch("http://localhost:8080/video/"+videoId+"?keyword="+keyword).then((res)=>res.json()).then((r)=>{data = r});
	await fetch("https://yt-downloader-andy.herokuapp.com/video/"+videoId+"?keyword="+keyword).then((res)=>res.json()).then((r)=>{data = r});
	getId("numOfComment").innerHTML =　"留言總數" + data.length + "則";
	getId("url").setAttribute("href","https://www.youtube.com/watch?v="+videoId);
	load();
	add(page);
	getId("radius").addEventListener("change",changeRadius);
	getId("back").addEventListener("change",changeBack);
	getId("textcolor").addEventListener("change",changeText);
	getId("titlecolor").addEventListener("change",changeTitleColor);
	getId("jump").addEventListener("change",changePage);
	getId("font").addEventListener("change",changeFont);
	getId("titlesize").addEventListener("change",changeTitleSize);
	getId("textsize").addEventListener("change",changeTextSize);
}

start();