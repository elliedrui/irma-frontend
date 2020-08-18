class Member {

  constructor(id, memberAttributes) {
    this.id = id
    this.name = memberAttributes.name
    this.email = memberAttributes.email
    this.admin_level = memberAttributes.admin_level
    Member.all.push(this)
  }

  renderMemberCard() {
    return `
        <div data-id=${this.id}>
          <h3><span>Member Name: ${this.name}</span></h3>
          <h4><span>Email: ${this.email}</span></h4>
          <h4><span>Admin Level: ${this.admin_level}</span></h4>
          <button data-id=${this.id}>Edit</button>
          <button class="delete" data-id=${this.id}>Delete</button>
        </div>
        <br><br>
      `;
  }
}
Member.all = []