import { ZodString, z } from "zod";

const REGION_ENV_VARIABLE_KEY = "AWS_REGION";
const DYNAMODB_REGION_ENV_VARIABLE_KEY = "DYNAMODB_REGION";
const DYNAMODB_ENDPOINT_ENV_VARIABLE_KEY = "DYNAMODB_ENDPOINT";
const DYNAMODB_ACCESS_KEY_ID_ENV_VARIABLE_KEY = "DYNAMODB_ACCESS_KEY";
const DYNAMODB_SECRET_ACCESS_KEY_ENV_VARIABLE_KEY = "DYNAMODB_SECRET_ACCESS_KEY";
const S3_REGION_ENV_VARIABLE_KEY = "S3_REGION";
const S3_ACCESS_KEY_ID_ENV_VARIABLE_KEY = "S3_ACCESS_KEY";
const S3_SECRET_ACCESS_KEY_ENV_VARIABLE_KEY = "S3_SECRET_ACCESS_KEY";

const envVariableValidator = (key: string): ZodString => {
    const errorMessage = `Environment variable ${key} was not set`;
    return z.string({ required_error: errorMessage }).nonempty({ message: errorMessage });
};

const optionalEnvVariableValidator = (key: string) => z.union([envVariableValidator(key), z.undefined()]);
/**
 * A helper for accessing environment variables that have been verified to be present.
 */
export const environmentVariables = z
    .object({
        [REGION_ENV_VARIABLE_KEY]: envVariableValidator(REGION_ENV_VARIABLE_KEY),
        [DYNAMODB_REGION_ENV_VARIABLE_KEY]: optionalEnvVariableValidator(DYNAMODB_REGION_ENV_VARIABLE_KEY),
        [DYNAMODB_ENDPOINT_ENV_VARIABLE_KEY]: optionalEnvVariableValidator(DYNAMODB_ENDPOINT_ENV_VARIABLE_KEY),
        [DYNAMODB_ACCESS_KEY_ID_ENV_VARIABLE_KEY]: optionalEnvVariableValidator(DYNAMODB_ACCESS_KEY_ID_ENV_VARIABLE_KEY),
        [DYNAMODB_SECRET_ACCESS_KEY_ENV_VARIABLE_KEY]: optionalEnvVariableValidator(DYNAMODB_SECRET_ACCESS_KEY_ENV_VARIABLE_KEY),
        [S3_REGION_ENV_VARIABLE_KEY]: optionalEnvVariableValidator(S3_REGION_ENV_VARIABLE_KEY),
        [S3_ACCESS_KEY_ID_ENV_VARIABLE_KEY]: optionalEnvVariableValidator(S3_ACCESS_KEY_ID_ENV_VARIABLE_KEY),
        [S3_SECRET_ACCESS_KEY_ENV_VARIABLE_KEY]: optionalEnvVariableValidator(S3_SECRET_ACCESS_KEY_ENV_VARIABLE_KEY),
    })
    .transform((parsed) => ({
        region: parsed.AWS_REGION,
        dynamodb: {
            region: parsed.DYNAMODB_REGION,
            endpoint: parsed.DYNAMODB_ENDPOINT,
            accessKeyId: parsed.DYNAMODB_ACCESS_KEY,
            secretAccessKey: parsed.DYNAMODB_SECRET_ACCESS_KEY,
        },
        s3: {
            region: parsed.S3_REGION,
            accessKeyId: parsed.S3_ACCESS_KEY,
            secretAccessKey: parsed.S3_SECRET_ACCESS_KEY,
        }
    }))
    .parse(process.env);