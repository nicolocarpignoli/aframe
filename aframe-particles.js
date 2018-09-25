AFRAME.registerComponent('particles', {

	init() {
		const scene = this.el.sceneEl.object3D;

		this.t = 0;
		this.c = new THREE.Clock();

		const textureLoader = new THREE.TextureLoader();

		this.particleSystem = new THREE.GPUParticleSystem({
			maxParticles: 250000,
			particleNoiseTex: textureLoader.load('./assets/textures/perlin.png'),
			particleSpriteTex: textureLoader.load('./assets/textures/particle.png')
		});

		scene.add(this.particleSystem);

		this.options = {
			position: new THREE.Vector3(),
			positionRandomness: 3,
			velocity: new THREE.Vector3(),
			velocityRandomness: 0,
			color: 0xDFBB7C,
			colorRandomness: 0,
			turbulence: 0.85,
			lifetime: 7,
			size: 1,
			sizeRandomness: 1.5
		};

		this.spawnerOptions = {
			spawnRate: 30000,
			horizontalSpeed: 1.5,
			verticalSpeed: 1.33,
			timeScale: 1
		};

		// Const gui = new dat.GUI({width: 350});

		// gui.add(this.options, 'velocityRandomness', 0, 3);
		// gui.add(this.options, 'positionRandomness', 0, 3);
		// gui.add(this.options, 'size', 1, 20);
		// gui.add(this.options, 'sizeRandomness', 0, 25);
		// gui.add(this.options, 'colorRandomness', 0, 1);
		// gui.add(this.options, 'lifetime', 0.1, 10);
		// gui.add(this.options, 'turbulence', 0, 1);

		// gui.add(this.spawnerOptions, 'spawnRate', 10, 30000);
		// gui.add(this.spawnerOptions, 'horizontalSpeed', 0, 10);
		// gui.add(this.spawnerOptions, 'verticalSpeed', 0, 10);
		// gui.add(this.spawnerOptions, 'spawnRate', 10, 30000);
		// gui.add(this.spawnerOptions, 'timeScale', -1, 1);
	},

	tick() {
		const delta = this.c.getDelta() * this.spawnerOptions.timeScale;

		this.t += delta;

		if (this.t < 0) {
			this.t = 0;
		}

		if (delta > 0) {
			// This.options.position.x = Math.sin( this.t * this.spawnerOptions.horizontalSpeed ) * 20;
			// this.options.position.y = Math.sin( this.t * this.spawnerOptions.horizontalSpeed ) * 5;
			// this.options.position.z = Math.sin( this.t * this.spawnerOptions.horizontalSpeed + this.spawnerOptions.verticalSpeed ) * 5;

			for (let x = 0; x < this.spawnerOptions.spawnRate * delta; x++) {
				this.particleSystem.spawnParticle(this.options);
			}
		}

		this.particleSystem.update(this.t);
	}
});
