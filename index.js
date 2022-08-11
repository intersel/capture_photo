let camera_button = document.querySelector("#start-camera");
let video = document.querySelector("#video");
let click_button = document.querySelector("#click-photo");
let canvas = document.querySelector("#canvas");
let save_button = document.querySelector("#save_image");
let save_link = document.querySelector("#download");
let stopButton = document.querySelector("#stop")

camera_button.addEventListener('click', function (evt) {
	video.style.display = 'block';
	click_button.style.display = 'block';
  })

click_button.addEventListener('click', function (evt) {
	save_button.style.display = 'block';
})

camera_button.addEventListener('click', async function() {
   	let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
	video.srcObject = stream;
});

click_button.addEventListener('click', function() {
   	canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
   	let image_data_url = canvas.toDataURL('image/jpeg');
	save_link.style.display = 'block';

   	// data url of the image
   	console.log(image_data_url);
});

/* stopButton.addEventListener('click', function() {

	stream.getTracks().forEach(function(track) {
		track.stop();
	  });
}); */


download_img = function(el) {
	// get image URI from canvas object
	var imageURI = canvas.toDataURL("image/jpg");
	el.href = imageURI;
  };
