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

const data2 = {
    dataType: "HOURS#2026:11",
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
            close: "4pm",
            isOpen: true,
        },
        friday: {
            open: "",
            close: "",
            isOpen: false,
        },
        saturday: {
            open: "12pm",
            close: "5pm",
            isOpen: true,
        },
    }
}

const weeks = [data,data2]


export const InsertHours = async () => {
    await Promise.all(
      weeks.map((week) => {
            ddb.send(
              new PutCommand({
                  TableName: "StoreInfo",
                  Item: storeInfo.parse(week),
              })
            )
            console.log(`Inserting ${week.dataType}`)
        }
      )
    );
};

await InsertHours()