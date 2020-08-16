const personaContainer = document.getElementById('persona-container')
const personasPath = "http://localhost:3000/api/v1/personas"

document.addEventListener('DOMContentLoaded', () => {
  getPersonas()

  const createPersonasForm = document.querySelector("#persona-form-container")

  createPersonasForm.addEventListener("submit", (e) => createFormHandler(e))
})

function getPersonas() {
  fetch(personasPath)
  .then(response => response.json())
  .then(personas => {
    personas.data.forEach(persona => {
      const personaMarkup = `
        <div data-id=${persona.attributes.id}>
          <h3><span>Persona Name: ${persona.attributes.first_name} ${persona.attributes.last_name}</span></h3>
          <h4><span>Date of Birth: ${persona.attributes.dob}</span></h4>
          <h4><span>Sex: ${persona.attributes.sex}</span></h4>
          <h4><span>Race: ${persona.attributes.race}</span></h4>
          <h4><span>Faction Name: ${persona.attributes.faction.name}</span></h4>
          <h4><span>Belongs to Member: ${persona.attributes.member.name}</span></h4>
          <button data-id=${personas.id}>edit</button>
        </div>
        <br><br>
      `;
      document.querySelector('#personas-container').innerHTML += personaMarkup
    })
  })
}

function createFormHandler(e) {
  e.preventDefault()
  const firstNameInput = document.querySelector('#input-first-name').value
  const lastNameInput = document.querySelector('#input-last-name').value
  const dobInput = document.querySelector('#input-dob').value
  const sexInput = document.querySelector('#input-sex').value
  const raceInput = document.querySelector('#input-race').value
  const factionInput = document.querySelector('#select-factions').value
  const memberInput = document.querySelector('#select-members').value
  postFetch(firstNameInput, lastNameInput, dobInput, sexInput, raceInput, factionInput, memberInput) 
}


function postFetch(first_name, last_name, dob, sex, race, faction_id, member_id) {
 
  const bodyData = {first_name, last_name, dob, sex, race, faction_id, member_id}

  fetch(personasPath, {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(bodyData)
  })
  .then(response => response.json())
  .then(persona => {
  
    const personaData = persona.data.attributes
    const personaMarkup = `
      <div data-id=${persona.id}>
        <h3><span>Persona Name: ${personaData.first_name} ${personaData.last_name}</span></h3>
        <h4><span>Date of Birth: ${personaData.dob}</span></h4>
        <h4><span>Sex: ${personaData.sex}</span></h4>
        <h4><span>Race: ${personaData.race}</span></h4>
        <h4><span>Faction Name: ${personaData.faction.name}</span></h4>
        <h4><span>Belongs to Member: ${personaData.member.name}</span></h4>
        <button data-id=${personaData.id}>Edit</button>
      </div>
    `;
    document.querySelector('#personas-container').innerHTML += personaMarkup;
  })
}