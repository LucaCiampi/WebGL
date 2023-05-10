import * as THREE from 'three'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

export default class TriggerZone {
    constructor(_options) {
        // Options
        this.debug = _options.debug;
        this.scene = _options.scene;
        this.name = _options.name;
        this.startPosition = _options.startPosition;
        this.endPosition = _options.endPosition;
        this.zoneEvent = _options.zoneEvent;
        this.actions = _options.actions;

        // Set up
        this.isIn = false;
        this.boundingBox = null;
        this.boundingBoxHelper = null;
        this.boundingBoxHelperVisible = false;

        this.init()
    }

    init() {
        // Box
        this.boundingBox = new THREE.Box2(this.startPosition, this.endPosition);

        if (this.debug.active) {
            this.addDebugOptions();
        }
    }

    /**
     * Checks if the player is in the delimited zone
     * @param {THREE.Vector2} playerPosition - player's coordinates
     * @returns {boolean} True if the player has stepped in the zone
     */
    hasPlayerInZone(playerPosition) {
        if (this.boundingBox.containsPoint(new THREE.Vector2(playerPosition.x, playerPosition.z))) {
            return true
        }

        return false
    }

    /**
    * Adds debug options on GUI
    */
    addDebugOptions() {
        const geometry = new THREE.BoxGeometry(Math.abs(this.boundingBox.max.x - this.boundingBox.min.x), 0.2, Math.abs(this.boundingBox.max.y - this.boundingBox.min.y));
        const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(this.boundingBox.min.x + (Math.abs(this.boundingBox.max.x - this.boundingBox.min.x) / 2), 0, this.boundingBox.min.y + (Math.abs(this.boundingBox.max.y - this.boundingBox.min.y) / 2))

        this.boundingBoxHelper = new THREE.BoxHelper(cube, 0xff0000);

        this.scene.add(this.boundingBoxHelper)
    }
}