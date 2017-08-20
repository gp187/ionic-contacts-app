/**
 *    AppInterface holding all needed data schemes
 *
 */
import * as randomstring from 'randomstring';


export namespace AppInterface {
  export interface Contact {
    first_name: string
    last_name: string
    address: Address
    phone_numbers: PhoneNumber[]
  }
  export interface Address {
    address_line_1: string
    address_line_2: string
    city: string
    county: string
    zip: string
    country: string
  }
  export interface PhoneNumber{
    type: PhoneNumberType.MOBILE
    phone: number
  }
  export enum PhoneNumberType {
    // Typescript 2.4 allows enum to be string, but we'll just use classic
    MOBILE = 0,
    WORK = 1,
    HOME = 2
  }
  export interface ListItem {
    index: number
    key: string
    first_name: string
    last_name: string
  }
  export function newContactData(): Contact {
    return {
      first_name: '',
      last_name: '',
      address: {
        address_line_1: '',
        address_line_2: '',
        city: '',
        county: '',
        zip: '',
        country: ''
      },
      phone_numbers: [
        AppInterface.newPhoneNumber()
      ]
    }
  }
  export function newPhoneNumber(): PhoneNumber {
    return {
      type: PhoneNumberType.MOBILE,
      phone: 0
    }
  }
  export function generateId(... args: string[]): string {
    // there are much better ways to do this, but for the sake of comfort, let's go with it
    return randomstring.generate({
      length: 6,
      charset: 'alphabetic'
    }) + '-' + args
                .map(n => n.toLowerCase().replace(/[^a-zA-Z ]/g, ""))
                .join('-');
  }
}
