document.getElementById('search').addEventListener('keypress', (e) => {
	if (e.key == 'Enter') {
		search()
	}
})

function search(){
    let e = document.getElementById("search");
    let videokeyword = e.value.replace(/\s/g, '')
    if (videokeyword === '') {
        $.fancybox.open(
            "<div style='color:red;border-radius:10px'>Please enter some keywords!</div>"
        )
        return
    }
    localStorage.setItem('videokeyword',  e.value)
    location.href = 'comment.html'
}
