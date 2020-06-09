import Model from "react-native-models";

export default class User extends Model {
    // className used instead name because babel replaces him at run-time.
    static get className() {
        return "User";
    }

    constructor(emailAddress = '') {
        super({
            emailAddress: "String",
        });

        this.emailAddress = emailAddress; 

        // or with validation of type
        this.setEmailAddress(emailAddress);
    }

    test() {

    }
}