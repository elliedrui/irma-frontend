const personasContainer = document.getElementById('personas-container');
const formContainer = document.getElementById('form-container');
const membersContainer = document.getElementById('members-container');
const personasPath = "http://localhost:3000/api/v1/personas";
const membersPath = "http://localhost:3000/api/v1/members";
const personaSearchButton = document.getElementById('input-persona-faction-button')

document.addEventListener('DOMContentLoaded', () => {
  
  const createPersonasForm = document.querySelector("#form-container")
  const showPersonasButton = document.getElementById("show-personas-button")
  const showMembersButton = document.getElementById("show-members-button")

  createPersonasForm.addEventListener("submit", (e) => createPersonaFormHandler(e))
  
  personaSearchButton.addEventListener("click", (e) => {
    e.preventDefault
    const factionNameSearch = document.getElementById('input-persona-faction').value
    const searchResults = Persona.findByFactionName(factionNameSearch)
    renderResults(searchResults)
  })

  showMembersButton.addEventListener("click", (e) => {
    e.preventDefault
    clearContainers()
    getMembers()
  })

  showPersonasButton.addEventListener("click", (e) => {
    e.preventDefault 
    clearContainers() 
    renderForm()
    getPersonas()
    
  })


})

function getPersonas() {
  fetch(personasPath)
  .then(response => response.json())
  .then(personas => {
    personas.data.forEach(persona => {
      const personaData = persona.attributes
      const newPersona = new Persona(persona.id, personaData)
      personasContainer.innerHTML += newPersona.renderPersonaCard();
    })
  })
};

function getMembers() {
  fetch(membersPath)
  .then(response => response.json())
  .then(members => {
    members.data.forEach(member => {
      const memberData = member.attributes
      const newMember = new Member(member.id, memberData)
      membersContainer.innerHTML += newMember.renderMemberCard();
    })
  })
};

function createPersonaFormHandler(e) {
  
  e.preventDefault()
  const firstNameInput = document.querySelector('#input-first-name').value
  const lastNameInput = document.querySelector('#input-last-name').value
  const dobInput = document.querySelector('#input-dob').value
  const sexInput = document.querySelector('#input-sex').value
  const raceInput = document.querySelector('#input-race').value
  const factionInput = document.querySelector('#select-factions').value
  const memberInput = document.querySelector('#select-members').value
  personaPostFetch(firstNameInput, lastNameInput, dobInput, sexInput, raceInput, factionInput, memberInput) 
};



function clearContainers() {
  membersContainer.innerHTML = ''
  personasContainer.innerHTML = ''
  formContainer.innerHTML = ''
};

function renderResults(results) {
  const resultsList = document.getElementById('search-results-list')
  
  results.forEach(function(personas) {
    personas.forEach(function(persona) {
      const resultsMarkup = `
      <li>
        <div data-id=${persona.id}>
          <h3><span>Persona Name: ${persona.first_name} ${persona.last_name}</span></h3>
          <h4><span>Date of Birth: ${persona.dob}</span></h4>
          <h4><span>Sex: ${persona.sex}</span></h4>
          <h4><span>Race: ${persona.race}</span></h4>
          <h4><span>Faction Name: ${persona.faction_name}</span></h4>
          <h4><span>Belongs to Member: ${persona.member_name}</span></h4>
        </div>
      </li>
    `
    resultsList.innerHTML += resultsMarkup

    })
   
  })
  
}
function renderForm() {
  const addPersonaFormMarkup = `
  <p>Add A New Persona:</p>
  <form id="persona-form">
    <label>First Name:</label>
    <input id="input-first-name" type="text" name="first-name" value="">
    <br/>
    <label>Last Name:</label>
    <input id="input-last-name" type="text" name="last-name" value="">
    <br/>
    <label>Date of Birth:</label>
    <input id="input-dob" type="date" name="dob" value="">
    <br/>
    <label>Sex:</label>
    <input id="input-sex" type="text" name="sex" value="">
    <br/>
    <label>Race:</label>
    <input id="input-race" type="text" name="race" value="">
    <br/>
    <p>Choose A Faction </p>
    <select id="select-factions" name="factions">
      <option value="1">Los Santos Sheriff's Dept</option>
      <option value="2">Hustlers</option>
      <option value="3">Taxi</option>
      <option value="4">NONE</option>
    </select>
    <br><br>
    <select id="select-members" name="members">
      <option value="1">Wayne</option>
      <option value="2">Brendo</option>
      <option value="3">Fussler</option>
      <option value="4">NONE</option>
    </select>
    <br><br>
    <input type="submit" value="Create Persona">
  </form>
  `;
  formContainer.innerHTML += addPersonaFormMarkup
};

function personaPostFetch(first_name, last_name, dob, sex, race, faction_id, member_id) {
 
  const bodyData = {first_name, last_name, dob, sex, race, faction_id, member_id}

  fetch(personasPath, {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(bodyData)
  })
  .then(response => response.json())
  .then(persona => {
  
    const personaData = persona.data.attributes
    const newPersona = new Persona(persona.id, personaData)
    personasContainer.innerHTML += newPersona.renderPersonaCard();

  })

  

};