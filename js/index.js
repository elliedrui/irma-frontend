const memberContainer = document.getElementById('member-container')
const membersPath = "http://localhost:3000/api/v1/members"

document.addEventListener('DOMContentLoaded', () => {
  getMembers()
})

function getMembers() {
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