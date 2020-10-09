AFRAME.registerComponent('frame', {
  schema: {
    width: { default: 1 },
    height: { default: 1 },
    scale: { default: 20 },
    frameEl: { default: '' }
  },
  init: function() {
    const WIDTH = this.data.width
    const HEIGHT = this.data.height
    const DEPTH = 0.05
    const HALF_WIDTH = WIDTH / 2
    const HALF_HEIGHT = HEIGHT / 2
    const HALF_DEPTH = DEPTH / 2
    const SCALE = this.data.scale
    const HALF_SCALE = SCALE / 2
    const HALF_PI = Math.PI / 2
    const FRAME_EL = document.querySelector(this.data.frameEl)

    const self = this.el
    self.id = 'frame'

    addFrameOccluder()
    addFrame()

    function addFrameOccluder() {
      const parts = ['left', 'right', 'top', 'bottom'].map(name => {
        const el = document.createElement('a-plane')
        el.id = name
        el.object3D.rotation.set(-HALF_PI, 0, 0)
        el.object3D.scale.set(SCALE, SCALE, 0)
        self.appendChild(el)
        el.setAttribute('occlude', true)
        return el
      })

      parts[0].object3D.position.set(HALF_WIDTH + HALF_SCALE, 0, 0)
      parts[1].object3D.position.set(-(HALF_WIDTH + HALF_SCALE), 0, 0)
      parts[2].object3D.position.set(0, 0, -(HALF_HEIGHT + HALF_SCALE))
      parts[3].object3D.position.set(0, 0, HALF_HEIGHT + HALF_SCALE)
    }

    function addFrame() {
      const BORDER_SIZE = FRAME_EL ? FRAME_EL.object3D.scale.x : 0.1
      const HALF_BORDER = BORDER_SIZE / 2
      if (FRAME_EL) FRAME_EL.parentNode.removeChild(FRAME_EL)
      const parts = ['left', 'right', 'top', 'bottom'].map(name => {
        const el = FRAME_EL ? FRAME_EL.cloneNode(true) : document.createElement('a-box')
        el.id = name
        self.appendChild(el)
        return el
      })

      parts[0].object3D.position.set(HALF_WIDTH - HALF_BORDER, -HALF_DEPTH, 0)
      parts[0].setAttribute('scale', `${BORDER_SIZE}, ${DEPTH}, ${HEIGHT - 2 * BORDER_SIZE}`)

      parts[1].object3D.position.set(-(HALF_WIDTH - HALF_BORDER), -HALF_DEPTH, 0)
      parts[1].setAttribute('scale', `${BORDER_SIZE}, ${DEPTH}, ${HEIGHT - 2 * BORDER_SIZE}`)

      parts[2].object3D.position.set(0, -HALF_DEPTH, -(HALF_HEIGHT - HALF_BORDER))
      parts[2].setAttribute('scale', `${WIDTH}, ${DEPTH}, ${BORDER_SIZE}`)

      parts[3].object3D.position.set(0, -HALF_DEPTH, HALF_HEIGHT - HALF_BORDER)
      parts[3].setAttribute('scale', `${WIDTH}, ${DEPTH}, ${BORDER_SIZE}`)
    }

    this.update()
  }
})

AFRAME.registerComponent('occlude', {
  init: function() {
    var el = this.el
    var mesh = el.getObject3D('mesh')
    var material = new THREE.MeshBasicMaterial({
      colorWrite: false
      //transparent: true,
      //opacity: 0.5,
      //side: THREE.BackSide
    })
    mesh.material = material
  }
})
