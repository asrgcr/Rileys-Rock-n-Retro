import {storeInfo} from "../src/schemas/store-info";
import {setupEnvironment} from "./set-env-vars";
await setupEnvironment()

const {ddb} = await import("../src/helpers/clients/dynamodb");
const {PutCommand} = await import ("@aws-sdk/lib-dynamodb");

const data = {
    dataType: "HOURS#DEFAULT",
    dataValue: {
        sunday: {
            open: "",
            close: "",
            isOpen: false,
        },
        monday: {
            open: "",
            close: "",
            isOpen: false,
        },
        tuesday: {
            open: "",
            close: "",
            isOpen: false,
        },
        wednesday: {
            open: "12pm",
            close: "7pm",
            isOpen: true,
        },
        thursday: {
            open: "12pm",
            close: "7pm",
            isOpen: true,
        },
        friday: {
            open: "12pm",
            close: "7pm",
            isOpen: true,
        },
        saturday: {
            open: "12pm",
            close: "5pm",
            isOpen: true,
        },
    }
}

const parsed = storeInfo.parse(data)

const insertStoreHours = new PutCommand({
    TableName: "StoreInfo",
    Item: parsed,
})

await ddb.send(insertStoreHours)