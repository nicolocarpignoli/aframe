AFRAME.registerComponent('occlude', {
	init: function () {
		var el = this.el
		var mesh = el.getObject3D('mesh')
		var material = new THREE.MeshBasicMaterial({
			colorWrite: false
		})
		mesh.material = material
	}
})
