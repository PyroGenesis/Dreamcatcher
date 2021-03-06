const self = module.exports = {
    firebaseDateToJSDate: (dateObj, options) => {
        /**
         * Example of options:
         * {
                month: 'short',
                year: 'numeric'
         * }
         * More info here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
         */

        return self.firebaseDateToJSDateObj(dateObj).toLocaleDateString("default", options);
    },

    firebaseDateToJSDateObj: (dateObj) => {
        let milliseconds = 0;
        milliseconds += dateObj._seconds * 1000;
        milliseconds += Math.floor(dateObj._nanoseconds / 1000000);
        return new Date(milliseconds);
    }
}