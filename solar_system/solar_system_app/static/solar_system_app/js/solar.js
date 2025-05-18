const loader = new THREE.TextureLoader();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("solar-system-container").appendChild(renderer.domElement);

const starTexture = loader.load("/static/solar_system_app/textures/stars.jpg");
const starGeometry = new THREE.SphereGeometry(100, 32, 32);
const starMaterial = new THREE.MeshBasicMaterial({ map: starTexture, side: THREE.BackSide });
const starField = new THREE.Mesh(starGeometry, starMaterial);
scene.add(starField);

const sunTexture = loader.load("/static/solar_system_app/textures/Sun.jpg");
const sunMaterial = new THREE.MeshStandardMaterial({
  map: sunTexture,
  emissive: 0xffff00,
  emissiveIntensity: 1,
});
const sunGeometry = new THREE.SphereGeometry(1, 32, 32);
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

const planetData = [
  { name: "Mercury", size: 0.2, distance: 4, texture: "Mercury.jpg", orbitSpeed: 0.02, info: "As a planet, it's the smallest and closest to the Sun in our solar system, characterized by a rocky surface, a very thin atmosphere, and extreme temperature variations. As an element, it's a silvery-white, dense, liquid metal at room temperature, known for its toxicity and various applications in thermometers, barometers, and other devices. " },
  { name: "Venus", size: 0.4, distance: 6, texture: "Venus.jpg", orbitSpeed: 0.015, info: "It is a terrestrial planet, meaning it has a rocky surface, similar to Earth. Venus is known for its thick, dense atmosphere, which is primarily composed of carbon dioxide and shrouded in sulfuric acid clouds. This atmosphere creates a strong greenhouse effect, making Venus the hottest planet in our solar system. " },
  { name: "Earth", size: 0.5, distance: 8, texture: "Earth.jpg", orbitSpeed: 0.01, info: "It is a rocky planet with a solid surface, a diverse range of landscapes, and is predominantly covered in water. Earth's atmosphere is composed of nitrogen, oxygen, and other gases, providing the necessary air for life. It orbits the Sun in an elliptical path and rotates on its axis, resulting in day and night. " },
  { name: "Mars", size: 0.4, distance: 11, texture: "Mars.jpg", orbitSpeed: 0.008, info: "Mars is a cold, dusty, and desert-like planet, known as the Red Planet due to the presence of iron oxide (rust) on its surface. It's the fourth planet from the sun, with a very thin atmosphere, making it a hostile environment for humans. Despite its harsh conditions, Mars exhibits features similar to Earth, including seasons, polar ice caps, volcanoes, and canyons. " },
  { name: "Jupiter", size: 0.8, distance: 16, texture: "Jupiter.jpg", orbitSpeed: 0.005, info: "Jupiter is the largest and most massive planet in our solar system, the fifth from the Sun. It's a gas giant, meaning it's primarily composed of hydrogen and helium. Jupiter is famous for its swirling cloud stripes, its prominent Great Red Spot (a large storm that has lasted for centuries), and its faint ring system. It also has a large number of moons, with at least 79 confirmed. " },
  { name: "Saturn", size: 0.7, distance: 20, texture: "Saturn.jpg", orbitSpeed: 0.002, info: "Saturn is the sixth planet from the Sun and the second-largest in our solar system. It's a gas giant, primarily composed of hydrogen and helium, and is famous for its spectacular ring system. Saturn is also known for its rapid rotation and flattened poles. " },
  { name: "Uranus", size: 0.5, distance: 24, texture: "Uranus.jpg", orbitSpeed: 0.0007, info: "Uranus is the seventh planet from the Sun and is a unique ice giant, notable for its blue-green color, tilted axis of rotation, and faint rings. It's primarily composed of water, methane, and ammonia, and its atmosphere is made up of hydrogen and helium with a significant amount of methane, which gives it its blue-green hue. " },
  { name: "Neptune", size: 0.5, distance: 28, texture: "Neptune.jpg", orbitSpeed: 0.00036, info: "Neptune is the eighth and most distant planet from the Sun, characterized as a blue gas giant and one of the two ice giants in our solar system. It's similar to Uranus, sharing a blue hue due to methane in its atmosphere. Neptune is known for its strong, supersonic winds and a dense atmosphere composed of hydrogen, helium, and methane. " }
];

const planets = [];

planetData.forEach(data => {
  const texture = loader.load(`/static/solar_system_app/textures/${data.texture}`);
  const material = new THREE.MeshStandardMaterial({ map: texture });
  const geometry = new THREE.SphereGeometry(data.size, 32, 32);
  const planet = new THREE.Mesh(geometry, material);
  planet.position.x = data.distance;
  scene.add(planet);
  planets.push({ planet: planet, data: data, angle: 0 });
});

// Raycaster setup
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const panel = document.getElementById('planet-info-panel');
const label = document.getElementById('planet-label');

function onMouseClick(event) {
  // Normalize mouse
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Set raycaster
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(planets.map(obj => obj.planet));

  if (intersects.length > 0) {
    const clickedPlanet = intersects[0].object;
    const planetData = planets.find(obj => obj.planet === clickedPlanet).data;

    // Show info panel
    showPlanetInfo(planetData);

    // Show floating label near mouse
    label.textContent = planetData.name;
    label.style.left = `${event.clientX + 10}px`;
    label.style.top = `${event.clientY + 10}px`;
    label.style.display = 'block';
  } else {
    hidePlanetLabel();
    closeInfoPanel();
  }
}

function showPlanetInfo(planetData) {
  document.getElementById('planet-name').textContent = planetData.name;
  document.getElementById('planet-details').textContent = planetData.info;
  panel.style.display = 'block';
}

function closeInfoPanel() {
  panel.style.display = 'none';
}

function hidePlanetLabel() {
  label.style.display = 'none';
}

window.addEventListener('click', onMouseClick);

camera.position.z = 15;

const sunLight = new THREE.PointLight(0xffffff, 2, 100);
sunLight.position.set(0, 0, 0);
scene.add(sunLight);

const controls = new THREE.OrbitControls(camera, renderer.domElement);

function animate() {
  requestAnimationFrame(animate);

  // Orbit motion
  planets.forEach(obj => {
    obj.angle += obj.data.orbitSpeed;
    obj.planet.position.x = obj.data.distance * Math.cos(obj.angle);
    obj.planet.position.z = obj.data.distance * Math.sin(obj.angle);
  });

  controls.update();
  renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
