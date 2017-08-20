import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Validators, FormBuilder, FormArray, FormGroup } from '@angular/forms';
import {isString} from 'ionic-angular/util/util';
import {ContactProvider} from '../../providers/contact/contact';
import {AppInterface} from '../../app/app.interface';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  public formGroup: FormGroup;
  public readonly status = {
    isNew: false,
    loading: true
  };
  private readonly key: string;
  private item: AppInterface.Contact;

  get phoneNumbers(): FormArray {
    return this.formGroup.get('phone_numbers') as FormArray;
  }
  get phoneTypes() {
    return Object.keys(AppInterface.PhoneNumberType)
      .filter(k => !isNaN(+k))
      .map(k => {
        return {key: k, value: AppInterface.PhoneNumberType[k]}
      })
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private fb: FormBuilder,
    private cp: ContactProvider
  ) {
    // -->Set: key
    this.key = this.navParams.get('key');

    // -->Check: if it's new or editable
    this.status.isNew = !isString(this.navParams.get('key'));

    // -->Init: a new form
    this.formGroup = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      address: this.fb.group({
        address_line_1: ['', Validators.required],
        address_line_2: '',
        city: ['', Validators.required],
        county: ['', Validators.required],
        zip: ['', Validators.required],
        country: ['', Validators.required],
      }),
      phone_numbers: this.fb.array([])
    });

    // -->Edit?
    if (!this.status.isNew)
      this.loadContact();
    else
      this.status.loading = false;

    // todo: add loader according to status
  }

  /**
   * If it's edit, then load the contact
   */
  public loadContact(): void {
      this.cp.get(this.key)
        .then(item => {
            // -->Set: item
            this.item = item;
            // -->Update: form
            this.formGroup.patchValue(this.item);
            // -->Update: numbers
            this.item.phone_numbers.forEach((v,i) => {
              this.phoneNumbers.push(this.fb.group(v))
            });
        })
        .catch(err => {
          console.log(err)
          return this.cp.showAlert("Error", "Cannot load data!")
        })
  }

  /**
   * Add a new phone number to this contact
   *
   * ***DEV*** check if last phone number in array is 0. If yes, don't push another one
   * ***DEV*** create a custom validator for the type of phone number accepted: prefix, length
   */
  public addPhoneNumber(): void {
    // -->Insert: new value
    this.phoneNumbers.push(this.fb.group({
      type: [AppInterface.PhoneNumberType.MOBILE, Validators.required],
      phone: [0, Validators.required]
    }))
  }

  /**
   * Remove existing phone number from array
   * @param {number} i
   */
  public removePhoneNumber(i: number): void {
    this.phoneNumbers.removeAt(i);
  }

  /**
   * Save the current contact
   *    -- new
   *    -- update
   */
  public save() {

    console.log(
      this.formGroup.value
    )

    this.cp.update(this.key, this.formGroup.value)
      .then(ok => {
        // return this.navCtrl.pop();
      })
      .catch(err => {
        return this.cp.showAlert("Error", "Cannot save data!")
      })
  }

  /**
   * Remove the current phone number
   */
  public remove() {
    this.cp.remove(this.key)
      .then(ok => {
        return this.navCtrl.pop();
      })
      .catch(err => {
        return this.cp.showAlert("Error", "Cannot load data!")
      })
  }
}
