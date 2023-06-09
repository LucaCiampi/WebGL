import * as THREE from 'three'

export default class TriggerZone {
    constructor(_options) {
        // Options
        this.debug = _options.debug;
        this.scene = _options.scene;
        this.resources = _options.resources;
        this.name = _options.name;
        this.id = _options.id;
        this.startPosition = _options.startPosition;
        this.endPosition = _options.endPosition;
        this.color = _options.color;
        this.callback = _options.callback;
        this.hasIndicator = _options.hasIndicator;
        this.indicatorYPosition = _options.indicatorYPosition;

        // Set up
        this.boundingBox = null;
        this.boundingBoxHelper = null;

        this.init()
    }

    init() {
        // Box
        this.boundingBox = new THREE.Box2(this.startPosition, this.endPosition);

        if (this.hasIndicator) {
            this.indicator = this.resources.items['crown'].scene.clone();
            const center = new THREE.Vector2();
            this.boundingBox.getCenter(center);
            this.indicator.position.set(center.x, this.indicatorYPosition, center.y);
            this.scene.add(this.indicator);
        }

        if (this.debug.active) {
            if (!this.color) this.color = 0x00ffff;
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
            this.callback?.();
            this.hasIndicator && this.destroyIndicator();
            return true
        }

        return false
    }

    /**
     * Removes the indicator from memory and from the scene
     */
    destroyIndicator() {
        this.indicator.traverse((node) => {
            if (node instanceof THREE.Mesh) {
                node.geometry.dispose();
                // TODO: Disposer les textures ici
                node.material.dispose();
            }
        });

        this.scene.remove(this.indicator);
    }

    /**
    * Adds debug options on GUI
    */
    addDebugOptions() {
        const geometry = new THREE.BoxGeometry(Math.abs(this.boundingBox.max.x - this.boundingBox.min.x), 0.2, Math.abs(this.boundingBox.max.y - this.boundingBox.min.y));
        const material = new THREE.MeshBasicMaterial({ color: 0x00ffff });
        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(this.boundingBox.min.x + (Math.abs(this.boundingBox.max.x - this.boundingBox.min.x) / 2), this.indicatorYPosition || 3, this.boundingBox.min.y + (Math.abs(this.boundingBox.max.y - this.boundingBox.min.y) / 2))

        this.boundingBoxHelper = new THREE.BoxHelper(cube, this.color);

        this.scene.add(this.boundingBoxHelper)
    }
}