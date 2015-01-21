var bugzilla = bz.createClient();

Handlebars.registerHelper("formatDate", function(bzDate) {
  var _date = new Date(Date.parse(bzDate));
  return _date.toLocaleString();
});

function render(bugs) {
  var source   = $("#table-template").html();
  var template = Handlebars.compile(source);
  var _compiled = template({bugs: bugs});
  $('#throbber').hide(function() {
    $('#bug-count').html(bugs.length);
    $('#label').show(function() {
      $('#content-wrap tbody').html(_compiled);
    });
  });
}

function fetchBugs(callback) {
  var searchParams = {
      priority: '--',
      resolution: '---',
      product: 'Add-on SDK'
  };

  bugzilla.searchBugs(searchParams, function(err, bugs) {
    if (err) throw err;
    callback(bugs);
  });
}

function handleRefreshClick() {
  $('#label').hide(200, function() {
    $('#throbber').show();
    fetchBugs(render);
  });
  $('#content-wrap tbody').html("")
}

$(function() {
  // refresh button binding
  $('#refresh-bugs').click(handleRefreshClick)

  // load the bugs
  $('#label').hide(function() {
    $('#throbber').show();
    fetchBugs(render);
  });
});
