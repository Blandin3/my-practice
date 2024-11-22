document.getElementById('visa-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const nationality = document.getElementById('nationality').value;
    const destination = document.getElementById('destination').value;

    const response = await fetch(`/api/check-visa?nationality=${nationality}&destination=${destination}`);
    const data = await response.json();

    const visaResultDiv = document.getElementById('visa-result');
    if (data.isVisaRequired) {
        visaResultDiv.innerHTML = `You need a visa to travel to ${destination}.`;
    } else {
        visaResultDiv.innerHTML = `You do not need a visa to travel to ${destination}.`;
    }
});

// Function to populate the dropdowns with countries
async function populateCountries() {
    const response = await fetch('/api/countries');
    const countries = await response.json();
    
    const nationalitySelect = document.getElementById('nationality');
    const destinationSelect = document.getElementById('destination');

    countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country;
        option.textContent = country;
        nationalitySelect.appendChild(option);
        destinationSelect.appendChild(option.cloneNode(true));
    });
}

populateCountries();

