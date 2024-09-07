export function formatDate(dateString: string | Date): string {
    const date = new Date(dateString);
    const days = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const day = date.getDate();
    const month = days[date.getMonth()];
    const year = date.getFullYear();

    // Determine the ordinal suffix
    function getOrdinalSuffix(day: number) {
        if (day >= 11 && day <= 13) return 'th'; // Special case for 11th, 12th, 13th
        switch (day % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    }

    const suffix = getOrdinalSuffix(day);

    return `${day}${suffix} ${month} ${year}`;
}

export function parseDateString(dateString: string): Date {
    // Define a regular expression to extract the day, month, and year
    const datePattern = /^(\d+)(?:st|nd|rd|th)? (\w+) (\d{4})$/;
    const match = dateString.match(datePattern);

    if (!match) {
        throw new Error("Invalid date format. Expected format: '7th September 2024'");
    }

    const [, day, monthName, year] = match;

    // Map month names to month numbers (0-based index for JavaScript Date)
    const monthNames: { [key: string]: number } = {
        January: 0,
        February: 1,
        March: 2,
        April: 3,
        May: 4,
        June: 5,
        July: 6,
        August: 7,
        September: 8,
        October: 9,
        November: 10,
        December: 11
    };

    const month = monthNames[monthName];
    if (month === undefined) {
        throw new Error(`Invalid month name: ${monthName}`);
    }

    // Create and return the Date object
    return new Date(parseInt(year, 10), month, parseInt(day, 10));
}

// Example usage
const dateStr = "7th September 2024";
const dateObj = parseDateString(dateStr);
console.log(dateObj); // Outputs: Sat Sep 07 2024 00:00:00 GMT+0000 (Coordinated Universal Time)


