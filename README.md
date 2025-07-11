# US Air Quality & Energy Consumption Dashboard (Static Version)

A simple, static website for visualizing US air quality and energy consumption data from 1980-2022. This version is designed to work on university servers without any build process or dependencies.

## 🎯 Project Overview

This interactive dashboard addresses two key research questions:
- **RQ1**: How did air-quality trends evolve alongside overall energy consumption across U.S. states from 1980 to 2022?
- **RQ2**: Which energy sources correlate most strongly with AQI deterioration or improvement?

## 📁 File Structure

```
us-aqi-energy-static/
├── index.html                   # Home page with research questions
├── dashboard-aqi-energy.html    # AQI vs Energy dashboard
├── dashboard-trends.html        # Trends analysis dashboard
├── viz-line-chart.html         # AQI line chart visualization
├── styles.css                  # All CSS styles
├── main.js                     # Plain JavaScript functions
├── data.js                     # Embedded data
└── README.md                   # This file
```

## 🚀 How to Use

### For Students/Developers:
1. **Download all files** to your computer
2. **Open `index.html`** in any modern web browser
3. **Navigate** between pages using the top navigation menu
4. **Explore** the interactive charts and dashboards

### For University Servers:
1. **Upload all files** to your university's web server
2. **Ensure all files are in the same directory**
3. **Access via web browser** at your server's URL
4. **No installation or setup required!**

## 🌐 Browser Compatibility

Works in all modern browsers:
- ✅ Chrome/Edge ≥ 89
- ✅ Firefox ≥ 89  
- ✅ Safari ≥ 15
- ✅ Works offline (no internet required after loading)

## 📊 Features

### Home Page (`index.html`)
- Research questions overview
- Interactive demo charts showing:
  - National AQI trend sparkline
  - 2022 energy mix distribution
- Navigation to other sections

### AQI vs Energy Dashboard (`dashboard-aqi-energy.html`)
- Interactive controls for filtering data
- Real-time statistics calculations
- Placeholder containers for future visualizations:
  - Interactive US map
  - Scatter plot (AQI vs Energy)
  - Parallel coordinates
- Summary statistics panel

### Line Chart Visualization (`viz-line-chart.html`)
- Fully functional D3.js line chart
- Shows AQI trends for CA, TX, NY, FL (1980-2022)
- Interactive state selection
- Real trend analysis and insights

### Trends Dashboard (`dashboard-trends.html`)
- Trend analytics with statistical calculations
- Filter controls for metrics and time granularity
- Placeholder containers for time series and heatmap

## 🔧 Technical Details

### Data Source
- **Embedded data** in `data.js` (no external files needed)
- **4 US states**: California, Texas, New York, Florida
- **43 years**: 1980-2022
- **Realistic trends**: AQI improving, renewables increasing

### Architecture
- **Plain HTML/CSS/JavaScript** - no frameworks
- **D3.js v7** from CDN for visualizations
- **No build process** - works immediately
- **Responsive design** - works on mobile and desktop

### Adding More Visualizations

1. **Create new HTML file** (e.g., `viz-scatter.html`)
2. **Copy structure** from existing visualization page
3. **Add JavaScript function** to `main.js`
4. **Update navigation** in all HTML files
5. **Call initialization function** on page load

### Customizing Data

1. **Edit `data.js`** to add more states or years
2. **Update the `DATA.merged` array** with your data
3. **Follow the existing data structure**:
   ```javascript
   {state: "CA", year: 2022, aqi: 50, totalBTU: 3400000, ...}
   ```

## 📈 Sample Visualizations Included

### Working Charts:
- ✅ **AQI Sparkline** (Home page)
- ✅ **Energy Mix Bar Chart** (Home page)  
- ✅ **Multi-state Line Chart** (Visualization page)
- ✅ **Statistical Calculations** (All dashboards)

### Placeholder Containers:
- 🔲 **US Map** (Ready for implementation)
- 🔲 **Scatter Plot** (Ready for implementation)
- 🔲 **Heatmap** (Ready for implementation)
- 🔲 **Parallel Coordinates** (Ready for implementation)

## 🎨 Styling

- **CSS Custom Properties** for consistent theming
- **Responsive Grid Layouts** 
- **Modern color scheme** with blue/green palette
- **Interactive hover effects**
- **Mobile-friendly navigation**

## 🚀 Deployment Checklist

For university server deployment:

- [ ] All HTML files use relative paths
- [ ] D3.js loads from CDN (internet required)
- [ ] No server-side processing needed
- [ ] No databases or APIs required
- [ ] Works with simple file upload
- [ ] Cross-browser compatible

## 📝 Next Steps

This static version provides a solid foundation. To extend it:

1. **Replace placeholders** with actual D3 visualizations
2. **Add more states** to the dataset
3. **Implement interactive features** (brushing, linking)
4. **Add more chart types** (maps, scatter plots, etc.)
5. **Enhance mobile experience**

## 🏫 Perfect for Academic Use

This implementation is ideal for university courses because:
- ✅ **No dependencies** - just upload and run
- ✅ **Easy to understand** - plain HTML/CSS/JS
- ✅ **Well documented** - comments throughout code
- ✅ **Extensible** - easy to add new features
- ✅ **Professional looking** - ready for presentations

## 📄 License

This project is for educational/research purposes as part of a visualization course. 