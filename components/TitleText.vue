<template>
    <div ref="container">
        
    </div>
</template>

<script>
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

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
            this.scene.background = new THREE.Color( 0x222222 );
            this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 100000 );
            this.objectLoader = new OBJLoader();
            this.materialLoader = new MTLLoader();

            this.renderer = new THREE.WebGLRenderer();
            this.renderer.setSize( window.innerWidth, window.innerHeight );
            this.renderer.shadowMap.enabled = true;
            this.renderer.shadowMap.type = THREE.BasicShadowMap;
            this.$refs.container.appendChild( this.renderer.domElement );

            // Objects

            this.lights.ambientLight = new THREE.AmbientLight( 0xffffff, .2 );
            this.scene.add( this.lights.ambientLight );

            this.lights.light  = new THREE.PointLight( 0xffffff, 1, 60 );
            this.lights.light.position.set( 0, 15, 10 );
            this.lights.light.castShadow = true;
            this.lights.light.shadow.mapSize.width = 1024;
            this.lights.light.shadow.mapSize.height = 1024;
            this.lights.light.shadow.camera.near = 0.5;
            this.lights.light.shadow.camera.far = 1000;
            this.scene.add( this.lights.light );

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
                        }.bind(this), this.onProgress, this.onError
                    );

                }.bind(this), this.onProgress, this.onError
            );

            this.camera.position.z = 15;

            /*window.onwheel = function (event) {
                if (text) text.rotateY(event.deltaY * 0.001);
            }*/

            // Renders
            this.animate();
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