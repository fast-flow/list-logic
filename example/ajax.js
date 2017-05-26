var sham = require('shamjs')
var listData = sham.g(123, function (index) {
    return {
        id: sham.r.id(),
        text: sham.r.word()
    }
})
module.exports = function (request, callback) {
    console.log('ajax:request', request)
    setTimeout(function () {
        callback.done(
            sham.q(listData, {
                page: request.page,
                filter: function (item) {
                    return sham.query.fuzzy(item.id, request.searchKeyword)
                },
                pageSize: 10
            })
        )
    }, 300)
}
