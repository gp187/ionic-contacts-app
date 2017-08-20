import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { AppInterface } from '../../app/app.interface';
import { Storage } from '@ionic/storage'
import { ContactProvider } from '../../providers/contact/contact';
import { ContactPage } from '../contact/contact';

/**
 * Home page lander
 */

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public items: AppInterface.ListItem[] = [];
  private contacts: AppInterface.ListItem[] = [];
  private page = 0;
  private perPage = 50;

  constructor(
    public navCtrl: NavController,
    private storage: Storage,
    private cp: ContactProvider
  ) {
    // -->Get: full list of names and keys
    this.doRefresh();
    // -->Set: root
    // this.navCtrl.setRoot(HomePage);
  }

  /**
   * Refresh the feed
   */
  public doRefresh(refresher?): void {
    this.page = 0;
    this.cp.list()
      .then(contacts => {
        // -->Set: contacts
        this.contacts = contacts;
        // -->Page: the items
        this.items = this.contacts.slice(this.page * this.perPage, ++this.page * this.perPage);

        if (refresher)
          refresher.complete();
      })
  }

  /**
   * Load a contact in the edit/new page
   *
   * @param {string} key
   */
  public loadContact(key: string): void {
    this.navCtrl.push(ContactPage, {
      key: key
    })
    .catch(err => {
      // todo: dialog for error
    })
  }

  /**
   * Infinite scroll event with a little delay for show
   * @param ev
   */
  public scrollDown(ev): void {
    setTimeout(() => {
      // -->Load: more items
      this.items = this.items.concat(this.contacts.slice(this.page * this.perPage, ++this.page * this.perPage));
      // -->Complete: event
      ev.complete();
    }, 1000)
  }

}
