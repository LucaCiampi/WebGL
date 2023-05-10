import * as THREE from 'three'
import Room from "../Room";

export default class Room1 extends Room {
    constructor(_options) {
        super(_options)

        this.init();
    }

    init() {
        console.log('init room1')

        console.log(this.props)

        const geometry = new THREE.BoxGeometry(10, 10, 10);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(2, 2, -2)
        // this.props.add(cube)
        this.props = cube
    }
}