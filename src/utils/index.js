export const formatTime = (UNIX_timestamp) => {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var ampm = hour >= 12 ? 'pm' : 'am';
    hour = hour % 12;
    hour = hour ? hour : 12;
    var min = a.getMinutes();
    min = min < 10 ? '0' + min : min;
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ' ' + ampm;
    return time;
}

export const epochTime = () => {
    return Math.floor(new Date().getTime() / 1000.0)
}