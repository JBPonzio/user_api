const User = require("../bo/user");

describe("test unitaire", function(){
    it("Met en majuscule", function() {
        let stringCapitalize = User.capitalize("string");
        if( stringCapitalize === "STRING") {
            console.log("Success")
        } else {
            console.log("Fail")
        }
    })
});

