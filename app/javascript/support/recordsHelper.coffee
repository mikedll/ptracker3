import { getUrlParameter, getUrlQueryAsObj } from 'support/urlHelper';
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

export { RecordsHelper }
