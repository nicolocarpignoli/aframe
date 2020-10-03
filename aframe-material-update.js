AFRAME.registerComponent('material-update', {
  schema: {
    target: { default: null },
    src: { default: null },
    ambient: { default: null, type: 'color' },
    // color: { default: null, type: 'color' },
    color: { default: null, type: 'string' },
    emissive: { default: null, type: 'color' },
    shininess: { type: 'number' },
    specular: { default: null, type: 'color' },
    repeat: { default: '' },
    new: { default: false, type: 'boolean' }
  },
  init() {
    const data = this.data
    this.el.addEventListener('model-loaded', e => {
      const object = e.detail.model
      object.traverse(node => {
        if (node.material !== undefined) {
          // if (node.material.map.encoding !== null){
          // 	node.material.map.encoding = 3000; // https://github.com/mrdoob/three.js/issues/6593, https://github.com/mrdoob/three.js/issues/14419
          // } // https://github.com/aframevr/aframe/issues/3263
        } else {
          node.material = new THREE.StandardMaterial({})
        }
        if (node.name === data.target) {
          if (data.src !== null) {
            const texPath = document.querySelector(data.src).getAttribute('src')
            const tex = new THREE.TextureLoader().load(texPath)
            node.material.map = tex
          }

          // if (data.new) node.material = new THREE.StandardMaterial({})

          if (data.ambient !== null)
            node.material.ambient = new THREE.Color(data.ambient)

          if (data.color !== null)
            node.material.color = new THREE.Color(data.color)

          if (data.emissive !== null)
            node.material.emissive = new THREE.Color(data.emissive)

          if (data.shininess !== null) node.material.shininess = data.shininess

          if (data.specular !== null)
            node.material.specular = new THREE.Color(data.specular)

          if (data.repeat !== '')
            node.material.map.repeat.set(data.repeat, data.repeat)

          node.material.needsUpdate = true
        }
      })
    })
  }
})
