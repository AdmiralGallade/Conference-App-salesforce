import { LightningElement } from 'lwc';
import { getSessions } from 'data/sessionService';
export default class SessionList extends LightningElement {
  sessions = [];
  connectedCallback() {
    getSessions().then(result => {
      this.sessions = this.allSessions = result;
    });
  }
}