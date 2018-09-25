AFRAME.registerComponent('only-desktop', {
	init() {
		const isDesktop = !AFRAME.utils.device.checkHeadsetConnected();
		console.log('isDesktop:', isDesktop);
		if (isDesktop === false) {
			this.el.parentNode.removeChild(this.el);
		}
	}
});

AFRAME.registerComponent('only-mobile', {
	init() {
		const isMobile = AFRAME.utils.device.isMobile();
		console.log('isMobile:', isMobile);
		if (isMobile === false) {
			this.el.parentNode.removeChild(this.el);
		}
	}
});

AFRAME.registerComponent('only-vr', {
	init() {
		const isVR = AFRAME.utils.device.checkHeadsetConnected();
		console.log('isVR:', isVR);
		if (isVR === false) {
			this.el.parentNode.removeChild(this.el);
		}
	}
});

AFRAME.registerComponent('log', {
	init() {
		console.log(this.el.components);
	}
});
