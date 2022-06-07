import View from './view'

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload')
  _message = 'Recipe has been uploaded successfully!'
  _window = document.querySelector('.add-recipe-window')
  _overlay = document.querySelector('.overlay')
  _btnOpen = document.querySelector('.nav__btn--add-recipe')
  _btnClose = document.querySelector('.btn--close-modal')
  constructor() {
    super()
    this._addHandlerShowWindow()
    this._addHandlerHideWindow()
  }
  toggleWindow () {
    this._overlay.classList.toggle('hidden')
    this._window.classList.toggle('hidden')
  }

  _addHandlerShowWindow () {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this))

  }

  _addHandlerHideWindow () {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this))
  }

  addHandlerUpload (handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault()
      const dataArr = [...new FormData(this)]
      // convert entries to object
      const data = Object.fromEntries(dataArr)
      console.log(data)
      handler(data)
    })
  }
  _generateHtml () {

  }

}
export default new AddRecipeView()