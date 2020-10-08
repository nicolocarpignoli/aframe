AFRAME.registerComponent('frame', {
  schema: {
    width: { default: 1 },
    height: { default: 1 },
    scale: { default: 10 },
    borderSize: { default: 0 }
  },
  init: function() {
    const WIDTH = this.data.width
    const HEIGHT = this.data.height
    const DEPTH = 0.1
    const HALF_WIDTH = WIDTH / 2
    const HALF_HEIGHT = HEIGHT / 2
    const HALF_DEPTH = DEPTH / 2
    const SCALE = this.data.scale
    const HALF_SCALE = SCALE / 2
    const HALF_PI = Math.PI / 2
    const BORDER_SIZE = this.data.borderSize
    const HALF_BORDER = BORDER_SIZE / 2

    const PARTS = ['right', 'left', 'top', 'bottom']

    const self = this.el

    self.id = 'frame'
    self.object3D.position.set(0, 0, 0)
    self.object3D.scale.set(1, 1, 1)

    addFrameOccluder()
    if (BORDER_SIZE > 0) addFrame()

    this.update()

    function addFrameOccluder() {
      const parts = ['left', 'right', 'top', 'bottom'].map(name => {
        const el = document.createElement('a-plane')
        el.id = name
        el.setAttribute('occlude', true)
        el.object3D.rotation.set(HALF_PI, 0, 0)
        el.object3D.scale.set(SCALE, SCALE, 0)
        self.appendChild(el)
        return el
      })

      parts[0].object3D.position.set(HALF_WIDTH + HALF_SCALE, 0, 0)
      parts[1].object3D.position.set(-(HALF_WIDTH + HALF_SCALE), 0, 0)
      parts[2].object3D.position.set(0, 0, -(HALF_HEIGHT + HALF_SCALE))
      parts[3].object3D.position.set(0, 0, HALF_HEIGHT + HALF_SCALE)
    }

    function addFrame() {
      const parts = ['left', 'right', 'top', 'bottom'].map(name => {
        const el = document.createElement('a-box')
        el.setAttribute('color', 'black')
        el.id = name
        self.appendChild(el)
        return el
      })

      parts[0].object3D.position.set(HALF_WIDTH - HALF_BORDER, -HALF_DEPTH, 0)
      parts[0].object3D.scale.set(BORDER_SIZE, DEPTH, HEIGHT)

      parts[1].object3D.position.set(-(HALF_WIDTH - HALF_BORDER), -HALF_DEPTH, 0)
      parts[1].object3D.scale.set(BORDER_SIZE, DEPTH, HEIGHT)

      parts[2].object3D.position.set(0, -HALF_DEPTH, -(HALF_HEIGHT - HALF_BORDER))
      parts[2].object3D.scale.set(WIDTH, DEPTH, BORDER_SIZE)

      parts[3].object3D.position.set(0, -HALF_DEPTH, HALF_HEIGHT - HALF_BORDER)
      parts[3].object3D.scale.set(WIDTH, DEPTH, BORDER_SIZE)
    }
  }
})

AFRAME.registerComponent('occlude', {
  init: function() {
    var el = this.el
    var mesh = el.getObject3D('mesh')
    var material = new THREE.MeshBasicMaterial({
      colorWrite: false
    })
    mesh.material = material
  }
})
