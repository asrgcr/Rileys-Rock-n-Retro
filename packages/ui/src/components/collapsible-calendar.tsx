import {FunctionComponent, useState} from "react";
import {Button, Calendar} from "@cloudscape-design/components";

interface CollapsibleCalendarProps {
    value: string;
    setValue: (value: string) => void;
}

export const CollapsibleCalendar: FunctionComponent<CollapsibleCalendarProps> = ({ value, setValue }: CollapsibleCalendarProps) => {
    const [visible, setVisible] = useState(false)
    return (
        <div className="flex flex-col items-center justify-center">
            {visible ? (
                <>
                    <Calendar
                        onChange={({ detail }) => setValue(detail.value)}
                        value={value}
                        isDateEnabled={date => date >= new Date(Date.now() - 24 * 60 * 60 * 1000)}
                    />
                    <Button children="Hide" onClick={() => setVisible(false)} />
                </>
            ) : (
                <Button children={`📅 ${value}`} onClick={() => setVisible(true)} />
            )}
        </div>
    )
}