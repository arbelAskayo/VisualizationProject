// Main JavaScript for US Air Quality & Energy Dashboard
// Plain JavaScript - no modules, works in any browser

// Utility functions
function formatLargeNumber(num) {
    if (num >= 1e12) return (num / 1e12).toFixed(1) + 'T';
    if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
    return num.toFixed(0);
}

function calculateLinearTrend(data, xKey, yKey) {
    const n = data.length;
    if (n < 2) return null;
    
    const sumX = data.reduce((sum, d) => sum + d[xKey], 0);
    const sumY = data.reduce((sum, d) => sum + d[yKey], 0);
    const sumXY = data.reduce((sum, d) => sum + (d[xKey] * d[yKey]), 0);
    const sumXX = data.reduce((sum, d) => sum + (d[xKey] * d[xKey]), 0);
    
    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;
    
    return { slope, intercept };
}

// Home page initialization
function initializeHomePage() {
    console.log('🏠 Initializing Home Page');
    
    // Create AQI sparkline
    createAQISparkline();
    
    // Create energy mix chart
    createEnergyMixChart();
    
    // Setup navigation highlighting
    highlightCurrentPage('index.html');
}

function createAQISparkline() {
    const container = d3.select('#demo-sparkline');
    container.html(''); // Clear existing content
    
    const margin = {top: 20, right: 20, bottom: 40, left: 50};
    const width = 300 - margin.left - margin.right;
    const height = 150 - margin.top - margin.bottom;
    
    const svg = container.append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom);
    
    const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
    
    // Get national average data
    const nationalData = DataProcessor.getNationalAverages();
    
    // Create scales
    const xScale = d3.scaleLinear()
        .domain(d3.extent(nationalData, d => d.year))
        .range([0, width]);
    
    const yScale = d3.scaleLinear()
        .domain(d3.extent(nationalData, d => d.aqi))
        .range([height, 0]);
    
    // Create line generator
    const line = d3.line()
        .x(d => xScale(d.year))
        .y(d => yScale(d.aqi))
        .curve(d3.curveMonotoneX);
    
    // Add axes
    g.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(xScale).tickFormat(d3.format('d')));
    
    g.append('g')
        .call(d3.axisLeft(yScale));
    
    // Add line
    g.append('path')
        .datum(nationalData)
        .attr('fill', 'none')
        .attr('stroke', '#2563eb')
        .attr('stroke-width', 2)
        .attr('d', line);
    
    // Add axis labels
    g.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 0 - margin.left)
        .attr('x', 0 - (height / 2))
        .attr('dy', '1em')
        .style('text-anchor', 'middle')
        .style('font-size', '12px')
        .text('AQI');
    
    g.append('text')
        .attr('transform', `translate(${width / 2}, ${height + margin.bottom})`)
        .style('text-anchor', 'middle')
        .style('font-size', '12px')
        .text('Year');
    
    // Show latest values
    const latest = nationalData[nationalData.length - 1];
    const first = nationalData[0];
    const trend = latest.aqi < first.aqi ? '↓ Improving' : '↑ Worsening';
    
    container.append('div')
        .attr('class', 'chart-summary')
        .style('margin-top', '10px')
        .style('font-size', '12px')
        .style('text-align', 'center')
        .html(`Latest AQI: <strong>${Math.round(latest.aqi)}</strong> | Trend: <strong style="color: ${latest.aqi < first.aqi ? '#10b981' : '#ef4444'}">${trend}</strong>`);
}

