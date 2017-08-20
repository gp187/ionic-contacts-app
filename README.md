## Contacty - The contacts app

**Demo only**

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
