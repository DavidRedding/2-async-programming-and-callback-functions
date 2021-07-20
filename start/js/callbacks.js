const astrosUrl = 'http://api.open-notify.org/astros.json'; // returns all people currently in space
const wikiUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/';
const peopleList = document.getElementById('people');
const btn = document.querySelector('button');

// Make an AJAX request
function getJSON(url,callback) {  // higher-order function
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url); 
  xhr.onload = () => {
    if(xhr.status === 200) {
      let data = JSON.parse(xhr.responseText);
      return callback(data); //runs callback on data once data is recieved
    }
  };
  xhr.send();
}

// Generate the markup for each profile
function generateHTML(data) {
  const section = document.createElement('section');
  peopleList.appendChild(section);
  // Check if request returns a 'standard' page from Wiki
  if (data.type === 'standard') {
    section.innerHTML = `
      <img src=${data.thumbnail.source}>
      <h2>${data.title}</h2>
      <p>${data.description}</p>
      <p>${data.extract}</p>
    `;
  } else {
    section.innerHTML = `
      <img src="img/profile.jpg" alt="ocean clouds seen from space">
      <h2>${data.title}</h2>
      <p>Results unavailable for ${data.title}</p>
      ${data.extract_html}
    `;
  }
}

btn.addEventListener('click', () => {
  getJSON(astrosUrl, (json) => {   //the param json represents the data
    json.people.map(person => {
      getJSON(wikiUrl + person.name, generateHTML); // adds the name to the url
    });
  });
  btn.style.display = 'none'
});