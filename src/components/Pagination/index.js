import React from 'react'
import './index.css'

class Pagination extends React.Component {
  state = {pageNo: 1}

  onNextPage = () => {
    const {apiCallback, totalPages} = this.props
    this.setState(prevState => {
      if (prevState.pageNo < totalPages) {
        const newPageNo = prevState.pageNo + 1
        apiCallback(newPageNo)
        return {pageNo: newPageNo}
      }
      return prevState
    })
  }

  onPrevPage = () => {
    const {apiCallback} = this.props
    this.setState(prevState => {
      if (prevState.pageNo > 1) {
        const newPageNo = prevState.pageNo - 1
        apiCallback(newPageNo)
        return {pageNo: newPageNo}
      }
      return prevState
    })
  }

  render() {
    const {pageNo} = this.state
    const {totalPages} = this.props
    return (
      <div className="paginationContainer">
        <button type="button" className="controlBtn" onClick={this.onPrevPage}>
          Prev
        </button>
        <p className="pageNo">
          {pageNo} / {totalPages}
        </p>
        <button type="button" className="controlBtn" onClick={this.onNextPage}>
          Next
        </button>
      </div>
    )
  }
}

export default Pagination
