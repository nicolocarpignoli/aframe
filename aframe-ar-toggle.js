AFRAME.registerComponent('ar-toggle', {
	schema: {
		marker: { default: 'a-marker' },
		parent: { default: '#null' }
	},
	init: function() {
		const embedded = this.el.getAttributeNode('embedded')
		const arjs = this.el.getAttributeNode('arjs')

		const sceneAR = document.querySelector(this.data.marker)
		var cloneAR, cloneVR

		window.onclick = () => {
			if (this.el.hasAttribute('embedded')) {
				this.el.removeAttribute('embedded')
				this.el.removeAttribute('arjs')
				cloneAR = sceneAR.cloneNode(true)
				cloneVR = document.createElement('a-entity')
				cloneVR.innerHTML = sceneAR.querySelector(this.data.parent).innerHTML
				sceneAR.insertAdjacentElement('afterend', cloneVR)
				element.parentNode.removeChild(sceneAR)
				document.querySelector('#arjs-video').style.display = 'none'
			} else {
				this.el.setAttributeNode(embedded)
				this.el.setAttributeNode(arjs)
				this.el.appendChild(sceneAR)
				element.parentNode.removeChild(cloneVR)
				document.querySelector('#arjs-video').style.display = 'block'
			}
			state = !state
		}
	}
})
