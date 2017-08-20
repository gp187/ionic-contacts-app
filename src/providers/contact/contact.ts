import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage'
import {AppInterface} from '../../app/app.interface';
import * as randomstring from 'randomstring';
import {AlertController, Events} from 'ionic-angular';




@Injectable()
export class ContactProvider {

  constructor(
    private storage: Storage,
    public alertCtrl: AlertController,
    public events: Events
  ) {}

  /**
   * Get an item by key
   * @param {string} key
   * @returns {Promise<AppInterface.Contact>}
   */
  public get(key: string): Promise<AppInterface.Contact> {
    return this.storage.get(key);
  }

  /**
   * Remove an item by key
   *
   * @param {string} key
   * @returns {Promise<boolean>}
   */
  public remove(key: string): Promise<boolean> {
    return this.storage.remove(key);
  }

  /**
   * Save new item or overwrite existing item
   *
   * @param {string} key
   * @param {AppInterface.Contact} data
   * @returns {Promise<boolean>}
   */
  public update(key: string, data: AppInterface.Contact): Promise<boolean> {
      return this.storage.set(
        key,
        data
      );
  }

  /**
   * List all names and IDs
   *    -- quick list
   *    -- search
   *
   * @returns {Promise<AppInterface.ListItem[]>}
   */
  public list(): Promise<AppInterface.ListItem[]> {
    const items = <AppInterface.ListItem[]>[];
    return this.storage.forEach((v, k, i) => {
        items.push(<AppInterface.ListItem>{
          index: i,
          first_name: v.first_name,
          last_name: v.last_name,
          key: k
        });
      })
      .then(x => {
        this.events.publish('list:items:total', items.length);
        return items.sort(function(a, b){
          if(a.first_name < b.first_name) return -1;
          if(a.first_name > b.first_name) return 1;
          return 0;
        });
      })
  }

  /**
   * Generate random contacts to mess with
   *
   *
   * @param {number} no
   * @dev -- remove in prod!
   */
  public generateContacts(no: number) {
    return new Promise((res, rej) => {
      const add = (i: number) => {
        if (i >= no) {
          res({ok: true, created: i});
        }else {
            // -->Create: new contact with random name
            const contact = AppInterface.newContactData();
            contact.first_name = randomstring.generate({length: 5, charset: 'alphabetic' });
            contact.last_name = randomstring.generate({length: 5, charset: 'alphabetic' });

            const ph = AppInterface.newPhoneNumber();
            ph.phone = randomstring.generate({length: 8, charset: 'numeric' });

            contact.phone_numbers[0] = ph;

            // -->Set: in db
            this.storage.set(
              AppInterface.generateId(contact.first_name, contact.last_name),
              contact
            )
            .then(() => {
              // -->Loop
              add(++i);
            })
            .catch(rej)
        }
      };
      add(0);
    });
  }

  /**
   * Clear all the db
   * @returns {Promise<any>}
   */
  public clearAll() {
    return this.storage.clear();
  }

  /**
   * Show an alert
   * @param {string} title
   * @param {string} subTitle
   * @param {string[]} buttons
   * @returns {Promise<any>}
   */
  public showAlert(title: string, subTitle: string, buttons = ['OK']): Promise<any> {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: buttons
    });
    return alert.present();
  }
}
