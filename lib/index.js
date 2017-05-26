import extend from "extend"
/**
 * execution cycle
 * 1. search or changePage or clearSearch
 * 2. props.getQuery
 * 2. props.onFetchStart
 * 3. props.onFetch
 * 4. props.onRender
 * 5. props.onSearchEnd
 */
class ListLogic {
    constructor(props) {
        props.alias = props.alias || {
            page: 'page'
        }
        this.props = props
        this.lastTimeQuery
        this.query = {}
    }
    clearQuery = (page) => {
        const self = this
        var query = extend(true, {}, self.query)
        self.query = self.props.resetQuery(query)
        self.query[self.props.alias.page] = 1
        self._start()
    }
    changePage = (page) => {
        const self = this
        self.query[self.props.alias.page] = page
        self._start()
    }
    search = () => {
        const self = this
        let query = self.props.getQuery()
        if (JSON.stringify(query) !== JSON.stringify(self.lastTimeQuery)) {
            query[self.props.alias.page] = 1
        }
        self.query = query
        self._start()
    }
    _start = () => {
        const self = this
        self.props.onFetchStart(function onFetchStartNext() {
            let query = extend(true, {}, self.query)
            self.props.onFetch(
                query,
                function render (response, query) {
                    self.lastTimeQuery = extend(true, {}, self.query)
                    self.props.onRender.apply(self.props, arguments)

                },
                self.props.onFetchEnd
            )
        })
    }
}
export default ListLogic
