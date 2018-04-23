
@amountFormat = (amount) ->
  if amount? then ('$ ' + Number(amount).toLocaleString()) else '?'

@MomentFormats = {
  Time: 'MMMM Do YYYY, h:mm a'
};
