var React = require('react')
var List = React.createClass({
    render: function () {
        var self = this
        var empty = self.props.data.length === 0
        var hasQueryParam = false
        if (self.props.lastTimeQuery) {
            hasQueryParam = Boolean(self.props.lastTimeQuery.searchKeyword)
        }
        return (
            <div>
            {
                empty?
                    hasQueryParam?
                    (
                        <div>
                            Not found: {self.props.lastTimeQuery.searchKeyword}
                            <button type="button" onClick={self.props.onClearSearch} >clearSearch</button>
                        </div>
                    ):
                    (
                        <div>Empty</div>
                    )
                :
                null
            }
            <ul>
            {
                self.props.data.map(function (item, key) {
                    return (
                        <li key={key} >
                            {item.text}
                        </li>
                    )
                })
            }
            </ul>
            </div>
        )
    }
})

module.exports = List
