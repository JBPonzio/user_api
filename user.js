class User {

    constructor(username, firstname, lastname) {
            this.username = username;
            this.firstname = firstname;
            this.lastname = lastname;
    };

    static capitalize(lastname) {
        return lastname.toUpperCase();
    }
}

module.exports = User;