let startCameraButton = document.querySelector("#start-camera");
let video = document.querySelector("#video");
let takePhotoButton = document.querySelector("#take-photo");
let canvas = document.querySelector("#canvas");
let saveImageButton = document.querySelector("#save-image");
// let stopButton = document.querySelector("#stop")

startCameraButton.addEventListener('click', function (evt) {
	video.style.display = 'block';
	takePhotoButton.style.display = 'block';
})

startCameraButton.addEventListener('click', async function () {
	let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
	video.srcObject = stream;
});

takePhotoButton.addEventListener('click', function () {
	canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
	saveImageButton.style.display = 'block';
});

downloadImg = function () {
	var link = document.createElement('a');
	link.download = 'filename.png';
	link.href = document.getElementById('canvas').toDataURL("image/jpg");
	link.click();
};