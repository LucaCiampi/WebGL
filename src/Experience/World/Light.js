import * as THREE from "three";
import { RectAreaLightUniformsLib } from 'three/addons/lights/RectAreaLightUniformsLib.js';
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';

export default class Light {
    constructor(_options) {
        this.scene = _options.scene;
        this.debug = _options.debug;
        this.resources = _options.resources;
        this.parameter = _options.parameter;
        this.camera = _options.camera;

        this.init();
    }

    init() {
        this.ambientLight = null;
        this.spotLight = null;
        this.rectLight = null;

        this.setWorldColor();
        this.setLight();
        this.setFog();

        if (this.debug.active) {
            this.addDebugOptions();
        }
    }

    setWorldColor() {
        this.scene.background = new THREE.Color(0x000000);
    }

    setLight() {
        RectAreaLightUniformsLib.init();

        this.ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
        
        this.rectLight = new THREE.RectAreaLight(0xffffff, 25, 0.09, 0.16);
        this.rectLight.position.set(1, 1, -0.7);
        this.rectLight.rotateY(-Math.PI / 2)
        
        this.spotLight = new THREE.SpotLight(0xffffff, 1.4)
        this.spotLight.angle = 0.5;
        this.spotLight.penumbra = 0.3;
        this.spotLight.decay = 11;
        this.spotLight.distance = 50;
        this.spotLight.position.y += 1
        this.spotLight.position.set(0, 0, 1);
        this.spotLight.target = this.camera.instance;

        this.scene.add(this.rectLight);
        this.scene.add(this.ambientLight)
        this.camera.instance.add(this.spotLight)
    }

    setFog() {
        this.scene.fog = new THREE.Fog(0xffdccc, 0, 13);
    }

    /**
   * Adds debug options on GUI
   */
    addDebugOptions() {
        const ambientFolder = this.debug.gui.addFolder('Ambient Light');
        ambientFolder.add(this.ambientLight, 'intensity');
        
        const spotLightFolder = this.debug.gui.addFolder('Spotlight');
        spotLightFolder.add(this.spotLight, 'intensity');
        spotLightFolder.add(this.spotLight, 'angle');
        spotLightFolder.add(this.spotLight, 'penumbra');
        spotLightFolder.add(this.spotLight, 'decay');
        spotLightFolder.add(this.spotLight, 'distance');
        
        const fogFolder = this.debug.gui.addFolder('Fog');
        fogFolder.add(this.scene.fog, 'far');
        
        this.scene.fog.far = 100;
        // this.ambientLight.intensity = 1;
        // this.spotLight.intensity = 0;
    }

}