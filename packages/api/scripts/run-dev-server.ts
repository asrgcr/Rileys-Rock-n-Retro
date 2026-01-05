import express from "express";
import { Context, LambdaFunctionURLEventWithIAMAuthorizer } from "aws-lambda";
import getRawBody from "raw-body";
import {setupEnvironment} from "./set-env-vars";

console.log("🚀 run-dev-server.ts starting...");

try {
    await setupEnvironment();
} catch (err) {
    console.error("Startup failed", err);
}

const app = express();
const uiLocalHost = "http://localhost:8080";
const userAlias = process.env.USER!;

app.use((req, res, next) => {
    console.log(req.path);
    res.setHeader("Access-Control-Allow-Origin", uiLocalHost);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Session-Token");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    if (req.method === "OPTIONS") {
        res.sendStatus(204);
        return;
    }
    next();
})

app.use("/api", async (req, res) => {
    const body = (await getRawBody(req)).toString("utf-8");
    const path = req.path;

    const { handler } = await import("../src")

    const handlerResponse = await handler(
        {
            body,
            headers: {["x-forwarded-user"]: userAlias, "content-type": "application/json"},
            requestContext: { http: { method: req.method!, path }},
            rawPath: path,
            rawQueryString: req.url?.split("?")[1] ?? "",
            routeKey: path,
            version: "2.0"
        } as unknown as LambdaFunctionURLEventWithIAMAuthorizer,
        undefined as unknown as Context
    )
    res.writeHead(handlerResponse.statusCode!, { "content-type": "application/json" });
    res.write(handlerResponse.body);
    res.end();
})

app.listen(3000, () => {
    console.log("API server is running at http://localhost:3000");
});