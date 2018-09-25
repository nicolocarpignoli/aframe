AFRAME.registerComponent('fbx-material', {
	schema: {
		src: {default: ''},
		normal: {default: ''},
		roughness: {default: ''},
		repeat: {default: ''},
	},
	init() {
		const data = this.data;
		const basePath = (data.src) ? document.querySelector(data.src).getAttribute('src') : '';
		const normalPath = (data.normal) ? document.querySelector(data.normal).getAttribute('src') : '';
		const roughnessPath = (data.roughness) ? document.querySelector(data.roughness).getAttribute('src') : '';
		this.el.addEventListener('model-loaded', e => {
			const object = e.detail.model;
			object.traverse(node => {
				if (node.isMesh) {
					node.material.needsUpdate = true;
					node.material.map = new THREE.TextureLoader().load(basePath);
					node.material.normalMap = new THREE.TextureLoader().load(normalPath);
					node.material.roughnessMap = new THREE.TextureLoader().load(roughnessPath);
					setTimeout(()=>{
						node.material.map.repeat.set( data.repeat, data.repeat );
						node.material.normalMap.repeat.set( data.repeat, data.repeat );
						console.log(node.material.map);
					},1000);
				}
			});
		});
	}
});
