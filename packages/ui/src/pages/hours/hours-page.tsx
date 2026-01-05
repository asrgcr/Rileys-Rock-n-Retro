import {FunctionComponent, useState} from "react";
import {Cards, Container, Link, SpaceBetween, TextContent} from "@cloudscape-design/components";
import { CollapsibleCalendar } from "../../components/collapsible-calendar";
import {useTRPC} from "../../helpers/trpc";
import {useQuery} from "@tanstack/react-query";
import type {StoreInfo} from "@website/api/src/schemas/store-info";

const getWeek = (dateString: string): string => {
    const [year, month, day] = dateString.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    date.setHours(0, 0, 0, 0);

    const sunday = new Date(date);
    sunday.setDate(date.getDate() - date.getDay());

    const jan1 = new Date(year, 0, 1);
    jan1.setHours(0, 0, 0, 0);

    const nextJan1 = new Date(year + 1, 0, 1);
    nextJan1.setHours(0, 0, 0, 0);

    const jan1WeekStart = new Date(jan1);
    jan1WeekStart.setDate(jan1.getDate() - jan1.getDay());

    const nextJan1WeekStart = new Date(nextJan1);
    nextJan1WeekStart.setDate(nextJan1.getDate() - nextJan1.getDay());

    if (sunday < jan1WeekStart) {
        return getWeek(`${year - 1}-12-31`);
    }

    if (sunday >= nextJan1WeekStart) {
        return `${year + 1}:01`;
    }

    const diffInMs = sunday.getTime() - jan1WeekStart.getTime();
    const weekNumber = Math.floor(diffInMs / (7 * 24 * 60 * 60 * 1000)) + 1;

    return `${year}:${String(weekNumber).padStart(2, "0")}`;
};

export const HoursPage: FunctionComponent = () => {
    const [value, setValue] = useState(new Date().toISOString().split("T")[0]);
    const trpc = useTRPC()
    const { data: rawData } = useQuery(trpc.getHours.queryOptions({ week: getWeek(value) }));
    const data = rawData as StoreInfo | undefined;

    const [year, month, day] = value.split("-").map(Number);
    const selectedDate = new Date(year, month - 1, day);
    const firstDay = new Date(selectedDate)
    firstDay.setDate(selectedDate.getDate() - selectedDate.getDay())

    const hoursArray = () => {
        if (!data?.dataValue) return [];
        const dayOrder = [
            "sunday",
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday",
        ];

        const days = data.dataValue as Record<
            (typeof dayOrder)[number],
            { open: string; close: string; isOpen: boolean }
        >;

        return dayOrder.map((day, i) => {
            const dayInfo = days[day];
            const date = new Date(firstDay);
            date.setDate(firstDay.getDate() + i);

            const dateLabel = date.toLocaleDateString("en-US", {
                month: "2-digit",
                day: "2-digit",
            });

            const hours =
                dayInfo?.isOpen && dayInfo.open && dayInfo.close
                    ? `${dayInfo.open} – ${dayInfo.close}`
                    : "Closed";

            return {
                name: `${day[0].toUpperCase() + day.slice(1)} – ${dateLabel}`,
                hours,
                id: date
            };
        });
    }
    return (
        <div>
            <Container header={<h1 className={"max-w-[calc(100%-4rem)] justify-self-center font-bold"}>Come visit us!</h1>}>
                <SpaceBetween size={"xxl"} alignItems={"center"} direction={"vertical"}>
                    <SpaceBetween size={"m"} alignItems={"center"} direction={"horizontal"}>
                        <TextContent><h3>Hours</h3></TextContent>
                        <CollapsibleCalendar value={value} setValue={setValue}/>
                    </SpaceBetween>
                    <Cards
                        ariaLabels={{
                            itemSelectionLabel: (e, i) => `select ${i.name}`,
                            selectionGroupLabel: "Item selection"
                        }}
                        cardDefinition={{
                            header: item => (
                                <Link href="#" fontSize="heading-m">
                                    {item.name}
                                </Link>
                            ),
                            sections: [
                                {
                                    id: "hours",
                                    header: "Hours",
                                    content: item => item.hours
                                }
                            ]
                        }}
                        cardsPerRow={[
                            { cards: 1 },
                            { minWidth: 500, cards: 7 }
                        ]}
                        items={hoursArray()}
                        loadingText="Loading resources"
                    />
                    <TextContent>
                        <SpaceBetween size={"s"} alignItems={"center"} direction={"vertical"}>
                            <h3>Location</h3>
                            <Link
                              external
                              href={"https://maps.app.goo.gl/PuTJqzKpVs6PiXJ7A"}
                              variant={"primary"}
                            >
                                5984 Cheviot Rd, Cincinnati, OH 45247
                            </Link>
                        </SpaceBetween>
                    </TextContent>
                    <TextContent>
                        <SpaceBetween size={"s"} alignItems={"center"} direction={"vertical"}>
                            <h3>Social Media</h3>
                            <SpaceBetween size={"s"} alignItems={"center"} direction={"horizontal"}>
                                <a href="http://facebook.com/rileysrocknretro" target="_blank">
                                    <img src={"/Facebook.png"} alt={"Facebook"} style={{width: 30}} />
                                </a>
                                <a href="http://www.instagram.com/rileysrocknretro" target="_blank">
                                    <img src={"/Instagram.png"} alt={"Instagram"} style={{width: 30}} />
                                </a>
                                <a href="http://www.tiktok.com/@rileys.rock.n.ret" target="_blank">
                                    <img src={"/Tiktok.png"} alt={"TikTok"} style={{width: 30}} />
                                </a>
                            </SpaceBetween>
                        </SpaceBetween>
                    </TextContent>
                </SpaceBetween>
            </Container>
        </div>
    )
}