/**
 * Three.js 3D WebGL Canvas Engine for Adarsh Gokhe Portfolio
 * Features:
 * - Dynamic 3D Cyber Particle Sphere with morphing geometry
 * - Deep Space Particle Starfield with mouse parallax physics
 * - Click wave ripple effect & scroll-based camera acceleration
 * - High-DPI support and performance tab throttling
 */

(function init3DScene() {
    const canvas = document.getElementById('bg3dCanvas');
    if (!canvas || typeof THREE === 'undefined') return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x06080d, 0.0018);

    const camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 85;

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Groups
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // ==========================================
    // 1. Interactive 3D Cyber Particle Sphere
    // ==========================================
    const sphereRadius = 24;
    const sphereSegments = 45;
    const sphereGeo = new THREE.SphereGeometry(sphereRadius, sphereSegments, sphereSegments);
    
    // Custom vertex shader-like color variance
    const particleCount = sphereGeo.attributes.position.count;
    const colors = new Float32Array(particleCount * 3);
    const colorCyan = new THREE.Color(0x00f5d4);
    const colorViolet = new THREE.Color(0x7b2cbf);
    const colorEmerald = new THREE.Color(0x10b981);

    for (let i = 0; i < particleCount; i++) {
        const ratio = Math.random();
        let c;
        if (ratio < 0.6) {
            c = colorCyan.clone().lerp(colorViolet, Math.random());
        } else {
            c = colorViolet.clone().lerp(colorEmerald, Math.random() * 0.5);
        }
        colors[i * 3] = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;
    }
    sphereGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Points Material
    const pointsMat = new THREE.PointsMaterial({
        size: 1.1,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending
    });
    const particleSphere = new THREE.Points(sphereGeo, pointsMat);
    mainGroup.add(particleSphere);

    // Inner Geodesic Wireframe
    const innerIcosaGeo = new THREE.IcosahedronGeometry(17, 1);
    const innerWireMat = new THREE.MeshBasicMaterial({
        color: 0x00f5d4,
        wireframe: true,
        transparent: true,
        opacity: 0.15,
        blending: THREE.AdditiveBlending
    });
    const innerCore = new THREE.Mesh(innerIcosaGeo, innerWireMat);
    mainGroup.add(innerCore);

    // Outer Gyroscope Rings
    const ringGeo1 = new THREE.TorusGeometry(32, 0.15, 8, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({
        color: 0x7b2cbf,
        transparent: true,
        opacity: 0.25,
        blending: THREE.AdditiveBlending
    });
    const gyroRing1 = new THREE.Mesh(ringGeo1, ringMat1);
    gyroRing1.rotation.x = Math.PI / 3;
    mainGroup.add(gyroRing1);

    const ringGeo2 = new THREE.TorusGeometry(38, 0.1, 8, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({
        color: 0x00f5d4,
        transparent: true,
        opacity: 0.18,
        blending: THREE.AdditiveBlending
    });
    const gyroRing2 = new THREE.Mesh(ringGeo2, ringMat2);
    gyroRing2.rotation.y = Math.PI / 4;
    mainGroup.add(gyroRing2);

    // ==========================================
    // 2. Ambient Deep-Space Starfield
    // ==========================================
    const starsCount = 1000;
    const starsGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starsCount * 3);

    for (let i = 0; i < starsCount * 3; i += 3) {
        starPositions[i] = (Math.random() - 0.5) * 350;
        starPositions[i + 1] = (Math.random() - 0.5) * 350;
        starPositions[i + 2] = (Math.random() - 0.5) * 300 - 40;
    }
    starsGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));

    const starsMat = new THREE.PointsMaterial({
        size: 0.9,
        color: 0xffffff,
        transparent: true,
        opacity: 0.45,
        blending: THREE.AdditiveBlending
    });
    const starField = new THREE.Points(starsGeo, starsMat);
    scene.add(starField);

    // ==========================================
    // 3. Mouse & Inertia Parallax
    // ==========================================
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let scrollY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    window.addEventListener('scroll', () => {
        scrollY = window.scrollY;
    }, { passive: true });

    // Interactive Pulse on Click
    let pulseWave = 0;
    window.addEventListener('click', () => {
        pulseWave = 1.0;
    });

    // Window Resize Handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // ==========================================
    // 4. Animation Loop
    // ==========================================
    let isTabActive = true;
    document.addEventListener('visibilitychange', () => {
        isTabActive = !document.hidden;
    });

    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        if (!isTabActive) return;

        const elapsedTime = clock.getElapsedTime();

        // Smooth Mouse Parallax Damping
        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;

        // Base Rotations
        particleSphere.rotation.y = elapsedTime * 0.12;
        particleSphere.rotation.x = elapsedTime * 0.06;

        innerCore.rotation.y = -elapsedTime * 0.18;
        innerCore.rotation.z = elapsedTime * 0.09;

        gyroRing1.rotation.z = elapsedTime * 0.15;
        gyroRing2.rotation.x = -elapsedTime * 0.1;

        starField.rotation.y = elapsedTime * 0.015;

        // Mouse Parallax Offset
        mainGroup.rotation.y = targetX * 0.35;
        mainGroup.rotation.x = -targetY * 0.35;

        // Scroll Influence
        mainGroup.position.y = -scrollY * 0.035;
        mainGroup.position.z = Math.sin(scrollY * 0.002) * 10;

        // Pulse decay
        if (pulseWave > 0.01) {
            pulseWave *= 0.92;
            particleSphere.scale.setScalar(1 + pulseWave * 0.12);
        } else {
            particleSphere.scale.setScalar(1);
        }

        renderer.render(scene, camera);
    }

    animate();
})();
