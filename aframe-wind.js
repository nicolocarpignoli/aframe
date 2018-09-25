const vertexShader = `
varying vec2 vUv;

void main() {
vUv = uv;
gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
varying vec2 vUv;

uniform float uTime;

void main() {
float len = 0.15;
float falloff = 0.1;
float p = mod(uTime * 0.25, 1.0);
float alpha = smoothstep(len, len - falloff, abs(vUv.x - p));
float width = smoothstep(len * 2.0, 0.0, abs(vUv.x - p)) * 0.5;
alpha *= smoothstep(width, width - 0.3, abs(vUv.y - 0.5));

alpha *= smoothstep(0.5, 0.3, abs(p - 0.5) * (1.0 + len));

gl_FragColor.rgb = vec3(1.0);
gl_FragColor.a = alpha;
//        gl_FragColor.a += 0.1;
}
`;

AFRAME.registerComponent('wind', {
	init() {
		this.c = new THREE.Clock();
		this.scene = this.el.sceneEl.object3D;
		this.shaders = [];

		this.initGeometry();
		for (let i = 0; i < 6; i++) {
			this.initMesh();
		}
	},

	initGeometry() {
		const points = this.createSpiral();

		const geometry = new THREE.BufferGeometry();

		geometry.addAttribute('position', new THREE.BufferAttribute(new Float32Array(points.length * 3 * 2), 3));
		geometry.addAttribute('uv', new THREE.BufferAttribute(new Float32Array(points.length * 2 * 2), 2));
		geometry.setIndex(new THREE.BufferAttribute(new Uint16Array(points.length * 6), 1));

		points.forEach((b, i) => {
		    const o = 0.1;

		    geometry.attributes.position.setXYZ(i * 2 + 0, b.x, b.y + o, b.z);
		    geometry.attributes.position.setXYZ(i * 2 + 1, b.x, b.y - o, b.z);

		    geometry.attributes.uv.setXY(i * 2 + 0, i / (points.length - 1), 0);
		    geometry.attributes.uv.setXY(i * 2 + 1, i / (points.length - 1), 1);

		    if (i < points.length - 1) {
		        geometry.index.setX(i * 6 + 0, i * 2);
		        geometry.index.setX(i * 6 + 1, i * 2 + 1);
		        geometry.index.setX(i * 6 + 2, i * 2 + 2);

		        geometry.index.setX(i * 6 + 0 + 3, i * 2 + 1);
		        geometry.index.setX(i * 6 + 1 + 3, i * 2 + 3);
		        geometry.index.setX(i * 6 + 2 + 3, i * 2 + 2);
		    }
		});

		this.geometry = geometry;
	},

	initMesh() {
		const uniforms = {
			uTime: {type: 'f', value: Math.random() * 3}
		};

		const shader = new THREE.ShaderMaterial({
			uniforms,
			vertexShader,
			fragmentShader,
			side: THREE.DoubleSide,
			transparent: true,
			depthTest: false
		});
		shader.speed = Math.random() * 0.4 + 0.8;

		this.shaders.push(shader);

		const mesh = new THREE.Mesh(this.geometry, shader);
		mesh.rotation.y = Math.random() * 10;
		mesh.scale.setScalar(2.5 + Math.random());
		mesh.scale.y = Math.random() * 5.2 + 0.9;
		mesh.position.y = Math.random();

		this.scene.add(mesh);
	},

	createSpiral() {
		const points = [];
		let r = 8;
		let a = 0;
		for (let i = 0; i < 120; i++) {
			const p = (1 - i / 120);
			r -= Math.pow(p, 2) * 0.187;
			a += 0.3 - (r / 6) * 0.2;

			points.push(new THREE.Vector3(
				r * Math.sin(a),
				Math.pow(p, 2.5) * 2,
				r * Math.cos(a)
			));
		}
		return points;
	},

	tick() {
		const delta = this.c.getDelta();
		this.shaders.forEach(shader => {
			shader.uniforms.uTime.value += delta * shader.speed;
		});
	}
});