function createEnergyMixChart() {
    const container = d3.select('#demo-energy-mix');
    container.html(''); // Clear existing content
    
    const margin = {top: 20, right: 20, bottom: 40, left: 80};
    const width = 300 - margin.left - margin.right;
    const height = 150 - margin.top - margin.bottom;
    
    const svg = container.append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom);
    
    const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
    
    // Get 2022 energy data
    const data2022 = DATA.merged.filter(d => d.year === 2022);
    
    // Calculate totals
    const energyTotals = {
        'Natural Gas': data2022.reduce((sum, d) => sum + d.naturalGas, 0),
        'Coal': data2022.reduce((sum, d) => sum + d.coal, 0),
        'Nuclear': data2022.reduce((sum, d) => sum + d.nuclear, 0),
        'Renewable': data2022.reduce((sum, d) => sum + d.renewable, 0),
        'Petroleum': data2022.reduce((sum, d) => sum + d.petroleum, 0)
    };
    
    const total = Object.values(energyTotals).reduce((sum, val) => sum + val, 0);
    
    // Convert to percentages
    const energyData = Object.entries(energyTotals).map(([key, value]) => ({
        source: key,
        percentage: (value / total) * 100
    })).sort((a, b) => b.percentage - a.percentage);
    
    // Create scales
    const xScale = d3.scaleLinear()
        .domain([0, d3.max(energyData, d => d.percentage)])
        .range([0, width]);
    
    const yScale = d3.scaleBand()
        .domain(energyData.map(d => d.source))
        .range([0, height])
        .padding(0.1);
    
    // Color scale
    const colorScale = d3.scaleOrdinal()
        .domain(energyData.map(d => d.source))
        .range(['#2563eb', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6']);
    
    // Add bars
    g.selectAll('.bar')
        .data(energyData)
        .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', 0)
        .attr('y', d => yScale(d.source))
        .attr('width', d => xScale(d.percentage))
        .attr('height', yScale.bandwidth())
        .attr('fill', d => colorScale(d.source));
    
    // Add percentage labels
    g.selectAll('.label')
        .data(energyData)
        .enter().append('text')
        .attr('class', 'label')
        .attr('x', d => xScale(d.percentage) + 5)
        .attr('y', d => yScale(d.source) + yScale.bandwidth() / 2)
        .attr('dy', '0.35em')
        .style('font-size', '10px')
        .text(d => `${d.percentage.toFixed(1)}%`);
    
    // Add y-axis
    g.append('g')
        .call(d3.axisLeft(yScale));
    
    // Add x-axis
    g.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(xScale));
    
    // Add title
    container.append('div')
        .style('margin-top', '10px')
        .style('font-size', '12px')
        .style('text-align', 'center')
        .html(`Top Source: <strong>${energyData[0].source}</strong> | Renewables: <strong style="color: #10b981">${energyTotals.Renewable > 0 ? ((energyTotals.Renewable / total) * 100).toFixed(1) + '%' : '0%'}</strong>`);
}

// Dashboard initialization functions
function initializeAQIEnergyDashboard() {
    console.log('🌱 Initializing AQI vs Energy Dashboard');
    
    // Calculate and display summary statistics
    updateAQIEnergyStats();
    
    // Setup filter event listeners
    setupAQIEnergyFilters();
    
    highlightCurrentPage('dashboard-aqi-energy.html');
}

function updateAQIEnergyStats() {
    const data = DATA.merged;
    
    // Calculate statistics
    const avgAQI = data.reduce((sum, d) => sum + d.aqi, 0) / data.length;
    const totalEnergy = data.reduce((sum, d) => sum + d.totalBTU, 0);
    const correlation = DataProcessor.calculateCorrelation(data, 'aqi', 'totalBTU');
    
    // Update DOM elements if they exist
    const statesCount = document.getElementById('selected-states-count');
    const avgAqiEl = document.getElementById('avg-aqi');
    const totalEnergyEl = document.getElementById('total-energy');
    const correlationEl = document.getElementById('correlation');
    
    if (statesCount) statesCount.textContent = DataProcessor.getStates().length;
    if (avgAqiEl) avgAqiEl.textContent = Math.round(avgAQI);
    if (totalEnergyEl) totalEnergyEl.textContent = formatLargeNumber(totalEnergy);
    if (correlationEl) correlationEl.textContent = correlation ? correlation.toFixed(3) : '--';
}

