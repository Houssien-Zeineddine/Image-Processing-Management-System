import './style.css'

import * as THREE from 'three'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)

camera.position.setZ(70)

const geometry = new THREE.SphereGeometry( 15, 32, 16 )
const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } )
const sphere = new THREE.Mesh( geometry, material )

scene.add( sphere )

function animate() {
  requestAnimationFrame(animate)

  sphere.rotation.x += 0.01
  sphere.rotation.y += 0.005
  sphere.rotation.z += 0.01

  renderer.render( scene, camera ) 
}

animate()