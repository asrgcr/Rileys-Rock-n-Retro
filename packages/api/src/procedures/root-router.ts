import { createRouter } from "../helpers/trpc"

import { getCurrentUser } from "./get-current-user";
import {getHours} from "./get-hours";

export const rootRouter = createRouter({
    getCurrentUser,
    getHours,
})