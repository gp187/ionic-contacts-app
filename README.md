## Contacty - The contacts app

**Demo only**
_this is not a boilerplate. It still needs unit testing config, ci integration, optimizations for different platforms 
and assets_


### Install

`
  git clone https://github.com/gp187/ionic-contacts-app
  cd ionic-contacts-app/
  npm install -g cordova ionic 
  npm install
  ionic serve
`

### To add iOS/Android platforms
`
  ionic cordova platform 
  ionic cordova platform add ios
  ionic cordova platform add android
  ionic cordova platform rm ios
`

### Features
- list contacts 
- show contact
  - add multiple phone numbers
- update/delete contact
- pull to refresh
- infinite slider


### Needs
- [ ] collect errors in `ErrorProvider`
- [ ] a search bar 
- [ ] after update return new data (so no refresh is needed)
- [ ] a better way to patch values for FromArray of numbers
` 
phone_numbers: {
  [type: string]: PhoneNumber
}
`
- [ ] check `navCtrl` for pop's and push's
- [ ] prevent adding other phone number until the previous is valid 
- [ ] validator for phone numbers
- [ ] enter, exit, navigate away events and clearing of loaded items
- [ ] checking db state

### Recommendations

- database upgrade: couchbase lite or at least pouchdb overlay or other kv store
