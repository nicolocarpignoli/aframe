AFRAME.registerComponent('log', {
	init() {
		console.log(this.el.components);
	}
});
