import Model from "react-native-models";

export default class Cars extends Model {
    // className used instead name because babel replaces him at run-time.
    static get className() {
        return "Cars";
    }

    constructor(id = 0, lease = false, kenteken = '', fuel = '', kmStart = '', kmEnd = '', remarks = '') {
        super({
            id: "Number",
            lease: "Boolean",
            kenteken: "String",
            fuel: "String",
            kmStart: "String",
            kmEnd: "String",
            remarks: "String",
        });

        this.id = id; 
        this.lease = lease; 
        this.kenteken = kenteken; 
        this.fuel = fuel; 
        this.kmStart = kmStart; 
        this.kmEnd = kmEnd; 
        this.remarks = remarks;

        // or with validation of type
        this.setId(id);
        this.setLease(lease);
        this.setKenteken(kenteken);
        this.setFuel(fuel);
        this.setKmStart(kmStart);
        this.setKmEnd(kmEnd);
        this.setRemarks(remarks);
    }

    test() {

    }
}