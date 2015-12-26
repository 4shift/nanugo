$("#post-item").ready(function() {

  // activate popovers
  $('[data-toggle="popover"]').popover();

  // Department / Subcategory filter
  (function() {
    var $categoriesGroup = $('#categories');
    var $categories = $categoriesGroup.find('select');

    var categories = {
      "Women": [ "Clothing", "Accessories", "Shoes", "Jewelry", "Bags & Wallets", "Juniors' Clothing", "Other" ],
      "Men": [ "Clothing", "Accessories", "Shoes", "Jewelry", "Bags & Wallets", "Other" ],
      "Kids": [ "Girls' Clothing", "Boys' Clothing", "Girls' Accessories", "Boys' Accessories", "Girls' Shoes", "Boys' Shoes", "Activities & Toys", "Movies", "Books", "Video Games", "Other" ],
      "Baby": [ "Clothing & Accessories", "Strollers & Carriers", "Activities & Toys", "Bathing & Grooming", "Health & Safety", "Nursery", "Other" ],
      "Home": [ "Kitchen & Dining", "Bedding & Bath", "Appliances", "Furniture & Décor", "Luggage", "Pet Supplies", "Storage & Organization", "Lawn & Garden", "Patio", "Other" ],
      "Health & Beauty": [ "Bath & Body", "Personal Care", "Diet & Nutrition", "Cosmetics", "Fragrances", "Hair Care", "Other" ],
      "Sports & Outdoor": [ "Camping & Outdoor", "Exercise & Fitness", "Cycling", "Sports Equipment", "Coolers & Water Bottles", "Other" ],
      "Electronics & Games": [ "Audio & iPods", "Phones & Accessories", "Photo & Video Cameras", "Computers & Tablets", "TV & Home Theater", "Board Games", "Video Games", "Software", "Other" ],
      "Hobbies & DIY": [ "Arts & Crafts", "DIY & Kits", "Collectibles", "Sewing & Knitting", "Other" ],
      "Movies & Music": [ "Movies & TV", "CDs & Vinyl", "Musical Instruments", "Other" ],
      "Books": [ "Fiction", "Nonfiction", "Cookbooks", "Textbooks", "Other" ],
      "Unisex": [ "Clothing", "Accessories", "Shoes", "Jewelry", "Bags & Wallets", "Other" ],
      "Tools": [ "Power & Hand Tools", "Hardware", "Automotive", "Garden Tools", "Other" ]
    };

    var categoriesFormatted = {
      "Women": [ "Women > Clothing", "Women > Accessories", "Women > Shoes", "Women > Jewelry", "Women > Bags & Wallets", "Women > Juniors' Clothing", "Women > Other" ],
      "Men": [ "Men > Clothing", "Men > Accessories", "Men > Shoes", "Men > Jewelry", "Men > Bags & Wallets", "Men > Other" ],
      "Kids": [ "Kids > Girls' Clothing", "Kids > Boys' Clothing", "Kids > Girls' Accessories", "Kids > Boys' Accessories", "Kids > Girls' Shoes", "Kids > Boys' Shoes", "Kids > Activities & Toys", "Kids > Movies", "Kids > Books", "Kids > Video Games", "Kids > Other" ],
      "Baby": [ "Baby > Clothing & Accessories", "Baby > Strollers & Carriers", "Baby > Activities & Toys", "Baby > Bathing & Grooming", "Baby > Health & Safety", "Baby > Nursery", "Baby > Other" ],
      "Home": [ "Home > Kitchen & Dining", "Home > Bedding & Bath", "Home > Appliances", "Home > Furniture & Décor", "Home > Luggage", "Home > Pet Supplies", "Home > Storage & Organization", "Home > Lawn & Garden", "Home > Patio", "Home > Other" ],
      "Health & Beauty": [ "Health & Beauty > Bath & Body", "Health & Beauty > Personal Care", "Health & Beauty > Diet & Nutrition", "Health & Beauty > Cosmetics", "Health & Beauty > Fragrances", "Health & Beauty > Hair Care", "Health & Beauty > Other" ],
      "Sports & Outdoor": [ "Sports & Outdoor > Camping & Outdoor", "Sports & Outdoor > Exercise & Fitness", "Sports & Outdoor > Cycling", "Sports & Outdoor > Sports Equipment", "Sports & Outdoor > Coolers & Water Bottles", "Sports & Outdoor > Other" ],
      "Electronics & Games": [ "Electronics & Games > Audio & iPods", "Electronics & Games > Phones & Accessories", "Electronics & Games > Photo & Video Cameras", "Electronics & Games > Computers & Tablets", "Electronics & Games > TV & Home Theater", "Electronics & Games > Board Games", "Electronics & Games > Video Games", "Electronics & Games > Software", "Electronics & Games > Other" ],
      "Hobbies & DIY": [ "Hobbies & DIY > Arts & Crafts", "Hobbies & DIY > DIY & Kits", "Hobbies & DIY > Collectibles", "Hobbies & DIY > Sewing & Knitting", "Hobbies & DIY > Other" ],
      "Movies & Music": [ "Movies & Music > Movies & TV", "Movies & Music > CDs & Vinyl", "Movies & Music > Musical Instruments", "Movies & Music > Other" ],
      "Books": [ "Books > Fiction", "Books > Nonfiction", "Books > Cookbooks", "Books > Textbooks", "Books > Other" ],
      "Unisex": [ "Unisex > Clothing", "Unisex > Accessories", "Unisex > Shoes", "Unisex > Jewelry", "Unisex > Bags & Wallets", "Unisex > Other" ],
      "Tools": [ "Tools > Power & Hand Tools", "Tools > Hardware", "Tools > Automotive", "Tools > Garden Tools", "Tools > Other" ]
    };

    var sizes = {
      "Women > Clothing": {
        "tops": [ "XXS", "XS", "S", "M", "L", "XL", "1X", "2X", "3X", "4X" ],
        "bottoms_and_dresses": [ "00", "0", "2", "4", "6", "8", "10", "12", "14", "16", "18", "20", "22", "24", "26", "28", "30" ],
        "intimates": [ "32A", "32B", "32C", "32D", "32DD", "34A", "34B", "34C", "34D", "34DD", "36A", "36B", "36C", "36D", "36DD", "38A", "38B", "38C", "38D", "38DD", "40A", "40B", "40C", "40D", "40DD", "42A", "42B", "42C", "42DD", "44A", "44B", "44C", "44D", "44DD" ]
      },
      "Women > Shoes": {
        "": [ "5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12", "12.5" ]
      },
      "Women > Juniors' Clothing": {
        "tops": [ "XS", "S", "M", "L", "XL", "XXL" ],
        "bottoms_and_dresses": [ "0", "1", "3", "5", "7", "9", "11", "13", "15", "17", "19" ]
      },
      "Men > Clothing": {
        "tops": [ "XS", "S", "M", "L", "XL", "XXL", "XXXL" ],
        "bottoms": [ "26", "28", "30", "32", "34", "36", "38", "40", "42", "44", "46", "48", "50" ]
      },
      "Men > Shoes": {
        "": [ "6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12", "12.5", "13", "13.5", "14", "14.5", "15", "15.5", "16" ]
      },
      "Kids > Girls' Clothing": {
        "tops": [ "4", "5", "6", "7", "8", "10", "12", "14", "16", "18" ],
        "bottoms_and_dresses": [ "4", "5", "6", "7", "8", "10", "12", "14", "16", "18" ]
      },
      "Kids > Boys' Clothing": {
        "tops": [ "4", "5", "6", "7", "8", "10", "12", "14", "16", "18" ],
        "bottoms": [ "4", "5", "6", "7", "8", "10", "12", "14", "16", "18" ]
      },
      "Kids > Girls' Shoes": {
        "": [ "10", "11", "12", "13", "13.5", "1", "1.5", "2", "2.5", "3", "3.5", "4", "4.5", "5", "5.5", "6" ]
      },
      "Kids > Boys' Shoes": {
        "": [ "10", "11", "12", "13", "13.5", "1", "1.5", "2", "2.5", "3", "3.5", "4", "4.5", "5", "5.5", "6" ]
      },
      "Baby > Clothing & Accessories": {
        "": [ "0-3 mo", "3-6 mo", "6-9 mo", "9-12 mo", "12-18 mo", "18-24 mo", "2T","3T" ]
      },
      "Unisex > Clothing": {
        "tops": [ "XXS", "XS", "S", "M", "L", "XL", "1X", "2X", "3X", "4X" ],
        "bottoms": [ "XXS", "XS", "S", "M", "L", "XL", "1X", "2X", "3X", "4X" ]
      },
      "Unisex > Shoes": {
        "": [ "6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12", "12.5", "13", "13.5", "14", "14.5", "15", "15.5", "16" ]
      }
    };

    var sizeAliases = {
      "Women > Clothing": {
        "bottoms_and_dresses": {
          "00": "XXS",
          "0": "XS",
          "2": "S",
          "4": "S",
          "6": "M",
          "8": "M",
          "10": "L",
          "12": "L",
          "14": "XL",
          "16": "1X",
          "18": "1X",
          "20": "2X",
          "22": "2X",
          "24": "3X",
          "26": "3X",
          "28": "4X",
          "30": "4X"
        }
      },
      "Women > Juniors' Clothing": {
        "bottoms_and_dresses": {
          "0": "XS",
          "1": "XS",
          "3": "S",
          "5": "S",
          "7": "M",
          "9": "M",
          "11": "L",
          "13": "L",
          "15": "XL",
          "17": "XL",
          "19": "XXL"
        }
      },
      "Men > Clothing": {
        "bottoms": {
          "26": "XS",
          "28": "S",
          "30": "S",
          "32": "M",
          "34": "M",
          "36": "L",
          "38": "L",
          "40": "XL",
          "42": "XL",
          "44": "XXL",
          "46": "XXL",
          "48": "XXXL",
          "50": "XXXL"
        }
      },
      "Kids > Girls' Clothing": {
        "tops": {
          "4": "XS",
          "5": "XS",
          "6": "S",
          "7": "M",
          "8": "M",
          "10": "M",
          "12": "L",
          "14": "L",
          "16": "XL",
          "18": "XL"
        },
        "bottoms_and_dresses": {
          "4": "XS",
          "5": "XS",
          "6": "S",
          "7": "M",
          "8": "M",
          "10": "M",
          "12": "L",
          "14": "L",
          "16": "XL",
          "18": "XL"
        }
      },
      "Kids > Boys' Clothing": {
        "tops": {
          "4": "XS",
          "5": "XS",
          "6": "S",
          "7": "M",
          "8": "M",
          "10": "M",
          "12": "L",
          "14": "L",
          "16": "XL",
          "18": "XL"
        },
        "bottoms": {
          "4": "XS",
          "5": "XS",
          "6": "S",
          "7": "M",
          "8": "M",
          "10": "M",
          "12": "L",
          "14": "L",
          "16": "XL",
          "18": "XL"
        }
      }
    };

    var sizeTypeNames = {
      bottoms : 'Bottoms',
      tops : 'Tops',
      bottoms_and_dresses : 'Bottoms & Dresses',
      intimates : 'Intimates'
    };

    var $size = $('#size');

    $('#departments select').change(function() {
      departmentChanged($(this).val());
    });

    var updateSize = function(category) {
      // first, see if this category has a size
      var categories_with_size = ["Women > Clothing", "Women > Shoes", "Women > Juniors' Clothing", "Men > Clothing", "Men > Shoes", "Kids > Girls' Clothing", "Kids > Boys' Clothing", "Kids > Girls' Shoes", "Kids > Boys' Shoes", "Baby > Clothing & Accessories", "Unisex > Clothing", "Unisex > Shoes"];
      var hasSize = categories_with_size.indexOf(category) != -1;
      $size.toggleClass('sr-only', !hasSize);

      if(hasSize) {
        // it does, so put the right stuff in the select
        var sizeSelect = $size.find('select');
        sizeSelect.empty();
        _.keys(sizes[category]).forEach(function(key) {
          if(key != '') {
            var displayKey = sizeTypeNames[key] || key;
            sizeSelect.append($('<option>').text(displayKey).attr('disabled', true));
          }

          sizes[category][key].forEach(function(size, i) {
            var displaySize = size;
            if (sizeAliases[category] && sizeAliases[category][key] && sizeAliases[category][key][i]) {
              displaySize = size + ' (' + sizeAliases[category][key][i] + ')';
            }
            sizeSelect.append(
              $('<option>').text(displaySize).val(size).data({type: key})
            );
          });
          sizeSelect.change(function() {
            var type = $(this.options[this.selectedIndex]).data('type');
            $('#posting_size_type').val(type);
          });
        });

        // initialize the hidden field
        var selectEl = sizeSelect.get()[0];
        var selectedOption = selectEl.options[selectEl.selectedIndex];
        var initialType = $(selectedOption).data('type');
        $('#posting_size_type').val(initialType);
      } else {
        $size.find('select').empty();
        $('#posting_size_type').val(null);
      }
    }


    function departmentChanged(department) {
      if (department && categories[department]) {
        $categoriesGroup.removeClass('sr-only');
        $size.addClass('sr-only');
        $categories
          .empty()
          .append($('<option>').text('Select a category').attr('disabled', true))
          .change(function() {
            updateSize(this.value);
          });

        categories[department].forEach(function(option, i) {
          var fullOption = categoriesFormatted[department][i];
          $categories.append($('<option>').text(option).val(fullOption));
        });

        updateSize($categories.val());
      } else {
        $categoriesGroup.addClass('sr-only');
        $size.addClass('sr-only');
      }
    }

    updateSize($categories.val());
  }());

  // form validations

  $.fn.validate = function (validation, valid, invalid) {
    var $this = $(this);
    if (validation.call($this)) {
      return true;
    } else {
      $this.addClass('invalid');
      $this.on('focus click', function () { $this.removeClass('invalid'); });
      return false;
    }
  };

  $('#posting_price').blur(function() {
    return $(this).validate(function(){ return parseFloat($(this).val()) % 1 == 0 })
  });

  $('#new_posting, .edit_posting').submit(function () {
    var valid = true;
    valid = $('.photo-container').validate(function(){ return $('#posting_photo_1_url').data('valid') === true; }) && valid;
    valid = $('#posting_title').validate(function(){ return $(this).val().length > 0; }) && valid;
    valid = $('#posting_location').validate(function(){ return $('#posting_location').val().length > 0 && $('#posting_display_location').val().length > 0; }) && valid;
    valid = $('#posting_price').validate(function(){ var amount = parseInt($(this).val()); return amount >= 0 && amount <= 1000; }) && valid;
    valid = $('.condition-radios').validate(function(){ return $('[name="posting[condition]"]:checked').val(); }) && valid;
    valid = $('#posting_department').validate(function(){ return $('#posting_department').val() != '' }) && valid;
    valid = $('#posting_subcategory').validate(function(){ return $('#posting_subcategory').val() != 'Select a category' }) && valid;
    valid = $('.fulfillment-options-holder').validate(function(){ return $('input:checked[name="posting[fulfillment_options][]"]').size() != 0 }) && valid;

    // NOTE a size will always be selected - validation not really needed
    if(!$('#size').hasClass('sr-only')) {
      valid = $('#size select').validate(function() { return !!$(this).val() } ) && valid;
    }

    //if (!valid) $(document.body).scrollTop($('.invalid').first().offset().top - 30);
    return valid;
  });

  //
  // image upload handling
  //

  // note we don't use jquery hide()/show() because it overrides display

  var uploads = [];

  $('.cloudinary-fileupload')
    .on('fileuploadsend', function(e, data) {
      var $el = $(e.target).closest('.photo-container');
      $el.find('.select-photo-text').addClass('hidden');
      $el.find('.spinner').removeClass('hidden');
      $el.find('.error').addClass('hidden');
    })
    .on('error', function(e, data) {
      console.log('cloud error:', e, data);
      var $el = $(e.target).closest('.photo-container');
      $el.find('.spinner').addClass('hidden');
      $el.find('.error').removeClass('hidden');
    })
    .on('cloudinarydone', function(e, data) {
      var $el = $(e.target).closest('.photo-container');
      $el.find('.spinner').addClass('hidden');

      // note 1-based index (really image names)
      var url = $.cloudinary.url(data.result.public_id, {
        format: 'jpg', crop: 'fill', width: 600, height: 600, class: 'img-responsive'
      });
      uploads[$el.data('i') - 1] = url;

      updateUploadPlaceholders();

      return true;
    });
  $('.remove-button').on('click', function(e) {
    var $el = $(e.target).closest('.photo-container');
    // a little bit of animation here... first fade out...
    $el.animate({opacity:0}, 500, function() {
      // remember - 1-based index
      var i = $el.data('i') - 1;
      uploads.splice(i, 1);
      updateUploadPlaceholders();
      // remove the opacity property now
      // OK because updateUploadPlaceholders() is instant (no transition)
      $el.css({opacity:''});
    })
  });

  function updateUploadPlaceholders() {
    var els = $('.photo-container');
    els.each(function(i, el) {
      var $el = $(el);

      // the cloudinary hidden field
      // WARNING this exploits undocumented behavior of cloudinary.js
      // https://github.com/cloudinary/cloudinary_js/blob/master/js/jquery.cloudinary.js
      var cloudinaryHiddenFieldName = $el.find('.transparent-image-upload').data('cloudinary-field');
      var cloudinaryHiddenField = $('input[name="' + cloudinaryHiddenFieldName + '"]');

      if(i < uploads.length) {
        var image = uploads[i];

        // update/add cloudinary hidden input
        if (cloudinaryHiddenField.length > 0) {
          cloudinaryHiddenField.val(image);
        } else {
          $('<input/>').attr({type: "hidden", name: cloudinaryHiddenFieldName}).val(image).appendTo($el.closest('form'));
        }

        // update DOM
        $el.find('.transparent-image-upload').data('valid', true);
        $el.find('.photo-upload').addClass('photo');
        $el.find('.select-photo-text').addClass('hidden');
        $el.find('.spinner').addClass('hidden');
        $el.find('.error').addClass('hidden');
        $el.find('.preview').html($('<img/>').attr({src: image, 'class': 'img-responsive'}));
      } else {
        // kill cloudinary hidden input
        cloudinaryHiddenField.remove();

        // update DOM
        $el.addClass('hidden');
        // reset states for the next time its shown
        $el.find('.transparent-image-upload').data('valid', false);
        $el.find('.photo-upload').removeClass('photo');
        $el.find('.select-photo-text').removeClass('hidden');
        $el.find('.spinner').addClass('hidden');
        $el.find('.error').addClass('hidden');
        $el.find('.preview').empty();
      }
    });

    if (uploads.length < 4) {
      // make sure the next image to upload is visible
      $(els[uploads.length]).removeClass('hidden');
    }

    $('.photo-upload-container').toggleClass('empty', uploads.length == 0);
  }

  //
  // location
  //
  var displayLocationFromGeocode = function (geo) {
    var parts = [];
    geo.address_components.forEach(function (c) {
      switch (c.types[0]) {
        case 'locality':
          parts.push(c.long_name);
          break;
        case 'administrative_area_level_1':
          parts.push(c.short_name);
          break;
      }
    });
    return parts.join(', ');
  };

  var $geoInput = $('.geocomplete');
  var zoom = 13;
  $geoInput
    .geocomplete({
      location: '대한민국 서울특별시 강남구 역삼동',
      map: '.map',
      details: "form",
      detailsAttribute: "data-geo"
    }).on('geocode:result', function (e, result) {
      $geoInput.change(); // to trigger validation
      $geoInput.geocomplete('map').setZoom(zoom);
      $('.lat-field').val(result.geometry.location.lat());
      $('.lon-field').val(result.geometry.location.lng());
      $('.display-location-field').val(displayLocationFromGeocode(result));
      zoom = $geoInput.geocomplete('map').getZoom();
    });

  updateUploadPlaceholders();
});
