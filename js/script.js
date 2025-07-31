
document.addEventListener("DOMContentLoaded", () => {
  const restaurants = [
    { name: "La Taberna del Chef", lat: 40.416775, lng: -3.703790, employees: 15, cuisine: "Española", sector: "Centro" },
    { name: "Pizzería Bella Roma", lat: 40.420000, lng: -3.680000, employees: 10, cuisine: "Italiana", sector: "Salamanca" },
    { name: "Sushi Express", lat: 40.405000, lng: -3.715000, employees: 8, cuisine: "Japonesa", sector: "La Latina" },
    { name: "El Jardín Vegano", lat: 40.430000, lng: -3.690000, employees: 12, cuisine: "Vegana", sector: "Chueca" },
    { name: "Cafetería Amanecer", lat: 40.410000, lng: -3.700000, employees: 7, cuisine: "Cafetería", sector: "Centro" }
  ];

  const sectorColors = {
    "Centro": "#4EB2FF",
    "Salamanca": "#6A35F5",
    "La Latina": "#FFC107",
    "Chueca": "#DC3545"
  };

  // Mapa
  const map = L.map('map').setView([40.4168, -3.7038], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap',
    maxZoom: 19
  }).addTo(map);
  setTimeout(() => { map.invalidateSize(); }, 500);

  restaurants.forEach(r => {
    L.circleMarker([r.lat, r.lng], {
      radius: 8,
      fillColor: sectorColors[r.sector],
      color: "#000",
      weight: 1,
      fillOpacity: 0.8
    }).addTo(map).bindPopup(`<strong>${r.name}</strong><br>Empleados: ${r.employees}<br>${r.cuisine}`);
  });

  // Tabla de restaurantes
  const tableBody = document.getElementById("restaurant-list");
  restaurants.forEach(r => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="py-2 px-4">${r.name}</td>
      <td class="py-2 px-4">${r.employees}</td>
      <td class="py-2 px-4">${r.cuisine}</td>
      <td class="py-2 px-4">${r.sector}</td>
    `;
    tableBody.appendChild(row);
  });

  // Datos para gráficos
  const sectorCounts = {};
  const cuisineCounts = {};
  restaurants.forEach(r => {
    sectorCounts[r.sector] = (sectorCounts[r.sector] || 0) + 1;
    cuisineCounts[r.cuisine] = (cuisineCounts[r.cuisine] || 0) + 1;
  });

  // Gráfico de restaurantes por sector
  new Chart(document.getElementById("restaurantChart"), {
    type: "bar",
    data: {
      labels: Object.keys(sectorCounts),
      datasets: [{
        label: "Restaurantes por Sector",
        data: Object.values(sectorCounts),
        backgroundColor: Object.keys(sectorCounts).map(s => sectorColors[s])
      }]
    },
    options: { responsive: true }
  });

  // Gráfico de restaurantes por tipo de cocina
  new Chart(document.getElementById("cuisineChart"), {
    type: "pie",
    data: {
      labels: Object.keys(cuisineCounts),
      datasets: [{
        label: "Tipos de Cocina",
        data: Object.values(cuisineCounts),
        backgroundColor: ["#4EB2FF","#6A35F5","#FFC107","#DC3545","#00CD9E"]
      }]
    },
    options: { responsive: true }
  });

  // Animaciones scroll
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("show");
    });
  }, { threshold: 0.2 });
  document.querySelectorAll("[data-animate]").forEach(el => observer.observe(el));
});

document.getElementById("menu-btn").addEventListener("click", () => {
  const menu = document.getElementById("mobile-menu");
  menu.classList.toggle("hidden");
});
