import Model from "react-native-models";

export default class Address extends Model {
    // className used instead name because babel replaces him at run-time.
    static get className() {
        return "Address";
    }

    constructor(id = 0, nickname = '', street = '', city = '', country = '', postalCode = '',
                 region = '') {
        super({
            id: "Number",
            nickname: "String",
            street: "String",
            city: "String",
            country: "String",
            postalCode: "String",
            region: "String",
        });

        this.id = id; 
        this.nickname = nickname; 
        this.street = street; 
        this.city = city; 
        this.country = country; 
        this.postalCode = postalCode; 
        this.region = region; 

        // or with validation of type
        this.setId(id);
        this.setNickname(nickname);
        this.setStreet(street);
        this.setCity(city);
        this.setCountry(country);
        this.setPostalCode(postalCode);
        this.setRegion(region);
    }

    test() {

    }
}