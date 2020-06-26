import Model from "react-native-models";

export default class Ride extends Model {
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
}