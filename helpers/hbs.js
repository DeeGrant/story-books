const moment = require('moment')

function formatDate(date, format) {
    return moment(date).format(format)
}

function truncate(str, len) {
    if (str.length > len && str.length > 0) {
        let new_str = str.substr(0, len)
        new_str = str.substr(0, new_str.lastIndexOf(' '))
        new_str = new_str.length > 0 ? new_str : str.substr(0, len)
        return new_str + '...'
    }
    return str
}

function stripTags(input) {
    return input.replace(/<(?:.|\n)*?>/gm, ' ')
}

module.exports = {
    formatDate,
    truncate,
    stripTags
}