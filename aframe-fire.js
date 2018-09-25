AFRAME.registerComponent('fire', {

	schema: {type: 'vec4'},

	init() {
		this.c = new THREE.Clock();

		const scene = this.el.sceneEl.object3D;

		VolumetricFire.texturePath = './assets/textures/';

		const p = this.el.getAttribute('position');

		this.fire = new VolumetricFire(
		  this.data.x,
		  this.data.y,
		  this.data.z,
		  this.data.w,
		  this.el.sceneEl.camera
		);

		this.fire.mesh.position.set(p.x, p.y, p.z);

		scene.add(this.fire.mesh);
	},

	tick() {
		const elapsed = this.c.getElapsedTime();
		this.fire.update(elapsed);

		const p = this.el.getAttribute('position');
		this.fire.mesh.position.set(p.x, p.y, p.z);
	}
});
