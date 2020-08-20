class Persona {

  constructor(id, personaAttributes) {
    this.id = id
    this.first_name = personaAttributes.first_name
    this.last_name = personaAttributes.last_name
    this.dob = personaAttributes.dob
    this.sex = personaAttributes.sex
    this.race = personaAttributes.race
    this.faction_id = personaAttributes.faction_id
    this.member_id = personaAttributes.member_id
    this.faction_name = personaAttributes.faction.name
    this.member_name = personaAttributes.member.name
    Persona.all.push(this)    
  }

  renderPersonaCard() {
    
    return `
    <div data-id=${this.id}>
      <h3><span>Persona Name: ${this.first_name} ${this.last_name}</span></h3>
      <h4><span>Date of Birth: ${this.dob}</span></h4>
      <h4><span>Sex: ${this.sex}</span></h4>
      <h4><span>Race: ${this.race}</span></h4>
      <h4><span>Faction Name: ${this.faction_name}</span></h4>
      <h4><span>Belongs to Member: ${this.member_name}</span></h4>
      <button class="edit" data-id=${this.id}>Edit</button>
      <button class="delete" data-id=${this.id}>Delete</button>
    </div>
  `;
  }

  static findByFactionName(input) {
    Persona.searchResults.length=0
    Persona.searchResults.push(this.all.filter(persona => persona.faction_name === input))
      return Persona.searchResults
  }




}
Persona.searchResults = []
Persona.all = []