import type { IndexRouteObject, NonIndexRouteObject } from 'react-router';
import { PermissionWrapper } from "./helpers/permission-wrapper"
import type {RouteMetadata} from "./types/route.ts";
import { HomePage } from "./pages/home/home-page"
import {HoursPage} from "./pages/hours/hours-page";
import {EventsPage} from "./pages/events/events-page";

export const ROUTE_PATHS = {
    HOME: "/",
    HOURS: "/hours",
    EVENTS: "/events",
} as const;

export const HOME_ROUTE: RouteMetadata = {
    title: "Home",
    description: "Website Home page",
    path: ROUTE_PATHS.HOME,
};

export const HOURS_ROUTE: RouteMetadata = {
    title: "About Us",
    description: "Store Hours and Address",
    path: ROUTE_PATHS.HOURS,
}

export const EVENTS_ROUTE: RouteMetadata = {
    title: "Events",
    description: "Store Events",
    path: ROUTE_PATHS.EVENTS,
}

export const routeMetadata: RouteMetadata[] = [
    HOME_ROUTE,
    HOURS_ROUTE,
];

export const routes: (IndexRouteObject | NonIndexRouteObject)[] = [
    {
        path: ROUTE_PATHS.HOME,
        element: <PermissionWrapper />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: ROUTE_PATHS.HOURS,
                element: <HoursPage />
            },
            {
                path: ROUTE_PATHS.EVENTS,
                element: <EventsPage />
            }
        ]
    }
]