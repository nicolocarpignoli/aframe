AFRAME.registerComponent('fbx-material', {
	schema: {
		src: {default: '', type: 'map'},
		ambientOcclusionMap: {default: '', type: 'map'},
		displacementMap: {default: '', type: 'map'},
		envMap: {default: '', type: 'map'},
		metalnessMap: {default: '', type: 'map'},
		normalMap: {default: '', type: 'map'},
		roughnessMap: {default: '', type: 'map'},
		specularMap: {default: '', type: 'map'},
		sphericalEnvMap: {default: '', type: 'map'},
	},
	init() {
		const data = this.data;
		const src = (data.src) ? data.src.getAttribute('src') : '';
		const ambientOcclusionMap = (data.ambientOcclusionMap) ? data.ambientOcclusionMap.getAttribute('src') : '';
		const displacementMap = (data.displacementMap) ? data.displacementMap.getAttribute('src') : '';
		const envMap = (data.envMap) ? data.envMap.getAttribute('src') : '';
		const metalnessMap = (data.metalnessMap) ? data.metalnessMap.getAttribute('src') : '';
		const normalMap = (data.normalMap) ? data.normalMap.getAttribute('src') : '';
		const roughnessMap = (data.roughnessMap) ? data.roughnessMap.getAttribute('src') : '';
		const specularMap = (data.specularMap) ? data.specularMap.getAttribute('src') : '';
		const sphericalEnvMap = (data.sphericalEnvMap) ? data.sphericalEnvMap.getAttribute('src') : '';
		this.el.addEventListener('model-loaded', e => {
			const object = e.detail.model;
			object.traverse(node => {
				if (node.isMesh) {
					node.material.needsUpdate = true;
					node.material.map = new THREE.TextureLoader().load(src);
					node.material.ambientOcclusionMap = new THREE.TextureLoader().load(ambientOcclusionMap);
					node.material.displacementMap = new THREE.TextureLoader().load(displacementMap);
					node.material.envMap = new THREE.TextureLoader().load(envMap);
					node.material.metalnessMap = new THREE.TextureLoader().load(metalnessMap);
					node.material.normalMap = new THREE.TextureLoader().load(normalMap);
					node.material.roughnessMap = new THREE.TextureLoader().load(roughnessMap);
					node.material.specularMap = new THREE.TextureLoader().load(specularMap);
					node.material.sphericalEnvMap = new THREE.TextureLoader().load(sphericalEnvMap);
				}
			});
		});
	}
});
