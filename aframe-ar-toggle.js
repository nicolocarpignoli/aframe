AFRAME.registerComponent('ar-toggle', {
  schema: {
    marker: { default: 'a-marker' },
    parent: { default: 'a-marker' }
  },
  init: function() {
    const embedded = this.el.getAttributeNode('embedded')
    const arjs = this.el.getAttributeNode('arjs')
    const marker = document.querySelector(this.data.marker)
    const parent = document.querySelector(this.data.parent)
    const cloneVR = document.createElement('a-entity')
    cloneVR.innerHTML = parent.innerHTML
    cloneVR.setAttribute('visible', false)
    cloneVR.id = 'clone-vr'
    this.el.appendChild(cloneVR)
    window.ondblclick = () => {
      if (this.el.hasAttribute('arjs')) {
        marker.setAttribute('visible', false)
        cloneVR.setAttribute('visible', true)
        this.el.removeAttribute('embedded')
        this.el.removeAttribute('arjs')
        document.querySelector('#arjs-video').style.display = 'none'
      } else {
        this.el.setAttributeNode(embedded)
        this.el.setAttributeNode(arjs)
        marker.setAttribute('visible', true)
        cloneVR.setAttribute('visible', false)
        document.querySelector('#arjs-video').style.display = 'block'
      }
    }
  }
})
