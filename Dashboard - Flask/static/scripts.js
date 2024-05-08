// Function to fetch data from the backend
async function fetchData() {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
}

// Function to populate dropdown filters for Country, Region, and City
async function populateDropdownFilters(data) {
    const uniqueCountries = [...new Set(data.map(entry => entry.country))];
    const uniqueRegions = [...new Set(data.map(entry => entry.region))];
    const uniqueCities = [...new Set(data.map(entry => entry.city))];

    const countryFilter = document.getElementById('countryFilter');
    const regionFilter = document.getElementById('regionFilter');
    const cityFilter = document.getElementById('cityFilter');

    uniqueCountries.forEach(country => {
        countryFilter.innerHTML += `<option value="${country}">${country}</option>`;
    });
    uniqueRegions.forEach(region => {
        regionFilter.innerHTML += `<option value="${region}">${region}</option>`;
    });
    uniqueCities.forEach(city => {
        cityFilter.innerHTML += `<option value="${city}">${city}</option>`;
    });
}

// Function to populate chart for Year
async function createYearChart(data) {
    try {
        const currentYear = new Date().getFullYear();
        const minYear = currentYear - 10; // Adjust this value as needed

        const years = [...new Set(data.map(entry => {
            if (entry.published) {
                const date = new Date(entry.published);
                const year = date.getFullYear();
                return year >= minYear && year <= currentYear ? year : null;
            }
            return null;
        }).filter(year => year !== null))];

        const yearCounts = years.map(year => data.filter(entry => {
            const date = new Date(entry.published);
            return date.getFullYear() === year;
        }).length);

        const trace = {
            x: years.map(String),
            y: yearCounts,
            type: 'bar',
            name: 'Events by Year'
        };

        const layout = {
            title: 'Events by Year',
            xaxis: { title: 'Year' },
            yaxis: { title: 'Number of Events' }
        };

        Plotly.newPlot('yearChart', [trace], layout);
    } catch (error) {
        console.error("Error:", error);
        console.log("Data:", data); // Log the entire data array to identify the problematic entry
    }
}

// Function to populate chart for Topics
async function createTopicsChart(data) {
    const topics = [...new Set(data.map(entry => entry.topic))];
    const topicCounts = topics.map(topic => data.filter(entry => entry.topic === topic).length);

    const trace = {
        labels: topics,
        values: topicCounts,
        type: 'pie'
    };

    const layout = {
        title: 'Topics Distribution'
    };

    Plotly.newPlot('topicsChart', [trace], layout);
}

// Function to populate chart for Sector
async function createSectorChart(data) {
    const sectors = [...new Set(data.map(entry => entry.sector))];
    const sectorCounts = sectors.map(sector => data.filter(entry => entry.sector === sector).length);

    const trace = {
        x: sectors,
        y: sectorCounts,
        type: 'bar'
    };

    const layout = {
        title: 'Sector Distribution',
        xaxis: { title: 'Sector' },
        yaxis: { title: 'Count' }
    };

    Plotly.newPlot('sectorChart', [trace], layout);
}


// Call functions to create visualizations when the page loads
document.addEventListener('DOMContentLoaded', async () => {
    const data = await fetchData();
    populateDropdownFilters(data);
    createYearChart(data);
    createTopicsChart(data);
    createSectorChart(data);
    // Call other visualization functions here as needed
});
