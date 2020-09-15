function formatDate(date: Date | undefined): string {
    if (date === undefined) {
        return '';
    }
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    let strings = date.toString().substring(0, 10).split('-').reverse();
    strings[1] = months[parseInt(strings[1]) - 1];
    return strings.join(" ").toString();
}

function compareDates(a: Date, b: Date): number {
    if (a > b) {
        return 1;
    } else if (b > a) {
        return -1;
    } else {
        return 0
    }
}

function capitalizeString(str: string | undefined): string {
    if (str === undefined) {
        return ''
    }
    return str.charAt(0).toUpperCase() + str.slice(1).toLocaleLowerCase()
}

function readCookieByKeyName(name: string) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

export {formatDate, compareDates, readCookieByKeyName, capitalizeString}
