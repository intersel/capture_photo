let startCameraButton = document.querySelector("#start-camera");
let stopCameraButton = document.querySelector("#stop-camera");
let video = document.querySelector("#video");
let takePhotoButton = document.querySelector("#take-photo");
let canvas = document.querySelector("#canvas");
let saveImageButton = document.querySelector("#save-image");
// let stopButton = document.querySelector("#stop")

startCameraButton.addEventListener('click', function (evt) {
	video.style.display = 'block';
	takePhotoButton.style.display = 'block';
	stopCameraButton.style.display = 'block';
})

startCameraButton.addEventListener('click', async function () {
	let stream = await navigator
		.mediaDevices
		.getUserMedia({ video: true, audio: false })
		.then(
			function (stream) {
				// debugger;
				let mediaStream = stream;
				video.srcObject = mediaStream;
				mediaStream.stop = function () {
					this.getVideoTracks().forEach(function (track) { //in case... :)
						track.stop();
					});
				};
				// stop only camera
				stopCameraButton.addEventListener('click', async function () {
					// debugger;
					mediaStream.stop();
					takePhotoButton.style.display = 'none';
					video.style.display = 'none';

				});
			}
		)
		.catch(
			function (err) {
			/* handle the error */
			}
		);
});

takePhotoButton.addEventListener('click', function () {
	canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
	saveImageButton.style.display = 'block';
});

downloadImg = function () {
	// var link = document.createElement('a');
	// link.download = 'filename.png';
	// link.href = document.getElementById('canvas').toDataURL("image/jpg");
	// link.click();

	$.ajax({
		url: "/rest/upload/",
		type: "POST",
		data: {
			"targetDirectory": "testimages",
			"inputFileFieldName": "imageTest",
			"imageTest": document.getElementById('canvas').toDataURL("image/jpg")
		},
		xhrFields: {
			withCredentials: true
		},
		dataType: "json",
	})
	.done(function (data) {
		if (console && console.log) {
			var msg = '<h3>data returned</h3><pre><code class="language-javascript" data-language="javascript">' + JSON.stringify(data, null, 2) + "</code></pre>";
			console.log(msg);
		}
	})
	.fail(function (jqXHR, textStatus) {
		if (console && console.log) {
			var msg = "failed... " + textStatus;
			console.log(msg);
		}
	});
};
