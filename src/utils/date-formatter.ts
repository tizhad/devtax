export default function formattedDate(createdDate: string): string {
    const date: Date = new Date(createdDate);
    const today: Date = new Date();

    const options: Intl.DateTimeFormatOptions = {
        month: "long",
        day: "numeric",
        weekday: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
    };

    if (isToday(date, today)) {
        return `Today at ${date.toLocaleString("en-US", {hour: "numeric", minute: "numeric"})}`;
    } else {
        return `${date.toLocaleString("en-US", options)}`;
    }
}

function isToday(date: Date, today: Date): boolean {
    return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
    );
}


