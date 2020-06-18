var page = 0
var size = 10
var tempsize
var data
var commentData = []

const fancyVideo = () => {
	var frame = document.getElementsByClassName('fancybox-container')[0]
	var c = document.getElementsByClassName('fancybox-content')[0]
	var s = document.getElementsByClassName('fancybox-slide')[0]
	var width = frame.style.width
	var height = frame.style.height
	console.log(width == '')
	if ((width == '') | (width == '100%')) {
		frame.style.width = '30%'
		frame.style.height = '30%'
		frame.style.left = 'auto'
		frame.style.top = 'auto'
		frame.style.right = '0'
		frame.style.bottom = '0'
		c.style.height = ''
		c.style.width = ''
		s.style.display = 'contents'
		document.body.style.overflow = 'auto'
	} else {
		frame.style.width = '100%'
		frame.style.height = '100%'
		s.style.display = 'block'
	}
}

const addVideo = (data) => {
	const frame = document.getElementById('videoFrame')
	for (let i = 0; i < data.length; i++) {
		let div = document.createElement('div')
		let a = document.createElement('a')
		let img = document.createElement('img')
		let title = document.createElement('div')
		let description = document.createElement('div')

		div.setAttribute('class', 'video')
		img.setAttribute('src', data[i].thumbnail)
		div.onclick = function () {
			localStorage.setItem('videoId', data[i].videoId)
			document.getElementById('fancyTitle').innerHTML = data[i].title
			getId('keyword').value = ''
			$.fancybox.open($('#fancy'))
		}
		title.setAttribute('class', 'title')
		title.innerHTML = data[i].title
		description.setAttribute('class', 'description')
		description.innerHTML = data[i].description

		div.append(a)
		a.append(img)
		a.append(title)
		a.append(document.createElement('hr'))
		a.append(description)

		frame.append(div)
	}
}

const changeBody = () => {
	document.body.style.background = getId('bodycolor').value
	document.body.style.color = getId('bodyfont').value
}

const changePage = () => {
	let temp = parseInt(getId('jump').value) - 1 //從0開始算
	let min = Math.floor(data.length / size)
	if (data.length == size) min = 0
	if (isNaN(temp)) temp = 0
	if (temp < 0) temp = 0
	if (temp > min) temp = min
	page = temp
	add(temp)
	getId('jump').value = ''
}
const changeTextSize = () => {
	var content = document.getElementsByClassName('content')
	var size = getId('textsize').value
	for (let i = 0; i < content.length; i++) {
		content[i].style.fontSize = size + 'px'
	}
}

const changeTitleSize = () => {
	var name = document.getElementsByClassName('name')
	var time = document.getElementsByClassName('time')
	var size = getId('titlesize').value
	for (let i = 0; i < name.length; i++) {
		name[i].style.fontSize = size + 'px'
		time[i].style.fontSize = size + 'px'
	}
}
const changeFont = () => {
	var content = document.getElementsByClassName('comment')
	var font = getId('font').value
	for (let i = 0; i < content.length; i++) {
		content[i].setAttribute('class', 'comment ' + font)
	}
}
const changeText = () => {
	var content = document.getElementsByClassName('content')
	var color = getId('textcolor').value
	for (let i = 0; i < content.length; i++) {
		content[i].style.color = color
	}
}
const changeTitleColor = () => {
	var name = document.getElementsByClassName('name')
	var time = document.getElementsByClassName('time')
	var color = getId('titlecolor').value
	for (let i = 0; i < name.length; i++) {
		name[i].style.color = color
		time[i].style.color = color
	}
}
const changeBack = () => {
	var div = document.getElementById('canv').children
	var color = getId('back').value
	var opacity = getId('opacity').value
	var myColor =
		'rgba(' +
		parseInt(color.slice(-6, -4), 16) +
		',' +
		parseInt(color.slice(-4, -2), 16) +
		',' +
		parseInt(color.slice(-2), 16) +
		',' +
		opacity +
		')'
	for (let i = 0; i < div.length; i++) {
		div[i].style.background = myColor
	}
}
const changeRadius = () => {
	var div = document.getElementById('canv').children
	var radius = getId('radius').value + 'px'
	for (let i = 0; i < div.length; i++) {
		div[i].style.borderRadius = radius
	}
}

