AFRAME.registerComponent('frame', {
	schema: {
		size: { default: 3 }
	},
	init: function () {
		const self = this
		const SIZE = this.data.size
		const HALF_PI = Math.PI / 2

		self.el.id = 'frame'

		for (let pos of ['top', 'bottom', 'left', 'right']) {
			let plane = document.createElement('a-plane')
			plane.id = pos
			plane.object3D.rotation.set(-HALF_PI, 0, 0)
			plane.setAttribute('occlude', true)
			switch (pos) {
				case 'top':
					plane.object3D.position.set(-SIZE, 0, 0)
					plane.object3D.scale.set(SIZE, SIZE, 1)
					break
				case 'bottom':
					plane.object3D.position.set(SIZE, 0, 0)
					plane.object3D.scale.set(SIZE, SIZE, 1)
					break
				case 'left':
					plane.object3D.position.set(0, 0, -SIZE)
					plane.object3D.scale.set(SIZE * 3, SIZE, 1)
					break
				case 'right':
					plane.object3D.position.set(0, 0, SIZE)
					plane.object3D.scale.set(SIZE * 3, SIZE, 1)
					break
			}
			self.update()
			self.el.appendChild(plane)
		}
	}
})
