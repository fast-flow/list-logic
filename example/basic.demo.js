var React = require('react')
var Listlogic = require('list-logic').default
var App = React.createClass({
    getInitialState: function () {
        return {
            show: true
        }
    },
    render: function () {
        var self = this
        return (
            <div>
                {
                    self.state.show?
                    (
                        <Listlogic onClose={function() {
                                self.setState({
                                    show: false
                                })
                            }} >basic</Listlogic>
                    ):null
                }
            </div>
        )
    }
})
module.exports = App
