import { getUrlParameter } from 'support/urlHelper';

class RecordsHelper
  constructor: (@isPlural, @props) ->
  getBootstrapped: () ->
    bootstrap = @props[if @isPlural then 'query_result' else 'record']

    if @isPlural
      if !bootstrap || (@pageFromQuery() != bootstrap.info.page)
        return null
    else if @props.match?
      if !bootstrap? || parseInt(@props.match.params.id) != bootstrap.id
        return null

    bootstrap

  #
  # Assumes @isPlural == true
  #
  needsFetch: (cache) ->
    if !cache || (@pageFromQuery() != cache.info.page)
      return true

    false

  pageFromQuery: () ->
    throw "No pages for single records" if not @isPlural
    pPage = if typeof(window) == "undefined" then @props.query_result.info.page else parseInt(getUrlParameter('page'));
    if (pPage == null || isNaN(pPage)) then 1 else pPage;

  fetchPage: (path, success) ->
    $.ajax({
      url: path
      data: { page: @pageFromQuery() }
      dataType: 'JSON'
      success: success
    })

export { RecordsHelper }
