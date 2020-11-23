module.exports = {
    firebaseDateToJSDate: (dateObj, options) => {
        let milliseconds = 0;
        milliseconds += dateObj._seconds * 1000;
        milliseconds += Math.floor(dateObj._nanoseconds / 1000000);
        return new Date(milliseconds).toLocaleDateString("default", options)
    }
}