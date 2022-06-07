import icons from '../../img/icons.svg' //parcel 1
export default class View {
  _data
  /**
   * Render the received object to the dom
   * @param {Object|Object[]} data The data to be rendered(e.g. recipe)
   * @param {boolean} [render=true] if false create html string instead of redering to th dom
   * @returns {undefined |string} A html string is returned if render= false
   * @this {object} View instance
   * @author Jie Pan
   * @todo Finish implementation
   */
  render (data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError()
    this._data = data
    const html = this._generateHtml()
    if (!render) return html
    this._clear()
    this._parentElement.insertAdjacentHTML('afterbegin', html)


  }
  update (data) {

    this._data = data
    const newHtml = this._generateHtml()


    const newDom = document.createRange().createContextualFragment(newHtml)
    const newElements = Array.from(newDom.querySelectorAll('*'))
    const currentElements = Array.from(this._parentElement.querySelectorAll('*'))


    newElements.forEach((newEl, i) => {
      const curEl = currentElements[i]
      // update change text
      if (!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== '') {
        curEl.textContent = newEl.textContent
      }

      // update change attributes

      if (!newEl.isEqualNode(curEl))
        console.log(Array.from(newEl.attributes))

      Array.from(newEl.attributes).forEach(attr =>
        curEl.setAttribute(attr.name, attr.value))
    })


  }
  _clear () {
    this._parentElement.innerHTML = ''
  }

  renderSpinner () {
    const html = `
    <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
        </div> 
  
        `
    this._clear()
    this._parentElement.insertAdjacentHTML("afterbegin", html)
  }
  renderError (message = this._errMessage) {
    const html = `
    <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div> `
    this._clear()
    this._parentElement.insertAdjacentHTML("afterbegin", html)
  }
  renderMessage (message = this._message) {
    const html = `
    <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div> `
    this._clear()
    this._parentElement.insertAdjacentHTML("afterbegin", html)
  }
}