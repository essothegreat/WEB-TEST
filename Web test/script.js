async function fetchData() {
    const response = await fetch('Master.xml');
    const text = await response.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(text, 'application/xml');
    
    const terms = xml.getElementsByTagName('Term');
    const descriptions = xml.getElementsByTagName('Description');
    const arabicTerms = xml.getElementsByTagName('ArabicTerm');
    const arabicDescriptions = xml.getElementsByTagName('ArabicDescription');
    
    const data = [];
    
    for (let i = 0; i < terms.length; i++) {
        data.push({
            term: terms[i].textContent,
            description: descriptions[i].textContent,
            arabicTerm: arabicTerms[i].textContent,
            arabicDescription: arabicDescriptions[i].textContent
        });
    }
    
    return data;
}

function filterResults() {
    const searchTerm = document.getElementById('search-box').value.toLowerCase();
    const resultsBody = document.getElementById('data-body');
    resultsBody.innerHTML = '';

    fetchData().then(data => {
        const filteredData = data.filter(item =>
            item.term.toLowerCase().includes(searchTerm) ||
            item.description.toLowerCase().includes(searchTerm) ||
            item.arabicTerm.includes(searchTerm) ||
            item.arabicDescription.includes(searchTerm)
        );

        filteredData.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.term}</td>
                <td>${item.description}</td>
                <td>${item.arabicTerm}</td>
                <td>${item.arabicDescription}</td>
            `;
            resultsBody.appendChild(row);
        });
    });
}

// Load initial data
filterResults();
