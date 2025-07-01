import { extend } from "@react-three/fiber";
import { Pass } from "postprocessing";
import { FullScreenQuad } from "three-stdlib";
import * as THREE from "three";

const edlShader = {
    uniforms: {
        tDiffuse: { value: null },
        tDepth: { value: null },
        cameraNear: { value: null },
        cameraFar: { value: null },
    },
    vertexShader: `
    varying vec2 vUv;

    void main() {
      vUv = uv;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
    `,
    fragmentShader: `
    #include <packing>
    varying vec2 vUv;
    uniform sampler2D tDiffuse;
    uniform sampler2D tDepth;
    uniform float cameraNear;
    uniform float cameraFar;



    float readDepth( sampler2D depthTexture, vec2 coord ) {
      float fragCoordZ = texture2D( depthTexture, coord ).x;
      float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
      return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );
    }

    void main() {
      vec2 uv = vUv;

      vec4 color = texture2D(tDiffuse, uv);

      float edlStrength = 2.0;

      float depth = readDepth( tDepth, vUv );
      float nLeft = readDepth(tDepth, vUv + vec2(-0.001, 0.0));
      float nRight = readDepth(tDepth, vUv + vec2(0.001, 0.0));
      float nTop = readDepth(tDepth, vUv + vec2(0.0, -0.001));
      float nBottom = readDepth(tDepth, vUv + vec2(0.0, 0.001));

      float response = max(0.0, log2(depth) - log2(nLeft)) + max(0.0, log2(depth) - log2(nRight)) + max(0.0, log2(depth) - log2(nTop)) + max(0.0, log2(depth) - log2(nBottom));
      response = response / 4.0;
      float shade = exp(-response * 300.0 * edlStrength);

      gl_FragColor = vec4(color.rgb * shade, 1.0);
    }
    `,
};

export class EdlPass extends Pass {
    constructor(args) {
        super();

        this.material = new THREE.ShaderMaterial(edlShader);
        this.fsQuad = new FullScreenQuad(this.material);

        this.depthRenderTarget = args.depthRenderTarget;
        this.camera = args.camera;
    }

    dispose() {
        this.material.dispose();
        this.fsQuad.dispose();
    }

    render(renderer, writeBuffer, readBuffer) {
        this.material.uniforms.tDiffuse.value = readBuffer.texture;
        this.material.uniforms.tDepth.value =
            this.depthRenderTarget.depthTexture;
        this.material.uniforms.cameraNear.value = this.camera.near;
        this.material.uniforms.cameraFar.value = this.camera.far;

        if (this.renderToScreen) {
            renderer.setRenderTarget(null);
            this.fsQuad.render(renderer);
        } else {
            renderer.setRenderTarget(writeBuffer);
            if (this.clear) renderer.clear();
            this.fsQuad.render(renderer);
        }
    }
}

extend({ EdlPass });
