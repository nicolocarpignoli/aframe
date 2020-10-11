AFRAME.registerComponent('frame', {
  schema: {
    width: { default: 1 },
    height: { default: 1 },
    scale: { default: 20 },
    frameEl: { default: '#frame', type: "selector" }
  },
  init: function() {
    const WIDTH = this.data.width
    const HEIGHT = this.data.height
    const HALF_WIDTH = WIDTH / 2
    const HALF_HEIGHT = HEIGHT / 2
    const SCALE = this.data.scale
    const HALF_SCALE = SCALE / 2
    const HALF_PI = Math.PI / 2
    const FRAME_EL = this.data.frameEl

    const self = this.el
    self.id = 'frame'

    console.log(FRAME_EL)

    addFrameOccluder()
    if (FRAME_EL !== null) addFrame()

    function addFrameOccluder() {
      console.log("Adding frameOccluder")
      const parts = ['left', 'right', 'top', 'bottom'].map(name => {
        const el = document.createElement('a-plane')
        el.id = name
        el.object3D.rotation.set(-HALF_PI, 0, 0)
        el.object3D.scale.set(SCALE, SCALE, 0)
        self.appendChild(el)
        el.setAttribute('occlude', true)
        return el
      })

      parts[0].object3D.position.set(-(HALF_WIDTH + HALF_SCALE), 0, 0)
      parts[1].object3D.position.set(HALF_WIDTH + HALF_SCALE, 0, 0)
      parts[2].object3D.position.set(0, 0, -(HALF_HEIGHT + HALF_SCALE))
      parts[3].object3D.position.set(0, 0, HALF_HEIGHT + HALF_SCALE)
    }

    function addFrame() {
      console.log("Adding frame")
      const BORDER_SIZE = FRAME_EL.object3D.scale.x
      const DEPTH = FRAME_EL.object3D.scale.z
      const HALF_DEPTH = DEPTH / 2
      const HALF_BORDER = BORDER_SIZE / 2

      FRAME_EL.setAttribute('visible', false)

      const parts = ['left', 'right', 'top', 'bottom'].map(name => {
        const el = FRAME_EL.cloneNode(true)
        el.setAttribute('visible', true)
        el.id = name
        self.appendChild(el)
        return el
      })

      parts[0].object3D.position.set(-(HALF_WIDTH + HALF_BORDER), HALF_DEPTH, 0)
      parts[0].setAttribute('scale', `${BORDER_SIZE}, ${DEPTH}, ${HEIGHT + 2 * BORDER_SIZE}`)

      parts[1].object3D.position.set(HALF_WIDTH + HALF_BORDER, HALF_DEPTH, 0)
      parts[1].setAttribute('scale', `${BORDER_SIZE}, ${DEPTH}, ${HEIGHT + 2 * BORDER_SIZE}`)

      parts[2].object3D.position.set(0, HALF_DEPTH, -(HALF_HEIGHT + HALF_BORDER))
      parts[2].object3D.rotation.set(0, HALF_PI, 0)
      parts[2].setAttribute('scale', `${BORDER_SIZE}, ${DEPTH}, ${WIDTH}`)
      // setAttribute('scale', `${WIDTH}, ${DEPTH}, ${BORDER_SIZE}`)

      parts[3].object3D.position.set(0, HALF_DEPTH, HALF_HEIGHT + HALF_BORDER)
      parts[3].object3D.rotation.set(0, HALF_PI, 0)
      parts[3].setAttribute('scale', `${BORDER_SIZE}, ${DEPTH}, ${WIDTH}`)
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
