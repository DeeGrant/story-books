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

function editIcon(storyUser, loggedUser, storyId, floating = true) {
    if (storyUser._id.toString() === loggedUser._id.toString()) {
        return `<a href="/stories/edit/${storyId}" class="${floating ? 'btn-floating ': ''}halfway-fab blue"><i class="fas fa-edit fa-small"></i></a>`
    }
    return ''
}

function select(selected, options) {
    return options
        .fn(this)
        .replace(
            new RegExp(' value="' + selected + '"'),
            '$& selected="selected"'
        )
        .replace(
            new RegExp('>' + selected + '</options>'),
            ' selected="selected"$&'
        )
}

module.exports = {
    formatDate,
    truncate,
    stripTags,
    editIcon,
    select,
}