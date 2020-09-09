AFRAME.registerComponent('marker-video-toggle', {
	init: function () {
		var marker = this.el
		let video = document.querySelector('video')
		marker.addEventListener('markerFound', function () {
			video.play()
		})
		marker.addEventListener('markerLost', function () {
			video.pause()
		})
	}
})
