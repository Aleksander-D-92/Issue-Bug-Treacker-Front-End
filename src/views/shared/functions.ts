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
    } else {
        return -1;
    }
}

function deleteAllCookies() {
    let cookies = document.cookie.split("; ");
    for (let c = 0; c < cookies.length; c++) {
        let d = window.location.hostname.split(".");
        while (d.length > 0) {
            let cookieBase = encodeURIComponent(cookies[c].split(";")[0].split("=")[0]) + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=' + d.join('.') + ' ;path=';
            let p = window.location.pathname.split('/');
            document.cookie = cookieBase + '/';
            while (p.length > 0) {
                document.cookie = cookieBase + p.join('/');
                p.pop();
            }
            d.shift();
        }
    }
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

export {formatDate, compareDates, deleteAllCookies, readCookieByKeyName}
