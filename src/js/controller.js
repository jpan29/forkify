// import icons from 'url:../img/icons.svg' parcel 2

import 'core-js/stable'

import 'regenerator-runtime/runtime'
import * as model from './model.js'
import recipeView from './views/recipeView'
import searchView from './views/searchView.js'
import resultView from './views/resultView.js'
import bookmarksView from './views/bookmarksView.js'
import paginationView from './views/paginationView.js'
import addRecipeView from './views/addRecipeView.js'
// if (module.hot) {
//   module.hot.accept()
// }

// const recipeContainer = document.querySelector('.recipe')


// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////


const contrtolRecipe = async () => {
  try {
    const id = window.location.hash.slice(1)
    if (!id) return
    recipeView.renderSpinner()


    // uodate result view to mark seleted recipe
    resultView.update(model.getSearchResultsPage())
    bookmarksView.update(model.state.bookmarks)

    // loading recipe
    await model.loadRecipe(id)



    // 2.render data
    recipeView.render(model.state.recipe)


  } catch (err) {
    console.log(err)
    recipeView.renderError()
  }
}
const controlSearchResult = async function () {
  try {
    resultView.renderSpinner()
    const query = searchView.getQuery()
    searchView.clearInput()
    if (!query) return
    await model.loadSearchResult(query)
    // render data
    controlPagination()

  } catch (err) {
    console.log(err)
    recipeView.renderError()
  }
}
const controlPagination = function (goToPage = 1) {
  resultView.render(model.getSearchResultsPage(goToPage))
  paginationView.render(model.state.search)
}
const controlServings = function (newServings) {
  model.updateServings(newServings)
  recipeView.update(model.state.recipe)

}
const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe)
  else model.deleteBookmark(model.state.recipe.id)

  recipeView.update(model.state.recipe)
  bookmarksView.render(model.state.bookmarks)
}
const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks)
}

const controlAddRecipe = async function (newRecipe) {
  try {
    addRecipeView.renderSpinner()

    await model.uploadRecipe(newRecipe)
    console.log(model.state.recipe)
    recipeView.render(model.state.recipe)
    addRecipeView.renderMessage()
    console.log(model.state.recipe)
    bookmarksView.render(model.state.bookmarks)

    // change id in url
    window.history.pushState(null, '', `#${model.state.recipe.id}`)

  } catch (err) {
    console.log(`💥${err.message}`)
    addRecipeView.renderError(err.message)
  }
}

const newFeature = function () {
  console.log('new feature')
}
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks)
  recipeView.addHandlerRender(contrtolRecipe)
  recipeView.addHandlerUpdateServings(controlServings)
  recipeView.addHandlerAddBookmark(controlAddBookmark)
  searchView.addHandlerSearch(controlSearchResult)
  paginationView.addHandlerClick(controlPagination)
  addRecipeView.addHandlerUpload(controlAddRecipe)

}
init()