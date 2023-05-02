import * as THREE from "three";


export default class Floor {
    constructor(_options) {
        this.scene = _options.scene;
        this.resources = _options.resources;
        this.parameter = _options.parameter;

        this.init();
    }

    init() {
        this.setWorldColor();
        this.setLight();
        this.setFog();
    }

    setWorldColor() {
        this.scene.background = new THREE.Color(0x88ccee);
    }

    setLight() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 1)
        this.scene.add(ambientLight)
    }

    setFog() {
        this.scene.fog = new THREE.Fog(0x88ccee, 0, 50);
    }

}