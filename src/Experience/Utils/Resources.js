import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import EventEmitter from "./EventEmitter.js";

export default class Resources extends EventEmitter {
    constructor(sources) {
        super();

        // Options
        this.sources = sources;

        // Setup
        this.items = {};
        this.toLoad = this.sources.length;
        this.loaded = 0;

        this.setLoaders();
        this.startLoading();
    }

    setLoaders() {
        this.loaders = {}
        this.loaders.gltfLoader = new GLTFLoader();
        this.loaders.textureLoader = new THREE.TextureLoader();
        this.loaders.audioLoader = new THREE.AudioLoader();
    }

    startLoading() {
        for (const source of this.sources) {
            if (source.type === 'texture') {
                this.loaders.textureLoader.load(
                    source.path,
                    (file) => {
                        this.sourceLoaded(source, file);
                    }
                )
            }
            else if (source.type === 'gltfModel') {
                this.loaders.gltfLoader.load(
                    source.path,
                    (file) => {
                        // TODO: check if this is the correct 
                        if (file.isMesh) {
                            file.material = material;
                        }
                        this.sourceLoaded(source, file);
                    }
                )
            }
            else if (source.type === 'audio') {
                this.loaders.audioLoader.load(
                    source.path,
                    (file) => {
                        this.sourceLoaded(source, file);
                    });
            }
        }
    }

    sourceLoaded(source, file) {
        this.items[source.name] = file;

        this.loaded++;
        if (this.loaded == this.toLoad) {
            this.trigger('ready');
        }
    }
}