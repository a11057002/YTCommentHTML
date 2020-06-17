document.getElementById('search').addEventListener('keypress', (e) => {
	if (e.key == 'Enter') {
		let keyword = e.target.value.replace(/\s/g, '')
		if (keyword === '') {
			$.fancybox.open(
				"<div style='color:red;border-radius:10px'>Please enter some keywords!</div>"
			)
			return
		}
		document.getElementById('field').style.display = 'none'
		document.getElementById('loader').style.display = 'block'
		// fetch('http://localhost:8080/search?keyword=' + keyword, {
		// 	method: 'GET'
		// })
		// 	.then((data) => data.json())
		// 	.then((res) => {
		// 		document.getElementById('loader').style.display = 'none'
		// 		addVideo(res)
		// 	})
		fetch("https://yt-downloader-andy.herokuapp.com/search?keyword="+keyword,{
		    method:"GET"
		}).then((data)=>data.json()).then((res)=>{
		    document.getElementById("loader").style.display = "none";
		    addVideo(res);
		})
	}
})

document.getElementById('keyword').addEventListener('keypress', (e) => {
	if (e.key == 'Enter') {
		let value = encodeURI(document.getElementById('keyword').value)
		localStorage.setItem('keyword', value)
		location.href = 'comment.html'
	}
})

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
