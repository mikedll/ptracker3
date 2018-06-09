import { serializeObj, getUrlParameter, getUrlQueryAsObj } from 'support/urlHelper';
import _ from 'underscore';

class RecordsHelper
  constructor: (@props) ->
    @isPlural  = _.has(@props, 'query_result')
    @consumed = false

  consumePluralBootstrap: () ->
    return null if @consumed

    bootstrap = @props['query_result']
    @consumed = true

    if !bootstrap? || (@pageFromQuery() != bootstrap.info.page)
      return null

    bootstrap

  consumeSingularBootstrap: () ->
    return null if @consumed

    bootstrap = @props['record']
    @consumed = true

    # calling Component is from Route with matching param
    if @props.match? && (!bootstrap? || parseInt(@props.match.params.id) != bootstrap.id)
      return null

    bootstrap

  #
  # Computes and assigns the mostRecentQuery state variable on a given
  # component. GET parameters are overridden by the results cache in the
  # props. Defaults are taken from component.defaultQuery, which must be defined.
  #
  setDefaultMostRecentSearch: (component) ->
    component.state.mostRecentQuery = _.defaults(Object.assign({}, @getUrlQueryAsObj(),
      if component.state.queryResult? and component.state.queryResult.info? then component.state.queryResult.info.query else {}),
      component.defaultQuery)

  #
  # Assumes @isPlural == true
  #
  # Checks if page in GET parameters is out of date with the page in the results cache.
  #
  needsFetch: (cache) ->
    if !cache || (@pageFromQuery() != cache.info.page)
      return true

    false

  #
  # Excludes page parameter.
  #
  getUrlQueryAsObj: () ->
    if typeof(window) == "undefined"
      return _.pick(@props.query_result.info, 'query')
    else
      return _.omit(getUrlQueryAsObj(), 'page')

  pageFromQuery: () ->
    return 1 if not @isPlural

    pPage = if typeof(window) == "undefined" then @props.query_result.info.page else parseInt(getUrlParameter('page'));
    if (pPage == null || isNaN(pPage)) then 1 else pPage;

  fetchPage: (path, success) ->
    $.ajax({
      url: path
      data: Object.assign({}, @getUrlQueryAsObj(), { page: @pageFromQuery() }),
      dataType: 'JSON'
      success: success
    })

  #
  # Fires off ajax requests to the server. Modifies state property of
  # a component that supports iterative search.
  #
  # Requires that component define defaultQuery.
  #
  # Requires that component support these state variables:
  #
  #   queryResult, searching, mostRecentQuery
  #
  # Requires that calling component have a recordsHelper on its props.
  #
  # Parameters:
  #   component - component to modify
  #   formQuery - values of the form governing search parameters
  #   searchPath - path on serve to send new search query
  #   onSuccess - callback executed on successful search, which take nextState as a
  # parameter so that the component can modify it as needed, for example to select
  # an item from the search result for use in another GUI widget on the page.
  #
  handleSearchChange: (component, formQuery, searchPath, onSuccess) ->
    if(!component.state.searching)
      component.setState(searching: true);
      $.ajax(
        url: searchPath,
        data: formQuery
        dataType: 'JSON',
        success: (data) =>
          component.setState((prevState, prevProps) =>
            nextState =
              queryResult: data,
              searching: false,
              mostRecentQuery: _.defaults(data.info.query, component.defaultQuery)

            onSuccess(nextState) if onSuccess?

            nextGetParams = Object.assign({}, nextState.mostRecentQuery, { page: nextState.queryResult.info.page })
            interestingGetParams = {}
            for k, v of nextGetParams
              if k == 'page'
                interestingGetParams[k] = v if v != 1
              else
                interestingGetParams[k] = v if v != ''

            prevProps.history.replace(searchPath + '?' + serializeObj(interestingGetParams))

            nextState
          )
      )

export { RecordsHelper }
