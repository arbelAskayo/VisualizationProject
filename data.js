// Embedded Data for US Air Quality & Energy Dashboard
// This data is used across all pages and includes realistic trends

const DATA = {
    // Generated placeholder data for development
    merged: [
        // California data
        {state: "CA", year: 1980, aqi: 85, totalBTU: 2500000, coal: 750000, naturalGas: 1000000, nuclear: 250000, renewable: 300000, petroleum: 200000},
        {state: "CA", year: 1985, aqi: 78, totalBTU: 2600000, coal: 700000, naturalGas: 1100000, nuclear: 300000, renewable: 350000, petroleum: 150000},
        {state: "CA", year: 1990, aqi: 71, totalBTU: 2700000, coal: 650000, naturalGas: 1200000, nuclear: 350000, renewable: 400000, petroleum: 100000},
        {state: "CA", year: 1995, aqi: 68, totalBTU: 2800000, coal: 600000, naturalGas: 1300000, nuclear: 400000, renewable: 450000, petroleum: 50000},
        {state: "CA", year: 2000, aqi: 65, totalBTU: 2900000, coal: 550000, naturalGas: 1400000, nuclear: 450000, renewable: 500000, petroleum: 0},
        {state: "CA", year: 2005, aqi: 62, totalBTU: 3000000, coal: 500000, naturalGas: 1500000, nuclear: 500000, renewable: 500000, petroleum: 0},
        {state: "CA", year: 2010, aqi: 58, totalBTU: 3100000, coal: 450000, naturalGas: 1600000, nuclear: 550000, renewable: 500000, petroleum: 0},
        {state: "CA", year: 2015, aqi: 55, totalBTU: 3200000, coal: 400000, naturalGas: 1700000, nuclear: 600000, renewable: 500000, petroleum: 0},
        {state: "CA", year: 2020, aqi: 52, totalBTU: 3300000, coal: 350000, naturalGas: 1800000, nuclear: 650000, renewable: 500000, petroleum: 0},
        {state: "CA", year: 2022, aqi: 50, totalBTU: 3400000, coal: 300000, naturalGas: 1900000, nuclear: 700000, renewable: 500000, petroleum: 0},

        // Texas data
        {state: "TX", year: 1980, aqi: 92, totalBTU: 3000000, coal: 1200000, naturalGas: 800000, nuclear: 0, renewable: 100000, petroleum: 900000},
        {state: "TX", year: 1985, aqi: 89, totalBTU: 3200000, coal: 1300000, naturalGas: 900000, nuclear: 50000, renewable: 150000, petroleum: 800000},
        {state: "TX", year: 1990, aqi: 86, totalBTU: 3400000, coal: 1400000, naturalGas: 1000000, nuclear: 100000, renewable: 200000, petroleum: 700000},
        {state: "TX", year: 1995, aqi: 83, totalBTU: 3600000, coal: 1500000, naturalGas: 1100000, nuclear: 150000, renewable: 250000, petroleum: 600000},
        {state: "TX", year: 2000, aqi: 80, totalBTU: 3800000, coal: 1600000, naturalGas: 1200000, nuclear: 200000, renewable: 300000, petroleum: 500000},
        {state: "TX", year: 2005, aqi: 77, totalBTU: 4000000, coal: 1700000, naturalGas: 1300000, nuclear: 250000, renewable: 350000, petroleum: 400000},
        {state: "TX", year: 2010, aqi: 74, totalBTU: 4200000, coal: 1800000, naturalGas: 1400000, nuclear: 300000, renewable: 400000, petroleum: 300000},
        {state: "TX", year: 2015, aqi: 71, totalBTU: 4400000, coal: 1900000, naturalGas: 1500000, nuclear: 350000, renewable: 450000, petroleum: 200000},
        {state: "TX", year: 2020, aqi: 68, totalBTU: 4600000, coal: 2000000, naturalGas: 1600000, nuclear: 400000, renewable: 500000, petroleum: 100000},
        {state: "TX", year: 2022, aqi: 65, totalBTU: 4800000, coal: 2100000, naturalGas: 1700000, nuclear: 450000, renewable: 550000, petroleum: 0},

        // New York data
        {state: "NY", year: 1980, aqi: 78, totalBTU: 1800000, coal: 600000, naturalGas: 500000, nuclear: 400000, renewable: 200000, petroleum: 100000},
        {state: "NY", year: 1985, aqi: 75, totalBTU: 1850000, coal: 550000, naturalGas: 550000, nuclear: 450000, renewable: 250000, petroleum: 50000},
        {state: "NY", year: 1990, aqi: 72, totalBTU: 1900000, coal: 500000, naturalGas: 600000, nuclear: 500000, renewable: 300000, petroleum: 0},
        {state: "NY", year: 1995, aqi: 69, totalBTU: 1950000, coal: 450000, naturalGas: 650000, nuclear: 550000, renewable: 300000, petroleum: 0},
        {state: "NY", year: 2000, aqi: 66, totalBTU: 2000000, coal: 400000, naturalGas: 700000, nuclear: 600000, renewable: 300000, petroleum: 0},
        {state: "NY", year: 2005, aqi: 63, totalBTU: 2050000, coal: 350000, naturalGas: 750000, nuclear: 650000, renewable: 300000, petroleum: 0},
        {state: "NY", year: 2010, aqi: 60, totalBTU: 2100000, coal: 300000, naturalGas: 800000, nuclear: 700000, renewable: 300000, petroleum: 0},
        {state: "NY", year: 2015, aqi: 57, totalBTU: 2150000, coal: 250000, naturalGas: 850000, nuclear: 750000, renewable: 300000, petroleum: 0},
        {state: "NY", year: 2020, aqi: 54, totalBTU: 2200000, coal: 200000, naturalGas: 900000, nuclear: 800000, renewable: 300000, petroleum: 0},
        {state: "NY", year: 2022, aqi: 52, totalBTU: 2250000, coal: 150000, naturalGas: 950000, nuclear: 850000, renewable: 300000, petroleum: 0},

        // Florida data
        {state: "FL", year: 1980, aqi: 88, totalBTU: 1500000, coal: 600000, naturalGas: 400000, nuclear: 0, renewable: 100000, petroleum: 400000},
        {state: "FL", year: 1985, aqi: 85, totalBTU: 1600000, coal: 650000, naturalGas: 450000, nuclear: 50000, renewable: 150000, petroleum: 300000},
        {state: "FL", year: 1990, aqi: 82, totalBTU: 1700000, coal: 700000, naturalGas: 500000, nuclear: 100000, renewable: 200000, petroleum: 200000},
        {state: "FL", year: 1995, aqi: 79, totalBTU: 1800000, coal: 750000, naturalGas: 550000, nuclear: 150000, renewable: 250000, petroleum: 100000},
        {state: "FL", year: 2000, aqi: 76, totalBTU: 1900000, coal: 800000, naturalGas: 600000, nuclear: 200000, renewable: 300000, petroleum: 0},
        {state: "FL", year: 2005, aqi: 73, totalBTU: 2000000, coal: 850000, naturalGas: 650000, nuclear: 250000, renewable: 250000, petroleum: 0},
        {state: "FL", year: 2010, aqi: 70, totalBTU: 2100000, coal: 900000, naturalGas: 700000, nuclear: 300000, renewable: 200000, petroleum: 0},
        {state: "FL", year: 2015, aqi: 67, totalBTU: 2200000, coal: 950000, naturalGas: 750000, nuclear: 350000, renewable: 150000, petroleum: 0},
        {state: "FL", year: 2020, aqi: 64, totalBTU: 2300000, coal: 1000000, naturalGas: 800000, nuclear: 400000, renewable: 100000, petroleum: 0},
        {state: "FL", year: 2022, aqi: 62, totalBTU: 2400000, coal: 1050000, naturalGas: 850000, nuclear: 450000, renewable: 50000, petroleum: 0}
    ]
};