function setStyle() {
	changeText()
	changeTitleSize()
	changeTextSize()
	changeTitleColor()
	changeBack()
	changeRadius()
	changeFont()
	changeBody()
}

function changeSize(event) {
	if (event.value == '0') size = data.length
	else size = parseInt(event.value)
	page = 0
	add(page)
}

function test1() {
	page--
	add(page)
}
function test2() {
	page++
	add(page)
}

function add(page) {
	const canv = getId('canv')
	const mypage = getId('page')
	canv.innerHTML = ''
	let pageLength =
		data.length % size == 0 && data.length!=0
			? Math.floor(data.length / size)
			: Math.floor(data.length / size)+1
	if (data.length != size)
		mypage.innerHTML = '第 ' + (page + 1) + ' / ' + pageLength + ' 頁'
	else mypage.innerHTML = '第 1/1 頁'
	let radius = getId('radius').value
	let back = getId('back').value
	let length = page * size + size
	if (length >= data.length) {
		length = data.length
		getId('test2').disabled = true
	} else getId('test2').disabled = false
	for (let i = size * page; i < length; i++) {
		canv.appendChild(commentData[i].cloneNode(true))
	}
	if (page == 0) getId('test1').disabled = true
	else getId('test1').disabled = false

	setStyle()
}

function getTime(time) {
	let nowDate = new Date()
	let myDate = new Date(time)
	let diff = (nowDate - myDate) / 1000
	if (diff > 31536000)
		//年
		return Math.floor(diff / 31536000) + '年前'
	if (diff > 2592000)
		//月
		return Math.floor(diff / 2592000) + '個月前'
	if (diff > 345600) return Math.floor(diff / 345600) + '周前'
	if (diff > 86400) return Math.floor(diff / 86400) + '天前'
	if (diff > 3600) return Math.floor(diff / 3600) + '小時前'
	if (diff > 60) return Math.floor(diff / 60) + '分鐘前'

	return Math.floor(diff) + '秒前'
}

function backToHome() {
	location.href = 'index.html'
}

function backToSearch() {
	getId('main').style.display = 'flex'
	getId('sub').style.display = 'none'
}

function getId(name) {
	return document.getElementById(name)
}

function download() {
	var zip = new JSZip()
	var img = zip.folder('images')
	var aaa
	var my_page = 0
	var progress = getId('progress')
	var disabledAll = getId('disabledAll')
	progress.max = data.length
	progress.value = 0
	progress.hidden = false
	disabledAll.hidden = false
	tempsize = size
	size = 10
	var i = (input) => {
		var comment = document.getElementsByClassName('comment')
		let length = getId('canv').children.length
		for (let i = 0; i < comment.length; i++) {
			comment[i].style.height = 'fit-content'
		}
		if (my_page * size >= data.length) {
			size = tempsize
			add(0)
			progress.hidden = true
			disabledAll.hidden = true
			zip
				.generateAsync({
					type: 'blob'
				})
				.then(function (content) {
					saveAs(content, 'example.zip')
				})
		} else if (input < length) {
			progress.value++
			html2canvas(comment[input], {
				scale: 1.75,
				useCORS: true,
				backgroundColor: 'transparent'
			}).then(function (canvas) {
				//               document.body.append(canvas);
				var r = canvas.toDataURL('image/png')
				aaa = r.slice(r.indexOf(',') + 1)
				let text = document
					.getElementsByClassName('content')
					[input].innerText.replace(/\*|\/|\_|,|\.|:|_/gi, ' ')
					.slice(0, 100)
				img.file(text + '.png', r.slice(r.indexOf(',') + 1), {
					base64: true
				})
				i(input + 1)
			})
		} else {
			my_page++
			add(my_page)
			setTimeout(i(0), 0)
		}
	}
	add(my_page)
	setTimeout(i(0), 0)
}

