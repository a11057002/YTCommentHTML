function authenticate() {
	// 認證之 youtube 會員必須是有頻道的
	return gapi.auth2.getAuthInstance()
		.signIn({ scope: 'https://www.googleapis.com/auth/youtube.force-ssl' })
		.then(
			function () {
				console.log('Sign-in successful')
				loadClient()
			},
			function (err) {
				console.error('Error signing in', err)
			}
		)
}
function loadClient() {
	gapi.client.setApiKey('AIzaSyAlRaMlfaIHvD_YL_FkiGiqTh-3UNa6U8s')
	return gapi.client
		.load('https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest')
		.then(
			function () {
				console.log('GAPI client loaded for API')
				Swal.fire({
					title: '留言',
					input: 'text',
					showCancelButton: true,
					confirmButtonText: '上傳',
					preConfirm: (text) => {
						execute(text)
					}
				})
			},
			function (err) {
				console.error('Error loading GAPI client for API', err)
			}
		)
}
// Make sure the client is loaded and sign-in is complete before calling this method.
function execute(text) {
  let videoId = localStorage.getItem("videoId");
	return gapi.client.youtube.commentThreads
		.insert({
			part: ['snippet'],
			resource: {
				snippet: {
					videoId: videoId,
					topLevelComment: {
						snippet: {
							textOriginal: text
						}
					}
				}
			}
		})
		.then(
			function (response) {
        // Handle the results here (response.result has the parsed body).
        Swal.fire("留言上傳成功","","success")
				console.log('Response', response)
			},
			function (err) {
				console.error('Execute error', err)
			}
		)
}

gapi.load("client:auth2", function() {
  gapi.auth2.init({client_id: "173776471481-2o55s1u21o23r5568dtpder7fde7h6t1.apps.googleusercontent.com"});
});
