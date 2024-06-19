document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Netwerkrespons was niet ok.');
            }
            return response.json();
        })
        .then(json => {
            if (!Array.isArray(json.data)) {
                throw new Error('Verwacht een array als resultaat.');
            }

            // Sorteer de data op ID van hoog naar laag
            const sortedData = json.data.sort((a, b) => b.id - a.id);

            const container = document.querySelector('.blog-container');
            sortedData.forEach(post => {
                const card = document.createElement('div');
                card.className = 'card';
                
                const link = document.createElement('a');
                link.href = `details.html?id=${post.id}`;
                link.className = 'card-link';

                const topContainer = document.createElement('div');
                topContainer.className = 'top-container';
                topContainer.style.backgroundColor = post.color;
                topContainer.innerHTML = `<div class="emoji">${post.emoji}</div>`;
                
                const bottomContainer = document.createElement('div');
                bottomContainer.className = 'bottom-container';
                bottomContainer.innerHTML = `
                    <div class="bottom-content">
                        <h2>${post.title}</h2>
                        <p>${post.short_description || 'undefined'}</p>
                        <p>${post.date || 'Datum'}</p>
                    </div>
                `;

                link.appendChild(topContainer);
                link.appendChild(bottomContainer);
                card.appendChild(link);
                container.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Er was een probleem met de fetch-operatie:', error);
        });
});
