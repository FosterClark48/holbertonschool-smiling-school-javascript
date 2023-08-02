// QUOTE SECTIONS
function createQuoteSlide(quote) {
    const { pic_url, name, title, text } = quote;

    const slide = $('<div>').addClass('carousel-item');
    const row = $('<div>').addClass('row mx-auto align-items-center').appendTo(slide);
    const imgCol = $('<div>').addClass('col-12 col-sm-2 col-lg-2 offset-lg-1 text-center').appendTo(row);
    const img = $('<img>').attr({
        'src': pic_url,
        'alt': 'Carousel Pic'
    }).addClass('d-block align-self-center').appendTo(imgCol);
    const textCol = $('<div>').addClass('col-12 col-sm-7 offset-sm-2 col-lg-9 offset-lg-0').appendTo(row);
    const quoteText = $('<div>').addClass('quote-text').appendTo(textCol);
    const p = $('<p>').addClass('text-white').text(text).appendTo(quoteText);
    const h4 = $('<h4>').addClass('text-white font-weight-bold').text(name).appendTo(quoteText);
    const span = $('<span>').addClass('text-white').text(title).appendTo(quoteText);

    return slide;
}

$(document).ready(function () {
    var loader = $('.loader');
    loader.show();

    $.get("https://smileschool-api.hbtn.info/quotes", function (data) {
        loader.hide();
        $('#carouselExampleControls .carousel-inner').empty();

        data.forEach((quote, index) => {
            var slide = createQuoteSlide(quote);
            if (index === 0) {
                slide.addClass('active');
            }
            $('#carouselExampleControls .carousel-inner').append(slide);
        });
    });
});

// POPULAR VIDEO/LATEST VIDEO SECTIONS
function createCard(video) {
    const { thumb_url, title, 'sub-title': sub_title, author_pic_url, author, duration, star } = video;

    let stars = '';
    for(let i = 1; i <= 5; i++) {
        if(i <= star) {
            stars += '<img src="images/star_on.png" alt="star on" width="15px" height="15px">';
        } else {
            stars += '<img src="images/star_off.png" alt="star off" width="15px" height="15px">';
        }
    }

    const cardContainer = $('<div>').addClass('col-12 col-sm-6 col-md-4 card-deck');
    const card = $('<div>').addClass('card border-0 d-flex flex-column').appendTo(cardContainer);

    const thumbnailContainer = $('<div>').addClass('thumbnail-container position-relative').appendTo(card);
    $('<img>').attr({'src': thumb_url, 'alt': 'Video thumbnail'}).addClass('card-img-top').appendTo(thumbnailContainer);

    const overlay = $('<div>').addClass('card-img-overlay text-center').appendTo(thumbnailContainer);
    $('<img>').attr({'src': 'images/play.png', 'alt': 'Play Button', 'width': '64px'}).addClass('align-self-center play-overlay').appendTo(overlay);

    const cardBody = $('<div>').addClass('card-body px-2').appendTo(card);
    $('<h5>').addClass('card-title font-weight-bold').text(title).appendTo(cardBody);

    $('<p>').addClass('card-text text-muted').text(sub_title).appendTo(cardBody);

    const creator = $('<div>').addClass('creator d-flex align-items-center').appendTo(cardBody);
    $('<img>').attr({'src': author_pic_url, 'alt': 'Author'}).css('width', '30px').addClass('rounded-circle').appendTo(creator);
    $('<h6>').addClass('pl-3 m-0 main-color').text(author).appendTo(creator);

    const info = $('<div>').addClass('info pt-3 d-flex justify-content-between').appendTo(cardBody);
    const rating = $('<div>').addClass('rating d-flex').appendTo(info);
    rating.append(stars);
    $('<span>').addClass('main-color').text(duration).appendTo(info);

    return cardContainer;
}

function populateSection(carouselSelector, url, prevArrow, nextArrow) {
    const loader = $('.loader');
    loader.show();

    $.get(url, function (data) {
        loader.hide();
        $(carouselSelector).empty();

        console.log(`Data fetched for ${carouselSelector}: `, data);

        data.forEach((video, index) => {
            const card = createCard(video);
            $(carouselSelector).append(card);
        });

        $(carouselSelector).slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            prevArrow: prevArrow,
            nextArrow: nextArrow,
            responsive: [
                {
                    breakpoint: 769,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 576,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        });

        $(prevArrow).removeClass("slick-hidden");
        $(nextArrow).removeClass("slick-hidden");
    });
}

$(document).ready(function () {
    console.log("Document is ready");

    populateSection('.carousel-inner.carousel-popular', "https://smileschool-api.hbtn.info/popular-tutorials", '.slick-prev-popular', '.slick-next-popular');
    populateSection('.carousel-inner.carousel-latest', 'https://smileschool-api.hbtn.info/latest-videos', '.slick-prev-latest', '.slick-next-latest');
});

