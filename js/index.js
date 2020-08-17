const personaContainer = document.getElementById('persona-container')
const personasPath = "http://localhost:3000/api/v1/personas"
const membersPath = "http://localhost:3000/api/v1/members"

document.addEventListener('DOMContentLoaded', () => {
  

  const createPersonasForm = document.querySelector("#persona-form-container")
  const showPersonasButton = document.getElementById("show-personas-button")
  const showMembersButton = document.getElementById("show-members-button")

  createPersonasForm.addEventListener("submit", (e) => createFormHandler(e))

  showMembersButton.addEventListener("click", (e) => {
    document.clear()
    e.preventDefault
    getMembers()
  })

  showPersonasButton.addEventListener("click", (e) => {
    document.clear()
    e.preventDefault  
    getPersonas()
    renderForm()
  })


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
          <button class="edit" data-id=${personas.id}>Edit</button>
          <button class="delete" data-id=${personas.id}>Delete</button>
        </div>
        <br><br>
      `;
      document.querySelector('#personas-container').innerHTML += personaMarkup
    })
  })
}

function getMembers() {
  
  document.clear()
  fetch(membersPath)
  .then(response => response.json())
  .then(members => {
    members.data.forEach(member => {
      const membersMarkup = `
        <div data-id=${member.attributes.id}>
          <h3><span>Member Name: ${member.attributes.name}</span></h3>
          <h4><span>Email: ${member.attributes.email}</span></h4>
          <h4><span>Admin Level: ${member.attributes.admin_level}</span></h4>
          <button data-id=${members.id}>edit</button>
        </div>
        <br><br>
      `;
      document.querySelector('#members-container').innerHTML += membersMarkup
    })
  })
}

function createFormHandler(e) {
  console.log(e)
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
      document.getElementById("persona-form-container").innerHTML += addPersonaFormMarkup

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
        <button class="edit" data-id=${personaData.id}>Edit</button>
        <button class="delete" data-id=${personaData.id}>Delete</button>
      </div>
    `;
    document.querySelector('#personas-container').innerHTML += personaMarkup;
  })
}