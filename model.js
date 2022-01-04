class Message{
  constructor(email,name,contact,message,){
    this.email=email,
    this.name=name,
    this.contact=contact,
    this.message=message
    this.validEmail = () => {
      return String(this.email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
  }
}

module.exports = Message