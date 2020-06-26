import Model from "react-native-models";

export default class Cars extends Model {
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