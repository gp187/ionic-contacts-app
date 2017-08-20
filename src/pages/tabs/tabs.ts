import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import {ContactProvider} from '../../providers/contact/contact';
import {Events} from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  totalContacts;

  constructor(
    private cp: ContactProvider,
    public events: Events
  ) {

    this.events.subscribe('list:items:total', x => {
      this.totalContacts = x;
    });
  }
}
