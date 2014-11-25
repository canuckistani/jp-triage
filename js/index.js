function render(bugs) {
  var source   = $("#table-template").html();
  var template = Handlebars.compile(source);

  $('#content-wrap tbody').html(template({bugs: bugs}));
}

function openSeq() {
  $('#content-wrap tbody a').each(function() {
    window.open(this.href);
  });
}



$(function() {
  var bugzilla = bz.createClient();

  var searchParams = {
      priority: '--',
      resolution: '---',
      product: 'Add-on SDK'
  };

  bugzilla.searchBugs(searchParams, function(err, bugs) {
    if (err) throw err;
    render(bugs);
  });

  $('#open-all').click(openSeq);
});
