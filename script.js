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
            const container = document.querySelector('.blog-container');
            json.data.forEach(post => {
                const card = document.createElement('div');
                card.className = 'card';
                
                const topContainer = document.createElement('div');
                topContainer.className = 'top-container';
                topContainer.style.backgroundColor = post.color;
                topContainer.innerHTML = `<div class="emoji">${post.emoji}</div>`;
                
                const bottomContainer = document.createElement('div');
                bottomContainer.className = 'bottom-container';
                bottomContainer.innerHTML = `
                    <div class="bottom-content">
                        <h2>${post.title}</h2>
                        <p>${post.short_description}</p>
                        <p>Datum</p>
                    </div>
                `;
                
                card.appendChild(topContainer);
                card.appendChild(bottomContainer);
                container.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Er was een probleem met de fetch-operatie:', error);
        });
});

function showContent(content) {
    alert(content);  // Hier kun je een modal of een nieuwe pagina weergeven met de uitgebreide content
}

