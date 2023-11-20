function formatDateTime(timestamp) {
    const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    };
    
    const formattedDate = new Intl.DateTimeFormat('ru-RU', options).format(new Date(timestamp));
    return formattedDate.replace(',', '').replaceAll("/", ".");
}

export default formatDateTime;