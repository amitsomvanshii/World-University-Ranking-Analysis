import './style.css'
import Papa from 'papaparse'
import Chart from 'chart.js/auto'

let allData = []
let currentYear = '2016'
let charts = {}

const elements = {
  stats: document.getElementById('stats'),
  yearSelect: document.getElementById('yearSelect'),
  searchInput: document.getElementById('searchInput'),
  rankingBody: document.getElementById('rankingBody'),
  loading: document.getElementById('loading')
}

// Initialization
async function init() {
  try {
    const response = await fetch('/timesData.csv')
    const csvData = await response.text()
    
    Papa.parse(csvData, {
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        allData = results.data.filter(row => row.university_name)
        updateDashboard()
        elements.loading.style.opacity = '0'
        setTimeout(() => elements.loading.style.display = 'none', 500)
      }
    })
  } catch (error) {
    console.error('Error loading data:', error)
  }
}

function updateDashboard() {
  const filtered = allData.filter(row => String(row.year) === currentYear)
  const searchTerm = elements.searchInput.value.toLowerCase()
  const searched = filtered.filter(row => 
    row.university_name.toLowerCase().includes(searchTerm) || 
    row.country.toLowerCase().includes(searchTerm)
  )

  renderStats(filtered)
  renderCharts(filtered)
  renderTable(searched.slice(0, 50)) // Show top 50
}

function renderStats(data) {
  const totalUniversities = data.length
  const countries = new Set(data.map(d => d.country)).size
  const avgScore = (data.reduce((acc, curr) => acc + (parseFloat(curr.total_score) || 0), 0) / data.filter(d => d.total_score !== '-').length).toFixed(1)

  elements.stats.innerHTML = `
    <div class="stat-card">
      <div class="stat-value">${totalUniversities}</div>
      <div class="stat-label">Total Universities</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${countries}</div>
      <div class="stat-label">Countries Represented</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${avgScore}</div>
      <div class="stat-label">Average Global Score</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${currentYear}</div>
      <div class="stat-label">Data Year</div>
    </div>
  `
}

function renderCharts(data) {
  // Ranking Chart (Top 10)
  const top10 = data.slice(0, 10)
  
  if (charts.ranking) charts.ranking.destroy()
  const rankingCtx = document.getElementById('rankingChart').getContext('2d')
  charts.ranking = new Chart(rankingCtx, {
    type: 'bar',
    data: {
      labels: top10.map(d => d.university_name),
      datasets: [{
        label: 'Total Score',
        data: top10.map(d => d.total_score),
        backgroundColor: 'rgba(99, 102, 241, 0.6)',
        borderColor: '#6366f1',
        borderWidth: 1,
        borderRadius: 8
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#94a3b8' } },
        y: { grid: { display: false }, ticks: { color: '#94a3b8' } }
      }
    }
  })

  // Country Chart
  const countryCounts = {}
  data.forEach(d => {
    countryCounts[d.country] = (countryCounts[d.country] || 0) + 1
  })
  const topCountries = Object.entries(countryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  if (charts.country) charts.country.destroy()
  const countryCtx = document.getElementById('countryChart').getContext('2d')
  charts.country = new Chart(countryCtx, {
    type: 'doughnut',
    data: {
      labels: topCountries.map(c => c[0]),
      datasets: [{
        data: topCountries.map(c => c[1]),
        backgroundColor: [
          '#6366f1', '#a855f7', '#22d3ee', '#f43f5e', '#10b981'
        ],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: { color: '#94a3b8', padding: 20 }
        }
      },
      cutout: '70%'
    }
  })
}

function renderTable(data) {
  elements.rankingBody.innerHTML = data.map(row => `
    <tr>
      <td><span class="rank-badge">${row.world_rank}</span></td>
      <td style="font-weight: 600">${row.university_name}</td>
      <td>${row.country}</td>
      <td style="color: var(--accent); font-weight: 700">${row.total_score || 'N/A'}</td>
      <td>${row.citations}</td>
      <td>${row.research}</td>
    </tr>
  `).join('')
}

// Events
elements.yearSelect.addEventListener('change', (e) => {
  currentYear = e.target.value
  updateDashboard()
})

elements.searchInput.addEventListener('input', () => {
  updateDashboard()
})

init()
