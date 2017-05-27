var React = require('react')
var Paging = React.createClass({
    render: function () {
        var self = this
        return (
            <select value={self.props.page} onChange={function (e) {
                    self.props.onChange(e.target.value)
                }} >
                {
                    (function() {
                        let output = []
                        for (var i = 0; i<self.props.pageCount; i++) {
                            var number = i + 1
                            output.push(
                                <option key={number} value={number}>{number}</option>
                            )
                        }
                        return output
                    })()
                }
            </select>
        )
    }
})

module.exports = Paging
