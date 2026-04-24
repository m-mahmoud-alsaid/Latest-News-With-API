let wrapper = document.getElementById('wrapper');
let pageTitle = document.querySelector('.home-page .content h1');

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

function clearWrapper() {
    wrapper.innerHTML = '';
}

function headlineCard(headlines) {
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
        let infoA = document.createElement('a');
        infoA.innerHTML = value.title || "title";
        infoA.href = value.url;
        infoA.target = '_blank';

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

        infoDiv.appendChild(infoA);
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

function sourcesCard(sources) {
    for (let source of sources.sources) {
        let sourcesDiv = document.createElement('div');
        sourcesDiv.classList.add('sources');

        let sourcesH3 = document.createElement('h3');
        let sourceH3Text = document.createTextNode(source.name);
        sourcesH3.appendChild(sourceH3Text);

        let sourcesP = document.createElement('p');
        let sourcePText = document.createTextNode(source.description);
        sourcesP.appendChild(sourcePText);

        let sourcesFooter = document.createElement('div');
        sourcesFooter.classList.add('sources-footer');

        let sourcesFooterP = document.createElement('p');
        let sourcesFooterPText = document.createTextNode(source.category);
        sourcesFooterP.appendChild(sourcesFooterPText);

        let sourcesFooterA = document.createElement('a');
        sourcesFooterA.href = source.url;
        sourcesFooterA.target = '_blank';
        sourcesFooterA.innerHTML = 'go to link';

        sourcesFooter.appendChild(sourcesFooterP);
        sourcesFooter.appendChild(sourcesFooterA);

        sourcesDiv.appendChild(sourcesH3);
        sourcesDiv.appendChild(sourcesP);
        sourcesDiv.appendChild(sourcesFooter);

        wrapper.appendChild(sourcesDiv);
    }
}

document.querySelector('.side-bar').onclick = (e) => {
    if (e.target.tagName !== 'A') return;
    let li = document.querySelectorAll(".side-bar a");
    li.forEach((value) => {
        if (value.classList.contains('active')) value.classList.remove('active');
    });
    e.target.classList.add('active');

    switch (e.target.dataset.view) {
        case 'headlines':
            pageTitle.innerHTML = 'top news';
            clearWrapper();
            fetchHeadlines().then(data => headlineCard(data));
            break;
        case 'sources':
            pageTitle.innerHTML = 'sources';
            clearWrapper();
            fetchSources().then(data => sourcesCard(data));
            break;
    }
};

window.onload = () => fetchHeadlines().then(data => headlineCard(data));