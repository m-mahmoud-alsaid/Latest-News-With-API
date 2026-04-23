let wrapper = document.getElementById('wrapper');

async function fetchHeadlines() {
    try {
        let response = await fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=3e326e0c4086426b8ff6e1c537968f74');
        if (!response.ok) throw new Error('HTTP Error.');
        let data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

async function fetchSources() {
    try {
        let response = await fetch(`https://newsapi.org/v2/top-headlines/sources?apiKey=3e326e0c4086426b8ff6e1c537968f74`);
        if (!response.ok) throw new Error('HTTP Error.');
        let data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

async function fetchCategories(category) {
    try {
        let response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=3e326e0c4086426b8ff6e1c537968f74`);
        if (!response.ok) throw new Error('HTTP Error.');
        let data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

function clearWrapper() {
    wrapper.innerHTML = '';
}

function headlineCard(headlines) {
    console.log(headlines.articles);
    headlines.articles.forEach(value => {
        // Card Structure 
        let newDiv = document.createElement('div');
        newDiv.classList.add('new');
        let img = document.createElement('img');
        img.src = value.urlToImage || 'https://png.pngtree.com/thumb_back/fh260/background/20220222/pngtree-news-concept-newspaper-headline-breaking-news-bad-media-text-photo-image_23792006.jpg';

        let detailsDiv = document.createElement('div');
        detailsDiv.classList.add('details');
        let infoDiv = document.createElement('div');
        infoDiv.classList.add('info');
        let infoH3 = document.createElement('h3');
        let infoH3Text = document.createTextNode(value.title || "title");
        infoH3.appendChild(infoH3Text);
        let infoP = document.createElement('p');
        let infoPText = document.createTextNode(value.description || 'no description');
        infoP.appendChild(infoPText);

        let infoTwoDiv = document.createElement('div');
        infoTwoDiv.classList.add('info-two');
        let infoFirstP = document.createElement('p');
        let infoFirstPText = document.createTextNode(value.author || 'unknown');
        infoFirstP.appendChild(infoFirstPText);
        let infoLastP = document.createElement('p');
        let infoLastPText = document.createTextNode(value.publishedAt || 'unknown');
        infoLastP.appendChild(infoLastPText);

        infoDiv.appendChild(infoH3);
        infoDiv.appendChild(infoP);

        infoTwoDiv.appendChild(infoFirstP);
        infoTwoDiv.appendChild(infoLastP);

        detailsDiv.appendChild(infoDiv);
        detailsDiv.appendChild(infoTwoDiv);

        newDiv.appendChild(img);
        newDiv.appendChild(detailsDiv);

        wrapper.appendChild(newDiv);
    });
}

document.querySelector('.side-bar').onclick = (e) => {
    if (e.target.tagName !== 'LI') return;
    let li = document.querySelectorAll(".side-bar li");
    li.forEach((value) => {
        if (value.classList.contains('active')) value.classList.remove('active');
    });
    e.target.classList.add('active');

    switch (e.target.dataset.view) {
        case 'headlines':
            clearWrapper();
            fetchHeadlines().then(data => headlineCard(data));
            break;
        case 'sources':
            console.log('sources');
            break;
        case 'categories':
            console.log('categories');
            break;
    }
};

window.onload = () => fetchHeadlines().then(data => headlineCard(data));