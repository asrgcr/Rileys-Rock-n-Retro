import {
    CreateTableCommand,
    CreateTableCommandInput,
    ListTablesCommand
} from "@aws-sdk/client-dynamodb";
import {PutCommand, UpdateCommand} from "@aws-sdk/lib-dynamodb";
import dynamodbLocal from "dynamodb-local";
import {setupEnvironment} from "./set-env-vars";
import {storeInfo} from "../src/schemas/store-info";
import {ddb} from "../src/helpers/clients/dynamodb";

await setupEnvironment();

const {dynamoClient} = await import("../src/helpers/clients/dynamodb");

const { launch: launchDB, stop: stopDB } = dynamodbLocal;

const PORT = 8000;

const cleanup = () => {
    console.log("Shutting down DynamoDB...")
    stopDB(PORT)
    process.exit(0)
}

process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);
process.on("SIGBREAK", cleanup);
process.on("SIGHUP", cleanup);
process.on("SIGUSR2", cleanup);

if (process.platform === "win32") {
    const rl = (await import("readline")).createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.on("SIGINT", cleanup);
}

console.log("Starting DynamoDB...")
await launchDB(PORT, "C:\\Users\\minec\\WebstormProjects\\RileysRocknRetro_Pre-OpenSite\\packages\\api\\db_path")

async function createTable(command: CreateTableCommandInput ) {
    let attempts = 0;
    const maxAttempts = 10;
    while (attempts < maxAttempts) {
        try {
            const createCommand = new CreateTableCommand(command);
            const response = await dynamoClient.send(createCommand);
            console.log("✅ Table created:", response.TableDescription?.TableName);
            return;
        } catch (error: any) {
            attempts++;
            if (attempts === maxAttempts) {
                throw new Error("Failed to connect to DynamoDB after max attempts.");
            }
            if (error.name === "ResourceInUseException") {
                console.log("⚠️ Table already exists.", command.TableName);
                return;
            }
            console.log(`Connection attempt ${attempts} failed, retrying in 1 second...`, command.TableName)
            await new Promise((resolve) => setTimeout(resolve, 1000));
        }
    }
    throw new Error("Failed to connect to DynamoDB.");
}

async function waitForDynamoReady(): Promise<void> {
    let attempts = 0;
    const maxAttempts = 10;

    while (attempts < maxAttempts) {
        try {
            await dynamoClient.send(new ListTablesCommand({}));
            console.log("✅ DynamoDB is ready.");
            return;
        } catch (err) {
            attempts++;
            console.log(`⏳ Waiting for DynamoDB... (${attempts})`);
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }

    throw new Error("❌ DynamoDB did not become ready in time.");
}

const createStoreInfoTable: CreateTableCommandInput = {
    TableName: "StoreInfo",
    AttributeDefinitions: [
        { AttributeName: "dataType", AttributeType: "S" },
    ],
    KeySchema: [
        { AttributeName: "dataType", KeyType: "HASH" },
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5,
    },
};



const createTableCommands = [
    createStoreInfoTable
]

await waitForDynamoReady()

for (const command of createTableCommands) {
    await createTable(command);
    await new Promise(resolve => setTimeout(resolve, 500));
}

console.log("DynamoDB is running. use Ctrl+C to stop.")

await new Promise(() => {});