function setupAQIEnergyFilters() {
    // Setup energy type filter checkboxes
    const checkboxes = document.querySelectorAll('.energy-type-checkboxes input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            updateAQIEnergyStats();
        });
    });
}

function initializeTrendsDashboard() {
    console.log('📈 Initializing Trends Dashboard');
    
    // Calculate and display trend analytics
    updateTrendAnalytics();
    
    // Setup filter event listeners
    setupTrendsFilters();
    
    highlightCurrentPage('dashboard-trends.html');
}

function updateTrendAnalytics() {
    const nationalData = DataProcessor.getNationalAverages();
    
    // Calculate AQI trend
    const aqiTrend = calculateLinearTrend(nationalData, 'year', 'aqi');
    const energyTrend = calculateLinearTrend(nationalData, 'year', 'totalBTU');
    
    // Calculate renewable percentage trend
    const renewableData = nationalData.map(d => ({
        year: d.year,
        renewablePercent: (d.renewable / d.totalBTU) * 100
    }));
    const renewableTrend = calculateLinearTrend(renewableData, 'year', 'renewablePercent');
    
    // Update DOM elements
    const aqiTrendValue = document.getElementById('aqi-trend-value');
    const aqiTrendDirection = document.getElementById('aqi-trend-direction');
    const energyTrendValue = document.getElementById('energy-trend-value');
    const energyTrendDirection = document.getElementById('energy-trend-direction');
    const renewableTrendValue = document.getElementById('renewable-trend-value');
    const renewableTrendDirection = document.getElementById('renewable-trend-direction');
    
    if (aqiTrend && aqiTrendValue && aqiTrendDirection) {
        aqiTrendValue.textContent = `${Math.abs(aqiTrend.slope).toFixed(2)}/year`;
        aqiTrendDirection.textContent = aqiTrend.slope < 0 ? '↓ Improving' : '↑ Worsening';
        aqiTrendDirection.style.color = aqiTrend.slope < 0 ? '#10b981' : '#ef4444';
    }
    
    if (energyTrend && energyTrendValue && energyTrendDirection) {
        const percentChange = ((energyTrend.slope * 42) / nationalData[0].totalBTU) * 100;
        energyTrendValue.textContent = `${Math.abs(percentChange).toFixed(1)}%`;
        energyTrendDirection.textContent = energyTrend.slope > 0 ? '↑ Increasing' : '↓ Decreasing';
        energyTrendDirection.style.color = energyTrend.slope > 0 ? '#ef4444' : '#10b981';
    }
    
    if (renewableTrend && renewableTrendValue && renewableTrendDirection) {
        renewableTrendValue.textContent = `${Math.abs(renewableTrend.slope).toFixed(2)}%/year`;
        renewableTrendDirection.textContent = renewableTrend.slope > 0 ? '↑ Increasing' : '↓ Decreasing';
        renewableTrendDirection.style.color = renewableTrend.slope > 0 ? '#10b981' : '#ef4444';
    }
}

function setupTrendsFilters() {
    // Setup metrics checkboxes
    const metricCheckboxes = document.querySelectorAll('.metrics-checkboxes input[type="checkbox"]');
    metricCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            updateTrendAnalytics();
        });
    });
}

// Visualization page functions
function initializeLineChart() {
    console.log('📊 Initializing Line Chart');
    
    createInteractiveLineChart();
    highlightCurrentPage('viz-line-chart.html');
}

