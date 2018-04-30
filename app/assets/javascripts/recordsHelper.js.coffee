class RecordsHelper
  constructor: (@isPlural) ->
  getBootstrapped: () ->
    if BootstrappedData?
      key =  if @isPlural then 'query_result' else 'record'
      ref = BootstrappedData[key]
      delete BootstrappedData[key]
      ref
    else
      null

  pageFromQuery: () ->
    pPage = parseInt(getUrlParameter('page'));
    if (pPage == null || isNaN(pPage)) then 1 else pPage;

  needsFetch: (queryResult, page) ->
    !queryResult? || page != queryResult.info.page

  fetchPage: (path, page, success) ->
    $.ajax({
      url: path
      data: { page: page }
      dataType: 'JSON'
      success: success
    })

root = exports ? this
root.RecordsHelper = RecordsHelper
