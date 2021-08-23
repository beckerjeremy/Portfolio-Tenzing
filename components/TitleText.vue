<template>
    <div ref="container">
        
    </div>
</template>

<script>
import * as THREE from 'three';

export default {
    data: function () {
        return {
            lights: {},
            objects: {},
        }
    },

    mounted() {
        this.setup();
    },

    methods: {

        setup: function () {

            this.scene = new THREE.Scene();
            this.scene.background = new THREE.Color( 0x111111 );
            this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 100000 );
            this.objectLoader = new (require('three/examples/jsm/loaders/OBJLoader')).OBJLoader();
            this.materialLoader = new (require('three/examples/jsm/loaders/MTLLoader')).MTLLoader();

            console.log(this.objectLoader)

            this.renderer = new THREE.WebGLRenderer();
            this.renderer.setSize( window.innerWidth, window.innerHeight );
            this.renderer.shadowMap.enabled = true;
            this.renderer.shadowMap.type = THREE.BasicShadowMap;
            this.$refs.container.appendChild( this.renderer.domElement );

            // Objects

            this.lights.ambientLight = new THREE.AmbientLight( 0xffffff, .2 );
            this.scene.add( this.lights.ambientLight );

            this.objects.container = new THREE.Group();
            this.scene.add( this.objects.container );

            this.materialLoader.load('/text.mtl', 
                function ( materials ) {
                    materials.preload();

                    this.objectLoader.setMaterials( materials )
                    this.objectLoader.load(
                        '/text.obj',
                        function ( object ) {
                            console.log(object)

                            /*var objBbox = new THREE.Box3().setFromObject(object);
                            var bboxCenter = objBbox.getCenter().clone();
                            bboxCenter.multiplyScalar(-1);

                            object.traverse(function (child) {
                                if (child instanceof THREE.Mesh) {
                                    child.geometry.translate(bboxCenter.x, bboxCenter.y, bboxCenter.z);
                                }
                            });
                
                            objBbox.setFromObject(object);*/
                            object.position.set(-6, 0, 0);
                            object.translateX(6);
                            object.translateZ(2);
                            this.scene.add( object );

                            this.objects.text = object;
                            this.addLights();
                        }.bind(this), this.onProgress, this.onError
                    );

                }.bind(this), this.onProgress, this.onError
            );

            this.camera.position.z = 15;

            // Renders
            this.animate();
        },

        addLights: function () {
            this.lights.directionalRed = new THREE.DirectionalLight( 0xff00ff, 1, 100 );
            this.lights.directionalRed.position.set(-10, 15, 0);
            this.lights.directionalRed.castShadow = true;
            this.lights.directionalRed.target = this.objects.text;
            this.scene.add( this.lights.directionalRed );

            this.lights.directionalBlue = new THREE.DirectionalLight( 0x0000ff, 1, 100 );
            this.lights.directionalBlue.position.set(10, 15, 0);
            this.lights.directionalBlue.castShadow = true;
            this.lights.directionalBlue.target = this.objects.text;
            this.scene.add( this.lights.directionalBlue );
        },

        animate: function () {
            requestAnimationFrame( this.animate );

            if (this.objects.text) this.objects.text.rotateY(0.0015);

            this.renderer.render( this.scene, this.camera );
        },

        onError: function ( error ) {
            console.log( error );
        },

        onProgress: function ( xhr ) {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        }

    }
}
</script>