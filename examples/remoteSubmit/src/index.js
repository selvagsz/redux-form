import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { reducer as reduxFormReducer } from 'redux-form'
import { App, Code, Markdown, Values, generateExampleBreadcrumbs } from 'redux-form-website-template'

const dest = document.getElementById('content')
const reducer = combineReducers({
  form: reduxFormReducer // mounted under "form"
})
const store =
  (window.devToolsExtension ? window.devToolsExtension()(createStore) : createStore)(reducer)

let render = () => {
  const RemoteSubmitForm = require('./RemoteSubmitForm').default
  const RemoteSubmitButton = require('./RemoteSubmitButton').default
  const readme = require('./RemoteSubmit.md')
  const raw = require('!!raw!./RemoteSubmitForm')
  const rawButton = require('!!raw!./RemoteSubmitButton')
  const rawSubmit = require('!!raw!./submit')
  ReactDOM.render(
    <Provider store={store}>
      <App
        /**
         * This <App/> component only provides the site wrapper.
         * Remove it on your dev server if you wish. It will not affect the functionality.
         */
        version="6.5.0"
        path="/examples/remoteSubmit"
        breadcrumbs={generateExampleBreadcrumbs('remoteSubmit', 'Remote Submit Example', '6.5.0')}>

        <Markdown content={readme}/>

        <h2>Form</h2>

        <RemoteSubmitForm/>

        <RemoteSubmitButton/>

        <Values form="remoteSubmit"/>

        <h2>Code</h2>

        <h4>submit.js</h4>

        <Code source={rawSubmit}/>

        <h4>RemoteSubmitForm.js</h4>

        <Code source={raw}/>

        <h4>RemoteSubmitButton.js</h4>

        <Code source={rawButton}/>

      </App>
    </Provider>,
    dest
  )
}

if (module.hot) {
  // Support hot reloading of components
  // and display an overlay for runtime errors
  const renderApp = render
  const renderError = (error) => {
    const RedBox = require('redbox-react')
    ReactDOM.render(
      <RedBox error={error} className="redbox"/>,
      dest
    )
  }
  render = () => {
    try {
      renderApp()
    } catch (error) {
      renderError(error)
    }
  }
  const rerender = () => {
    setTimeout(render)
  }
  module.hot.accept('./RemoteSubmitForm', rerender)
  module.hot.accept('./RemoteSubmitButton', rerender)
  module.hot.accept('./RemoteSubmit.md', rerender)
  module.hot.accept('./submit', rerender)
  module.hot.accept('!!raw!./RemoteSubmitForm', rerender)
  module.hot.accept('!!raw!./RemoteSubmitButton', rerender)
  module.hot.accept('!!raw!./submit', rerender)
}

render()
