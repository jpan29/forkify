import View from './view'
import icons from '../../img/icons.svg' //parcel 1
class PaginationView extends View {
  _parentElement = document.querySelector('.pagination')
  _generateHtml () {
    const currentPage = +this._data.page
    const numberPage = Math.ceil(this._data.results.length / this._data.resultsPerPage)
    console.log(numberPage)
    if (currentPage === 1 && numberPage > 1) {
      return `
    <button data-goto=${currentPage + 1} class="btn--inline pagination__btn--next">
      <span>Page ${currentPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>`
    }
    if (currentPage === numberPage && numberPage > 1) {
      return `
      <button data-goto=${currentPage - 1} class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
          </button>
        `
    }
    if (currentPage < numberPage) {
      return `
      <button data-goto=${currentPage - 1} class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
          </button>
          <button data-goto=${currentPage + 1} class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`
    }
    return ''

  }
  addHandlerClick (handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline')
      if (!btn) return
      console.log(btn)
      const goToPage = btn.dataset.goto
      console.log(goToPage)
      handler(goToPage)
    })
  }
}
export default new PaginationView()