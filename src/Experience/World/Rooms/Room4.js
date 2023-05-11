import * as THREE from 'three'
import Room from "../Room";
import TriggerZone from '../TriggerZone'

export default class Room4 extends Room {
    constructor(_options) {
        super(_options)

        this.init();
    }

    init() {
        this.name = "room4";
        this.position = new THREE.Vector3(-14, 0, -4);
        this.spawnPosition = new THREE.Vector3(-14, 0, -4);
        this.entranceTriggerZone = new TriggerZone({
            debug: this.debug,
            scene: this.scene,
            startPosition: new THREE.Vector2(0, -20),
            endPosition: new THREE.Vector2(10, -7),
        });
        
        this.setRoomModel();

        this.addPropsToScene();
    }

    update() {
        console.log('update room 4')
    }
}