import './style.css'

import * as THREE from 'three'

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'

//scene
const scene = new THREE.Scene()

//camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000)

//renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)

camera.position.setZ(10)

//3d geometry shape addition
const geometry = new THREE.SphereGeometry( 2, 32, 16 )
const material = new THREE.MeshStandardMaterial({color: 0xFF6347, wireframe: true})
const sphere = new THREE.Mesh( geometry, material )

scene.add( sphere )

//light addition
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(3, 3, 3)
const ambientLight = new THREE.AmbientLight(0xffffff) 

scene.add(pointLight, ambientLight)

//add a light helper to see the position of the light
const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50)

scene.add(gridHelper, lightHelper)

const controls = new OrbitControls(camera, renderer.domElement)

function animate() {
  requestAnimationFrame(animate)

  sphere.rotation.x += 0.01
  sphere.rotation.y += 0.005
  sphere.rotation.z += 0.01

  controls.update()

  renderer.render( scene, camera ) 
}

animate()