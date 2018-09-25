AFRAME.registerComponent('lensflare', {

	schema: {type: 'vec3'},

	init() {
		const scene = this.el.sceneEl.object3D;

		const textureLoader = new THREE.TextureLoader();
		const textureFlare1 = textureLoader.load('./assets/textures/flare1.png');
		const textureFlare3 = textureLoader.load('./assets/textures/flare3.png');

		addLight(0.08, 0.8, 0.5, this.data.x, this.data.y, this.data.z);

		function addLight(h, s, l, x, y, z) {
			const light = new THREE.PointLight(0xFFFFFF, 0.1, 6000);
			light.color.setHSL(h, s, l);
			light.position.set(x, y, z);
			scene.add(light);

			const lensflare = new THREE.Lensflare();
			lensflare.addElement(new THREE.LensflareElement(textureFlare1, 700, 0, light.color));
			lensflare.addElement(new THREE.LensflareElement(textureFlare3, 60, 0.6));
			lensflare.addElement(new THREE.LensflareElement(textureFlare3, 70, 0.7));
			lensflare.addElement(new THREE.LensflareElement(textureFlare3, 120, 0.9));
			lensflare.addElement(new THREE.LensflareElement(textureFlare3, 70, 1));
			light.add(lensflare);
		}
	}
});
