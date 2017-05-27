var sham = require('shamjs')
var listData = sham.g(123, function (index) {
    var number = index + 1
    return {
        id: sham.r.id(),
        text: number + '-' + sham.r.word()
    }
})
module.exports = function (request, callback) {
    console.log('ajax:request', request)
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
    }, 500)
}
