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
  # Computes and assigns the mostRecentSearch state variable
  # on a given component.
  #
  setDefaultMostRecentSearch: (component) ->
    component.state.mostRecentSearch = _.defaults({},
      @getUrlQueryAsObj(),
      if component.state.queryResult? and component.state.queryResult.info? then component.state.queryResult.info.query else {},
      {s: ''}
    ).s

  #
  # Assumes @isPlural == true
  #
  needsFetch: (cache) ->
    if !cache || (@pageFromQuery() != cache.info.page)
      return true

    false

  #
  # Does not include page.
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
  # Modifies state of a component that supports iterative search.
  #
  # Requires that it support these state variables:
  #
  #   queryResult, searching, mostRecentSearch
  #
  # Requires that calling component have a recordsHelper on its props.
  #
  # Parameters:
  #   component - component to modify
  #   e - onChange event
  #   searchPath - path on serve to send new search query
  #   onSuccess - callback executed on successful search, which take nextState as a
  # parameter so that the component can modify it as needed, for example to select
  # an item from the search result for use in another GUI widget on the page.
  #
  handleSearchChange: (component, e, searchPath, onSuccess) ->
    sQuery = e.target.value

    if(!component.state.searching and (sQuery.length > 2 || (component.state.mostRecentSearch != '' and component.state.mostRecentSearch != sQuery)))
      component.setState(searching: true);
      $.ajax(
        url: searchPath,
        data:
          s: if (sQuery.length > 2) then sQuery else '',
        dataType: 'JSON',
        success: (data) =>
          component.setState((prevState, prevProps) =>
            nextState =
              queryResult: data,
              searching: false,
              mostRecentSearch: _.defaults(data.info.query, {s: ''}).s

            onSuccess(nextState) if onSuccess?

            prevProps.history.replace(searchPath + '?' + serializeObj(Object.assign({}, @getUrlQueryAsObj(), {
              s: nextState.mostRecentSearch,
              page: nextState.queryResult.info.page
            })))

            nextState
          )
      )

export { RecordsHelper }
