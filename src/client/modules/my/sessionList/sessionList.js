import { LightningElement } from 'lwc';
import { getSessions } from 'data/sessionService';
export default class SessionList extends LightningElement {
  sessions = [];
  f1=false;
  connectedCallback() {
    getSessions().then(result => {
      this.sessions = this.allSessions = result;
    });
  }

  handleSearchKeyInput(event) {
    const searchKey = event.target.value.toLowerCase();
    this.sessions = this.allSessions.filter(
      session => session.name.toLowerCase().includes(searchKey)
    );
  }
  handleSessionClick(event) {
    const index = event.currentTarget.dataset.index;
    const navigateEvent = new CustomEvent('navigate', {
      detail: {
        state: 'details',
        sessionId: this.sessions[index].id
      }
    });
    this.dispatchEvent(navigateEvent);
  }

  handleCheckMarkInput(event) {
    this.f1= !this.f1;
    const value1= event.currentTarget.value;
    console.log("checkbox value",this.f1);
    
  }
}