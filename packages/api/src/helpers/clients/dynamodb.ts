import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { environmentVariables } from "../environment-variables";

const dbVars = environmentVariables.dynamodb;

let dbconfig = {};

if (![dbVars.secretAccessKey, dbVars.accessKeyId, dbVars.endpoint, dbVars.region].some((x) => x === undefined)) {
    dbconfig = dbVars;
}

export const dynamoClient = new DynamoDBClient(dbconfig);

export const ddb = DynamoDBDocumentClient.from(dynamoClient);