var sham = require('shamjs')
var listData = sham.g(123, function (index) {
    var number = index + 1
    return {
        id: number,
        text: number
    }
})
module.exports = function (request, callback, speed) {
    setTimeout(function () {
        callback.done(
            sham.q(listData, {
                page: request.page,
                filter: function (item) {
                    return sham.query.fuzzy(item.text, request.searchKeyword)
                },
                pageSize: 5
            })
        )
    }, speed)
}