function createInteractiveLineChart() {
    const container = d3.select('#line-chart-container');
    if (container.empty()) return;
    
    container.html(''); // Clear existing content
    
    const margin = {top: 20, right: 150, bottom: 50, left: 60};
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
    
    const svg = container.append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom);
    
    const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
    
    // Group data by state
    const states = ['CA', 'TX', 'NY', 'FL'];
    const stateData = states.map(state => ({
        state: state,
        values: DATA.merged.filter(d => d.state === state)
    }));
    
    // Create scales
    const xScale = d3.scaleLinear()
        .domain(DataProcessor.getYearRange())
        .range([0, width]);
    
    const yScale = d3.scaleLinear()
        .domain(d3.extent(DATA.merged, d => d.aqi))
        .range([height, 0]);
    
    const colorScale = d3.scaleOrdinal()
        .domain(states)
        .range(['#2563eb', '#ef4444', '#10b981', '#f59e0b']);
    
    // Create line generator
    const line = d3.line()
        .x(d => xScale(d.year))
        .y(d => yScale(d.aqi))
        .curve(d3.curveMonotoneX);
    
    // Add axes
    g.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(xScale).tickFormat(d3.format('d')));
    
    g.append('g')
        .call(d3.axisLeft(yScale));
    
    // Add axis labels
    g.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 0 - margin.left)
        .attr('x', 0 - (height / 2))
        .attr('dy', '1em')
        .style('text-anchor', 'middle')
        .text('Air Quality Index');
    
    g.append('text')
        .attr('transform', `translate(${width / 2}, ${height + margin.bottom})`)
        .style('text-anchor', 'middle')
        .text('Year');
    
    // Add lines
    g.selectAll('.line')
        .data(stateData)
        .enter().append('path')
        .attr('class', 'line')
        .attr('fill', 'none')
        .attr('stroke', d => colorScale(d.state))
        .attr('stroke-width', 2)
        .attr('d', d => line(d.values));
    
    // Add legend
    const legend = g.append('g')
        .attr('class', 'legend')
        .attr('transform', `translate(${width + 20}, 20)`);
    
    const legendItems = legend.selectAll('.legend-item')
        .data(stateData)
        .enter().append('g')
        .attr('class', 'legend-item')
        .attr('transform', (d, i) => `translate(0, ${i * 20})`);
    
    legendItems.append('line')
        .attr('x1', 0)
        .attr('x2', 15)
        .attr('y1', 5)
        .attr('y2', 5)
        .attr('stroke', d => colorScale(d.state))
        .attr('stroke-width', 2);
    
    legendItems.append('text')
        .attr('x', 20)
        .attr('y', 5)
        .attr('dy', '0.35em')
        .style('font-size', '12px')
        .text(d => d.state);
}

// Navigation helper
function highlightCurrentPage(currentPage) {
    // Remove active class from all nav links
    document.querySelectorAll('.navbar-link, .dropdown-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to current page link
    const activeLink = document.querySelector(`[href="${currentPage}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
        
        // If it's a dropdown link, also highlight the parent
        const parentDropdown = activeLink.closest('.dropdown');
        if (parentDropdown) {
            const parentLink = parentDropdown.querySelector('.navbar-link');
            if (parentLink) {
                parentLink.classList.add('active');
            }
        }
    }
}

// Global functions for buttons and interactions
function resetAQIEnergyFilters() {
    // Reset all checkboxes
    document.querySelectorAll('.energy-type-checkboxes input').forEach(cb => {
        cb.checked = true;
    });
    updateAQIEnergyStats();
}

function resetTrendsFilters() {
    // Reset metrics checkboxes
    document.querySelectorAll('.metrics-checkboxes input').forEach(cb => {
        cb.checked = ['aqi', 'totalBTU', 'renewable'].includes(cb.value);
    });
    
    // Reset granularity
    const yearRadio = document.querySelector('input[name="granularity"][value="year"]');
    if (yearRadio) yearRadio.checked = true;
    
    updateTrendAnalytics();
}

function selectAllStates() {
    console.log('Selecting all states');
    updateTrendAnalytics();
}

function selectTopStates() {
    console.log('Selecting top 10 states');
    updateTrendAnalytics();
}

function clearStateSelection() {
    console.log('Clearing state selection');
    updateTrendAnalytics();
} 