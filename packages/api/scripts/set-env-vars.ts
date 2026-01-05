import {fromIni} from "@aws-sdk/credential-providers";

console.log("Setting environment variables")

export const setupEnvironment = async () => {
    const {accessKeyId, secretAccessKey, sessionToken} = await fromIni({profile: "dynamodblocal"})();
    process.env.AWS_REGION = "us-east-1";
    // process.env.DYNAMODB_REGION = "us-east-1";
    // process.env.DYNAMODB_ENDPOINT = "http://localhost:8000";
    // process.env.DYNAMODB_ACCESS_KEY = accessKeyId;
    // process.env.DYNAMODB_SECRET_ACCESS_KEY = secretAccessKey;
    // process.env.S3_REGION = "us-east-1";
    // process.env.S3_ACCESS_KEY = accessKeyId;
    // process.env.S3_SECRET_ACCESS_KEY = secretAccessKey;
    // process.env.AWS_ACCESS_KEY_ID = accessKeyId;
    // process.env.AWS_SECRET_ACCESS_KEY = secretAccessKey;
    // process.env.AWS_SESSION_TOKEN = sessionToken;
}