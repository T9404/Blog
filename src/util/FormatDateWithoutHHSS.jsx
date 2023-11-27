function formatDateWithoutHHSS(timestamp) {
    const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    };
    
    try {
        const formattedDate = new Intl.DateTimeFormat('ru-RU', options).format(new Date(timestamp));
        return formattedDate.replace(',', '').replaceAll("/", ".");
    } catch (e) {
        console.log(e);
        console.log(timestamp);
        return timestamp; // Return the original timestamp if formatting fails
    }
}

export default formatDateWithoutHHSS;