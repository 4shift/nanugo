var cats = ["women", "men", "unisex", "kids", "baby", "electronics-and-games", "movies-and-music", "books", "hobbies-and-diy", "home", "sports-and-outdoor", "tools", "health-and-beauty"]
var didLoadCategory = [];
var checkInfinite = makeScroll('infinite-container');

$(function() {
  $('a[data-toggle="tab"]').on('shown.bs.tab', checkLazyLoad);
  $(window).scroll(checkLazyLoad);

  checkLazyLoad();
});

function checkLazyLoad() {
  var activeTab = $('.nav#tabs li.active a').attr('href');
  if(activeTab == '#shop') {
    loadVisibleCategories();
  } else {
    checkInfinite();
  }
}


//
// Category tab management
//

function loadVisibleCategories() {
  var slop = 200; // how many pixels below the bottom of screen we look
  var h = (window.innerHeight || document.documentElement.clientHeight) + slop;
  $('.tab-pane#shop .container').each(function(i, el) {
    var r = el.getBoundingClientRect();
    if(r.top < h) {
      loadCategory(i, el);
    }
  });
}
function loadCategory(i, containerEl) {
  if(didLoadCategory[i]) return;
  didLoadCategory[i] = true;
  var cat = cats[i];
  Y.taggedPostings(null, cat).then(function(d, s) {
    $(containerEl).find('.spinner').hide();
    if(d.merchandise) {
      var els = d.merchandise.map(createItemElement);
      $(containerEl).find('#shop-' + cat + '-container').append(els);
    }
  });
}

// For APIv2 posting
function appendPosting(posting, containerId) {
  // bail if anything is returned that is/was already ours
  // note that current_user may not be defined, hence the try
  var currentUserId = 0;
  if(posting.user && posting.user.id == currentUserId) {
    return;
  }
  if(posting.winner && posting.winner.id == currentUserId) {
    return;
  }

  var templateClass = posting.in_use ? 'wish-template' : 'posting-template'

  var $newPostingEl = $('.'+templateClass).clone();

  $newPostingEl.find('img').attr('src', posting.photos[0]);
  $newPostingEl.find('.title').text(posting.title);
  $newPostingEl.find('.price').text(posting.yrd_sale_price);
  if(posting.offer_user_shipment) {
    $newPostingEl.find('.badge')
      .removeClass('hidden')
      .html('<i class="icon-truck"/><span>free</span>');
  }
  // new things are less than 24h old
  if((Date.now() / 1000 - posting.up_at) < (24*60*60)) {
    $newPostingEl.find('.status')
      .removeClass('hidden')
      .html('<i class="icon-just_in_tag"/><span>Just in</span>')
  }

  $newPostingEl.attr('href', '/postings/' + posting.id);

  // wishes are speshul
  if(posting.in_use) {
    var owner = posting.user || posting.winner;
    var name = owner.last_name + ' ' + owner.first_name[0];
    $newPostingEl.find('.description').text('Given to ' + name);
  }

  $newPostingEl.removeClass('hidden ' + templateClass)
  $newPostingEl.addClass('posting')

  $('#'+containerId).append($newPostingEl);
};

// For APIv3 item
function createItemElement(item) {

  // bail on invalid items (overly defensive)
  if(item.travels.length == 0) {
    console.log('Y: item %s has no travels', item.uid);
    return;
  }

  // bail if anything is returned that is/was already ours
  if(item.travels[0].legacy && item.travels[0].legacy.giver
     && item.travels[0].legacy.giver.id == Y.userId) {
    return;
  }
  //if(posting.winner && posting.winner.id == Y.userId) {
  //  return;
  //}

  var isWish = item.state == 'in-use';

  var templateClass = isWish ? 'wish-template' : 'posting-template';

  var $newPostingEl = $('.'+templateClass).clone();

  $newPostingEl.find('img').attr('src', item.properties.photoUrls[0]);
  $newPostingEl.find('.title').text(item.properties.title);
  $newPostingEl.find('.price').text(item.travels[0].sale.yrdPrice);

  if(item.travels[0].sale.fulfillmentOptions.indexOf('user_shipment') != -1) {
    $newPostingEl.find('.badge')
      .removeClass('hidden')
      .html('<i class="icon-truck"/><span>free</span>');
  }

  // new things are less than 24h old
  if((Date.now() / 1000 - item.travels[0].sale.upAt) < (24*60*60)) {
    $newPostingEl.find('.status')
      .removeClass('hidden')
      .html('<i class="icon-just_in_tag"/><span>Just in</span>')
  }

  // wishes have givers
  if(isWish) {
    var owner = item.travels[0].legacy && item.travels[0].legacy.claimer;
    if(owner) {
      $newPostingEl.find('.description').text('Given to ' + owner.privacy_name);
    }
  }

  $newPostingEl.attr('href', '/items/' + item.uid);

  $newPostingEl.removeClass('hidden ' + templateClass)
  $newPostingEl.addClass('posting')

  return $newPostingEl;
}


//
// make an infinite scroller
// (needs further parameterization to be fully generic)
//
function makeScroll(containerId) {
  var afterId = null;
  var canLoadMore = true;
  var isSearch = false;
  var nowSearchingWishes = false;
  var inited = false;

  function loadIfNeeded() {
    if(!canLoadMore) return;
    var $window = $(window);
    if(!inited ||
      $window.scrollTop() + $window.height() >=
      $(document).height() - ($('.posting-template').height() * 3))
    {
      canLoadMore = false;
      inited = true;
      loadPageWithSpinner();
    }
  }

  function loadPageWithSpinner() {
    var spinner = $('.results .spinner');
    spinner.show();
    loadPage(function(keepGoing) {
      if(keepGoing) {
        canLoadMore = true;
        loadIfNeeded();
      } else {
        if($('#'+containerId).children().size() == 0) {
          $('#no-results').show();
        }
      }
    });
  }

  function hideSpinner() {
    $('.results .spinner').hide();
  }

  function loadPage(callback) {
    var fv3 = function(d, s, req) {
      var els = d.merchandise
        ? d.merchandise.map(createItemElement)
        : [];
      $('#' + containerId).append(els);

      afterId = req.getResponseHeader('X-Page-After');
      if(afterId == '') {
        afterId = null;
      }

      var keepGoing = (afterId != null) && (els.length > 0);

      if(!keepGoing && isSearch && !nowSearchingWishes) {
        nowSearchingWishes = true;
        callback(true);
      } else {
        callback(keepGoing);
      }
    };

    if(false) {
      Y.taggedPostings(afterId, '', '').then(fv3).always(hideSpinner);
    } else if(isSearch) {
      if(nowSearchingWishes) {
        Y.searchInUsePostings(afterId, '').then(fv3).always(hideSpinner);
      } else {
        Y.searchPostings(afterId, '').then(fv3).always(function() {
          if(!nowSearchingWishes) {
            hideSpinner();
          }
        });
      }
    } else {
      Y.trendingPostings(afterId)
        .then(fv3)
        .always(hideSpinner);
    }
  }

  return loadIfNeeded;
}
