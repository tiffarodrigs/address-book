// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = {};
  this.currentId = 0;
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts[contact.id] = contact;
};

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
};

AddressBook.prototype.findContact = function(id) {
  if (this.contacts[id] != undefined) {
    return this.contacts[id];
  }
  return false;
};

AddressBook.prototype.deleteContact = function(id) {
  if (this.contacts[id] === undefined) {
    return false;
  }
  delete this.contacts[id];
  return true;
};

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber, email, physAddress, workAddress, homeAddress) {
  this.firstName = firstName;
  this.lastName = lastName
  this.phoneNumber = phoneNumber;
  this.email = email;
  this.physAddress = physAddress;
  this.address = new Address(workAddress, homeAddress);

}


Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
};


function Address(workAddress,homeAddress){
  this.workAddress = workAddress;
  this.homeAddress = homeAddress;
  
}

/*function Address(type, address_1, address_2, city, state, zip){
  this.type = type;
  this.address_1 = address_1;
  this.address_2 = address_2;
  this.city = city;
  this.state = state;
  this.zip = zip;
}*/
// User Interface Logic ---------
let addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  let contactsList = $("ul#contacts");
  let htmlForContactInfo = "";
  Object.keys(addressBookToDisplay.contacts).forEach(function(key) {
    const contact = addressBookToDisplay.findContact(key);
    console.log("contact",contact);
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
}

function showContact(contactId) {
  const contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".email").html(contact.email);
  $(".physical-address").html(contact.physAddress);
  console.log("home" ,contact.address.homeAddress);
  //if(contact.address.homeAddress==="")
  //{
  //  hideField();
  //}

  displayField( ".home-address", contact.address.homeAddress);
  displayField( ".workTag",".work-address", contact.address.workAddress);
  //$(".home-address").html(contact.address.homeAddress);
  //$(".work-address").html(contact.address.workAddress);
  let buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" +  + contact.id + ">Delete</button>");
}

function displayField( selector1, selector2,contactProperty)  {
  if(contactProperty === "")  {
    console.log("1" +selector1);
    console.log("1" +selector2);
    console.log("2" +contactProperty);
    //$("#show-contact").not( selector );
    $( selector1 ).remove();

  }
  else{
    $(selector2).html(contactProperty);
  }
}
  
  
  /*function hideField(contact.address.homeAddress,contact.address.workAddress)
  if(homeAddress === "")
  {
    $( "#show-contact" ).not(.home-address )
  }
  if(workAddress === "")
  {
    $( "#show-contact" ).not(.work-address )
  }*/



function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    showContact(this.id);
  });
  // Code below here is new!
  $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
}

$(document).ready(function() {
  attachContactListeners();
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    const inputtedFirstName = $("input#new-first-name").val();
    const inputtedLastName = $("input#new-last-name").val();
    const inputtedPhoneNumber = $("input#new-phone-number").val();
    const inputtedEmail = $("input#new-email").val();
    const inputtedPhysAddress = $("input#new-physAddress").val();
    const inputtedWorkAddress = $("input#new-workAddress").val();
    const inputtedHomeAddress = $("input#new-homeAddress").val();

    // The next three lines are new:
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-email").val("");
    $("input#new-physAddress").val("");
    $("input#new-workAddress").val("");
    $("input#new-homeAddress").val("");
    


    let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedEmail, inputtedPhysAddress,inputtedWorkAddress,inputtedHomeAddress);
    //let address=new address()
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  });
});
