AFRAME.registerComponent('frame', {
	schema: {
		size: { default: 2 },
		scale: { default: 100 }
	},
	init: function () {
		const self = this
		const SIZE = this.data.size * 0.25
		const SCALE = this.data.scale
		const HALF_PI = Math.PI / 2

		self.el.id = 'frame'
		self.el.object3D.position.set(0, 0.1, 0)
		self.el.object3D.scale.set(1, 1, 1)

		for (let pos of ['top', 'bottom', 'left', 'right']) {
			let plane = document.createElement('a-plane')
			plane.id = pos
			plane.object3D.rotation.set(-HALF_PI, 0, 0)
			plane.setAttribute('occlude', true)
			switch (pos) {
				case 'right':
					plane.object3D.position.set(SIZE + SCALE / 2, 0, 0)
					plane.object3D.scale.set(SCALE, SCALE, 1)
					break
				case 'left':
					plane.object3D.position.set(-(SIZE + SCALE / 2), 0, 0)
					plane.object3D.scale.set(SCALE, SCALE, 1)
					break
				case 'top':
					plane.object3D.position.set(0, 0, -(SIZE + SCALE / 2))
					plane.object3D.scale.set(SCALE * 3, SCALE, 1)
					break
				case 'bottom':
					plane.object3D.position.set(0, 0, SIZE + SCALE / 2)
					plane.object3D.scale.set(SCALE * 3, SCALE, 1)
					break
			}
			self.update()
			self.el.appendChild(plane)
		}
	}
})
