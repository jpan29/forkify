import View from './view'
import previewView from './previewView'
class ResultView extends View {
  _parentElement = document.querySelector('.results')
  _errMessage = 'Sorry no recipe found🥲'
  _message = ''
  _generateHtml () {

    return this._data.map(result => previewView.render(result, false)).join('')

  }

}
export default new ResultView()