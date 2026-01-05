import { z } from "zod";

export const WeeklyHoursSchema = z.object({
    sunday: z.object({
        open: z.string(),
        close: z.string(),
        isOpen: z.boolean(),
    }),
    monday: z.object({
        open: z.string(),
        close: z.string(),
        isOpen: z.boolean(),
    }),
    tuesday: z.object({
        open: z.string(),
        close: z.string(),
        isOpen: z.boolean(),
    }),
    wednesday: z.object({
        open: z.string(),
        close: z.string(),
        isOpen: z.boolean(),
    }),
    thursday: z.object({
        open: z.string(),
        close: z.string(),
        isOpen: z.boolean(),
    }),
    friday: z.object({
        open: z.string(),
        close: z.string(),
        isOpen: z.boolean(),
    }),
    saturday: z.object({
        open: z.string(),
        close: z.string(),
        isOpen: z.boolean(),
    })
})

export const storeInfo = z.object({
    dataType: z.string(),
    dataValue: z.union([z.string(), WeeklyHoursSchema]),
})

export type StoreInfo = z.infer<typeof storeInfo>;