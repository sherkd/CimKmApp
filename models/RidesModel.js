import Model from "react-native-models";

export default class Ride extends Model {
    // className used instead name because babel replaces him at run-time.
    static get className() {
        return "Ride";
    }

    constructor(id = 0, date = '', distance = '', diversionReason = '', fromAddress = '', fromPostalCode = '',
                 toAddress = '', toPostalCode = '', purposeReason = '', purposeType = '') {
        super({
            id: "Number",
            date: "String",
            distance: "String",
            diversionReason: "String",
            fromAddress: "String",
            fromPostalCode: "String",
            toAddress: "String",
            toPostalCode: "String",
            purposeReason: "String",
            purposeType: "String",
        });

        // Now MyModel has two members
        // this._id = null; 
        // this._date = null; 
        // this._distance = null; 
        // this._diversionReason = null; 
        // this._fromAddress = null; 
        // this._fromPostalCode = null; 
        // this._toAddress = null; 
        // this._toPostalCode = null; 
        // this._purposeReason = null; 
        // this._purposeType = null; 

        this.id = id; 
        this.date = date; 
        this.distance = distance; 
        this.diversionReason = diversionReason; 
        this.fromAddress = fromAddress; 
        this.fromPostalCode = fromPostalCode; 
        this.toAddress = toAddress; 
        this.toPostalCode = toPostalCode; 
        this.purposeReason = purposeReason; 
        this.purposeType = purposeType; 

        // this._id = id; 
        // this._date = date; 
        // this._distance = distance; 
        // this._diversionReason = diversionReason; 
        // this._fromAddress = fromAddress; 
        // this._fromPostalCode = fromPostalCode; 
        // this._toAddress = toAddress; 
        // this._toPostalCode = toPostalCode; 
        // this._purposeReason = purposeReason; 
        // this._purposeType = purposeType; 

        // or with validation of type
        this.setId(id);
        this.setDate(date);
        this.setDistance(distance);
        this.setDiversionReason(diversionReason);
        this.setFromAddress(fromAddress);
        this.setFromPostalCode(fromPostalCode);
        this.setToAddress(toAddress);
        this.setToPostalCode(toPostalCode);
        this.setPurposeReason(purposeReason);
        this.setPurposeType(purposeType);
    }

    test() {
    //     this.setA(1);
    //     this.setB("bar");

    //     const a = this.getA(); // a === 1
    //     const b = this.getB(); // b === "bar"

    //     try {
    //         this.setA("1");
    //     } catch (error) {
    //         return "exception";
    //     }

    //     return "no exception";
    }
}