function load() {
	for (let i = 0; i < data.length; i++) {
		let myDiv = document.createElement('div')
		let div1 = document.createElement('div')
		let div2 = document.createElement('div')
		let div3 = document.createElement('div')
		let span1 = document.createElement('span')
		let span2 = document.createElement('span')
		let myTime = getTime(data[i].time)
		let myImg = document.createElement('img')

		myDiv.setAttribute('class', 'comment')
		div1.setAttribute('class', 'grid')
		span1.setAttribute('class', 'name')
		span1.innerHTML = data[i].name
		span2.setAttribute('class', 'time')
		span2.innerHTML = myTime
		div3.setAttribute('class', 'content')
		div3.innerHTML = data[i].text
		myImg.setAttribute('src', data[i].img)

		div2.append(span1)
		div2.append(span2)
		div1.append(div2)
		div1.append(div3)
		myDiv.append(myImg)
		myDiv.append(div1)
		commentData[i] = myDiv
	}
}

async function search() {
	var videoId = localStorage.getItem('videoId')
	var keyword = localStorage.getItem('keyword')
	commentData = []
	getId('canv').innerHTML = ''
	getId('loader').style.display = 'flex'
	getId('sub').style.display = 'none'
	getId('main').style.display = 'none'
	await fetch(
		'https://yt-downloader-andy.herokuapp.com/video/' +
			videoId +
			'?keyword=' +
			keyword
	)
		.then((res) => res.json())
		.then((r) => {
			data = r
		})
	getId('numOfComment').innerHTML = '留言總數' + data.length + '則'
	getId('url').setAttribute(
		'href',
		'https://www.youtube.com/watch?v=' + videoId
	)
	load()
	add(page)
	getId('loader').style.display = 'none'
	getId('sub').style.display = 'block'
}

async function start() {
	getId('loader').style.display = 'flex'
	let videokeyword = localStorage.getItem('videokeyword')
	await fetch(
		'https://yt-downloader-andy.herokuapp.com/search?keyword=' + videokeyword,
		{
			method: 'GET'
		}
	)
		.then((data) => data.json())
		.then((res) => {
			document.getElementById('loader').style.display = 'none'
			addVideo(res)
		})

	$.fancybox.defaults.btnTpl.changeSize =
		"<button data-fancybox-changeSize class='fancybox-button' title='changeSize'><svg viewBox='0 0 32 32'><path d='M25,17 L17,17 L17,23 L25,23 L25,17 L25,17 Z M29,25 L29,10.98 C29,9.88 28.1,9 27,9 L9,9 C7.9,9 7,9.88 7,10.98 L7,25 C7,26.1 7.9,27 9,27 L27,27 C28.1,27 29,26.1 29,25 L29,25 Z M27,25.02 L9,25.02 L9,10.97 L27,10.97 L27,25.02 L27,25.02 z'/></svg></button>"
	$('#url').fancybox({
		css: {
			display: 'contents'
		},
		buttons: ['share', 'changeSize', 'close']
	})

	$('body').on('click', '[data-fancybox-changeSize]', fancyVideo)
	getId('radius').addEventListener('change', changeRadius)
	getId('opacity').addEventListener('change', changeBack)
	getId('back').addEventListener('change', changeBack)
	getId('bodycolor').addEventListener('change', changeBody)
	getId('bodyfont').addEventListener('change', changeBody)
	getId('textcolor').addEventListener('change', changeText)
	getId('titlecolor').addEventListener('change', changeTitleColor)
	getId('jump').addEventListener('change', changePage)
	getId('font').addEventListener('change', changeFont)
	getId('titlesize').addEventListener('change', changeTitleSize)
	getId('textsize').addEventListener('change', changeTextSize)
	getId('keyword').addEventListener('keypress', (e) => {
		if (e.key == 'Enter') {
			let value = encodeURI(getId('keyword').value)
			localStorage.setItem('keyword', value)
			$.fancybox.close($('#fancy'))
			search()
		}
	})
	getId('loader').style.display = 'none'
	getId('main').style.display = 'flex'
}

start()