// COURSES SEARCH/RESULTS SECTIONS
function createCourseCard(course) {
    const { thumb_url, title, 'sub-title': sub_title, author_pic_url, author, duration, star } = course;

    let stars = '';
    for(let i = 1; i <= 5; i++) {
        if(i <= star) {
            stars += '<img src="images/star_on.png" alt="star on" width="15px" height="15px">';
        } else {
            stars += '<img src="images/star_off.png" alt="star off" width="15px" height="15px">';
        }
    }

    const cardContainer = $('<div>').addClass('col-12 col-sm-6 col-md-3 card-deck');
    const card = $('<div>').addClass('card border-0 d-flex flex-column').appendTo(cardContainer);

    const thumbnailContainer = $('<div>').addClass('thumbnail-container position-relative').appendTo(card);
    $('<img>').attr({'src': thumb_url, 'alt': 'Video thumbnail'}).addClass('card-img-top').appendTo(thumbnailContainer);

    const overlay = $('<div>').addClass('card-img-overlay text-center').appendTo(thumbnailContainer);
    $('<img>').attr({'src': 'images/play.png', 'alt': 'Play Button', 'width': '64px'}).addClass('align-self-center play-overlay').appendTo(overlay);

    const cardBody = $('<div>').addClass('card-body px-2').appendTo(card);
    $('<h5>').addClass('card-title font-weight-bold').text(title).appendTo(cardBody);

    $('<p>').addClass('card-text text-muted').text(sub_title).appendTo(cardBody);

    const creator = $('<div>').addClass('creator d-flex align-items-center').appendTo(cardBody);
    $('<img>').attr({'src': author_pic_url, 'alt': 'Author'}).css('width', '30px').addClass('rounded-circle').appendTo(creator);
    $('<h6>').addClass('pl-3 m-0 main-color').text(author).appendTo(creator);

    const info = $('<div>').addClass('info pt-3 d-flex justify-content-between').appendTo(cardBody);
    const rating = $('<div>').addClass('rating d-flex').appendTo(info);
    rating.append(stars);
    $('<span>').addClass('main-color').text(duration).appendTo(info);

    return cardContainer;
}

function updateSelections(data) {
    // Set the first topic and sort option as selected
    if (data.topics.length > 0) {
        $('.box2 .btn span').text(data.topics[0]);
    }

    if (data.sorts.length > 0) {
        $('.box3 .btn span').text(data.sorts[0]);
    }
}

function populateCourses(coursesSelector, url, query = '', topic = 'all', sort = 'most_popular') {
    const loader = $('.loader');
    loader.show();

    $.get(url, { q: query, topic: topic, sort: sort }, function (data) {
        loader.hide();
        $(coursesSelector).empty();

        console.log(`Data fetched for ${coursesSelector}: `, data);

        // Set the search value
        $('#keywords').val(data.q);

        // Dynamically create Topic dropdown items
        $('.box2 .dropdown-menu').html('');
        data.topics.forEach(topic => {
            $('.box2 .dropdown-menu').append(`<a class="dropdown-item" href="#">${topic}</a>`);
        });

        // Dynamically create Sort by dropdown items
        $('.box3 .dropdown-menu').html('');
        data.sorts.forEach(sort => {
            $('.box3 .dropdown-menu').append(`<a class="dropdown-item" href="#">${sort}</a>`);
        });

        // Update the selected options
        updateSelections(data);

        $('#section-title').html(`<span class="text-muted video-count">${data.courses.length} videos</span>`);

        data.courses.forEach((course, index) => {
            const card = createCourseCard(course);
            $(coursesSelector).append(card);
        });

        // Reload courses when a new Topic is selected
        $('.box2 .dropdown-item').on('click', function(e) {
            e.preventDefault();
            $('.box2 .btn span').text($(this).text());
            populateCourses('#courses-list', coursesApiUrl, $('.search-text-area').val(), $(this).text(), $('.box3 .btn span').text());
        });

        // Reload courses when a new Sort by is selected
        $('.box3 .dropdown-item').on('click', function(e) {
            e.preventDefault();
            $('.box3 .btn span').text($(this).text());
            populateCourses('#courses-list', coursesApiUrl, $('.search-text-area').val(), $('.box2 .btn span').text(), $(this).text());
        });
    });
}

$(document).ready(function () {
    console.log("Document is ready");

    const coursesApiUrl = "https://smileschool-api.hbtn.info/courses";

    populateCourses('#courses-list', coursesApiUrl);

    // Reload courses when search value changes
    $('.search-text-area').on('change', function() {
        populateCourses('#courses-list', coursesApiUrl, $(this).val(), $('.box2 .btn span').text(), $('.box3 .btn span').text());
    });
});
