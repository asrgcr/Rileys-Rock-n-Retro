import { z } from 'zod'
import { procedure } from "../helpers/trpc";
import { ddb } from "../helpers/clients/dynamodb"
import {BatchGetItemCommand} from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb"

export const getHours = procedure("GetHours")
    .input(z.object({week: z.string()}))
    .query(async ({ ctx, input }) => {
        const weekKey = `HOURS#${input.week}`;
        const defaultKey = "HOURS#DEFAULT";

        const command = new BatchGetItemCommand({
            RequestItems: {
                StoreInfo: {
                    Keys: [
                        { dataType: { S: weekKey } },
                        { dataType: { S: defaultKey } },
                    ],
                },
            },
        });

        const response = await ddb.send(command);
        const items = response.Responses?.StoreInfo ?? [];

        const unmarshalled = items.map(item => unmarshall(item));
        const weekItem = unmarshalled.find(i => i.dataType === weekKey);
        const defaultItem = unmarshalled.find(i => i.dataType === defaultKey);

        if (!weekItem && !defaultItem) return null;
        if (!weekItem) return defaultItem;
        return {
            ...defaultItem,
            dataValue: {
                ...defaultItem?.dataValue,
                ...weekItem?.dataValue,
            },
        };
    });