// Helper functions for data processing
const DataProcessor = {
    // Get all unique states
    getStates: function() {
        return [...new Set(DATA.merged.map(d => d.state))].sort();
    },

    // Get year range
    getYearRange: function() {
        const years = DATA.merged.map(d => d.year);
        return {min: Math.min(...years), max: Math.max(...years)};
    },

    // Get data for specific states
    getStateData: function(states = []) {
        if (states.length === 0) return DATA.merged;
        return DATA.merged.filter(d => states.includes(d.state));
    },

    // Get data for specific year range
    getYearData: function(yearMin, yearMax) {
        return DATA.merged.filter(d => d.year >= yearMin && d.year <= yearMax);
    },

    // Calculate national averages by year
    getNationalAverages: function() {
        const grouped = {};
        DATA.merged.forEach(d => {
            if (!grouped[d.year]) {
                grouped[d.year] = {
                    year: d.year,
                    aqi: [],
                    totalBTU: [],
                    coal: [],
                    naturalGas: [],
                    nuclear: [],
                    renewable: [],
                    petroleum: []
                };
            }
            grouped[d.year].aqi.push(d.aqi);
            grouped[d.year].totalBTU.push(d.totalBTU);
            grouped[d.year].coal.push(d.coal);
            grouped[d.year].naturalGas.push(d.naturalGas);
            grouped[d.year].nuclear.push(d.nuclear);
            grouped[d.year].renewable.push(d.renewable);
            grouped[d.year].petroleum.push(d.petroleum);
        });

        return Object.values(grouped).map(d => ({
            year: d.year,
            aqi: d.aqi.reduce((a, b) => a + b, 0) / d.aqi.length,
            totalBTU: d.totalBTU.reduce((a, b) => a + b, 0) / d.totalBTU.length,
            coal: d.coal.reduce((a, b) => a + b, 0) / d.coal.length,
            naturalGas: d.naturalGas.reduce((a, b) => a + b, 0) / d.naturalGas.length,
            nuclear: d.nuclear.reduce((a, b) => a + b, 0) / d.nuclear.length,
            renewable: d.renewable.reduce((a, b) => a + b, 0) / d.renewable.length,
            petroleum: d.petroleum.reduce((a, b) => a + b, 0) / d.petroleum.length
        })).sort((a, b) => a.year - b.year);
    },

    // Calculate correlation between two variables
    calculateCorrelation: function(data, var1, var2) {
        const n = data.length;
        if (n < 2) return null;

        const sum1 = data.reduce((sum, d) => sum + d[var1], 0);
        const sum2 = data.reduce((sum, d) => sum + d[var2], 0);
        const sum1Sq = data.reduce((sum, d) => sum + d[var1] * d[var1], 0);
        const sum2Sq = data.reduce((sum, d) => sum + d[var2] * d[var2], 0);
        const sum12 = data.reduce((sum, d) => sum + d[var1] * d[var2], 0);

        const numerator = (n * sum12) - (sum1 * sum2);
        const denominator = Math.sqrt(((n * sum1Sq) - (sum1 * sum1)) * ((n * sum2Sq) - (sum2 * sum2)));

        return denominator !== 0 ? numerator / denominator : null;
    }
}; 