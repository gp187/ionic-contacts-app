import { Component } from '@angular/core';
import {LoadingController, NavController} from 'ionic-angular';
import {ContactProvider} from '../../providers/contact/contact';
import {HomePage} from '../home/home';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(
    public navCtrl: NavController,
    private cp: ContactProvider,
    public loadingCtrl: LoadingController
  ) {

  }

  /**
   * Generate 1000 contacts
   */
  public generate(): void {
    let loader = this.loadingCtrl.create({
      content: "Generating contacts..."
    });
    loader.present();

    this.cp.generateContacts(1000)
      .then(ok => {
        this.cp.showAlert("Ok", "Contacts generated");
        this.navCtrl.goToRoot({});
        loader.dismissAll();
      })
      .catch(err => {
        this.cp.showAlert("Error", "Cannot generate contacts");
        loader.dismissAll();
      })
  }

  /**
   * Remove
   */
  public removeAll() {
    let loader = this.loadingCtrl.create({
      content: "Removing ..."
    });
    loader.present();
    this.cp.clearAll()
      .then(ok => {
        this.cp.showAlert("Ok", "All contacts removed")
        this.navCtrl.push(HomePage)
        loader.dismissAll()
      })
      .catch(err => {
        this.cp.showAlert("Error", "Cannot remove contacts")
        loader.dismissAll()
      })
  }
}
