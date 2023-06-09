import * as THREE from 'three'
import Room from "../Room";
import TriggerZone from '../TriggerZone'

export default class Room2 extends Room {
    constructor(_options) {
        super(_options)

        this.init();
    }

    init() {
        this.name = "room2";
        this.position = new THREE.Vector3(-7, -1, -19.9);
        // this.position = new THREE.Vector3(-7, -1.2, -19.9);
        this.spawnPosition = new THREE.Vector3(-8, 0, -21);
        this.entranceTriggerZone = new TriggerZone({
            debug: this.debug,
            scene: this.scene,
            startPosition: new THREE.Vector2(-12, -22),
            endPosition: new THREE.Vector2(-7.5, -14),
            color: 0xff0000
        });

        // this.closingDoor.position.set(0, 0, -0.16);
        this.closingDoor.position.set(-0.1, 0.15, 0);
        this.closingDoor.rotation.set(0, 1.57, 0);
        // this.exitDoor.position.set(-8.7, 0, -12.6);
        this.exitDoor.position.set(-8.7, 0.15, -12.48);

        this.minScoreRequired = 4;

        this.triggerZones = [
            // Cellphones
            new TriggerZone({
                debug: this.debug,
                scene: this.scene,
                resources: this.resources,
                name: 'cellphones',
                id: 5,
                startPosition: new THREE.Vector2(-16, -27),
                endPosition: new THREE.Vector2(-13, -24),
                hasIndicator: true,
                indicatorYPosition: 0,
            }),
            // The TV's
            new TriggerZone({
                debug: this.debug,
                scene: this.scene,
                resources: this.resources,
                name: 'tvs',
                id: 6,
                startPosition: new THREE.Vector2(-18, -25),
                endPosition: new THREE.Vector2(-14, -22),
                hasIndicator: true,
                indicatorYPosition: 0,
            }),
            // The tags
            new TriggerZone({
                debug: this.debug,
                scene: this.scene,
                resources: this.resources,
                name: 'tags',
                id: 7,
                startPosition: new THREE.Vector2(-12, -30),
                endPosition: new THREE.Vector2(-8, -28),
                hasIndicator: true,
                indicatorYPosition: 0,
            }),
        ]

        this.setRoomModel();

        this.addExitDoor();

        // Hands
        const hands = this.resources.items['room2Hands'].scene;
        const handsClips = this.resources.items['room2Hands'].animations;
        // hands.position.set(4, 1, 4);
        this.handsClip = THREE.AnimationClip.findByName(handsClips, 'animation_0');
        this.handsAnimationMixer = new THREE.AnimationMixer(hands);
        this.props.push(hands);

        // Props
        // this.props.push(this.resources.items['room2Hands'].scene);
        this.props.push(this.resources.items['room2Props'].scene);

        const tags = this.resources.items['room2Tags'].scene;
        tags.position.set(-4.68, 0, -5.56);
        this.props.push(tags);

        this.additionalEntranceActions = () => { this.initHandsAnimation(); }

        this.addPositionalAudioTrack('vibration', 2, -9, 4, -6);
        this.addPositionalAudioTrack('tvbzz', 2, -10, 4, -1);
        this.addPositionalAudioTrack('radio', 2, -2, 4, -8);

        if (this.debug.active) {
            this.addDebugOptions();
        }
    }

    update() {
        this.handsAnimationMixer.update(0.01);
    }

    /**
     * Sets up the hands animation
     */
    initHandsAnimation() {
        const action = this.handsAnimationMixer.clipAction(this.handsClip);
        action.play();
    }
}