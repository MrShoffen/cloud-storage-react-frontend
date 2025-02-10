

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23", // 24-часовой формат (без AM/PM)
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
    }).format(date).replace(",", ""); // Удаляем лишнюю запятую
};

export const extractSimpleName = (path) => {
    let sep = path.lastIndexOf("/", path.length - 2);
    return path.substring(sep + 1);

}