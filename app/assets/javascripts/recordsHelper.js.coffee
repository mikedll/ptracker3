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

root = exports ? this
root.RecordsHelper = RecordsHelper
