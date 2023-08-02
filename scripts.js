// QUOTE SECTION
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

// POPULAR VIDEO SECTION
function createVideoCard(video) {
    var card = $('<div>').addClass('card');
    var img = $('<img>').attr({
        'src': video.thumb_url,
        'alt': 'Video thumbnail'
    }).addClass('card-img-top');

    var playOverlay = $('<div>').addClass('card-img-overlay text-center');
    var playButton = $('<img>').attr({
        'src': 'images/play.png',
        'alt': 'Play',
        'width': '64px'
    }).addClass('align-self-center play-overlay');
    playOverlay.append(playButton);

    var cardBody = $('<div>').addClass('card-body');
    var cardTitle = $('<h5>').text(video.title).addClass('card-title font-weight-bold');

    var cardText = $('<p>').text(video['sub-title']).addClass('card-text text-muted');

    var creator = $('<div>').addClass('creator d-flex align-items-center');
    var creatorImage = $('<img>').attr({
        'src': video.author_pic_url,
        'alt': 'Creator of video',
        'width': '30px'
    }).addClass('rounded-circle');
    var creatorName = $('<h6>').text(video.author).addClass('pl-3 m-0 main-color');
    creator.append(creatorImage, creatorName);

    var info = $('<div>').addClass('info pt-3 d-flex justify-content-between');
    var rating = $('<div>').addClass('rating');
    for (var i = 0; i < 5; i++) {
        var star = $('<img>').attr({
            'src': (i < video.star ? 'images/star_on.png' : 'images/star_off.png'),
            'alt': 'star on',
            'width': '15px'
        });
        rating.append(star);
    }
    var duration = $('<span>').text(video.duration).addClass('main-color');
    info.append(rating, duration);

    cardBody.append(cardTitle, cardText, creator, info);
    card.append(img, playOverlay, cardBody);

    return $('<div>').addClass('col-sm-6 col-md-6 col-lg-3 d-sm-flex justify-content-md-start justify-content-lg-center').append(card);
}


function fetchVideos() {
    var loader = $('#loader');
    loader.show();

    $.get("https://smileschool-api.hbtn.info/popular-tutorials", function (data) {
        loader.hide();
        var carouselInner = $('#carouselExampleControls2 .carousel-inner');
        carouselInner.empty();

        var slide = $('<div>').addClass('carousel-item active');
        var row = $('<div>').addClass('row');
        slide.append(row);

        for (var i = 0; i < data.length; i++) {
            var cardCol = createVideoCard(data[i]);
            row.append(cardCol);

            if (i > 0 && (i + 1) % 4 === 0 && i !== data.length - 1) {
                slide = $('<div>').addClass('carousel-item');
                row = $('<div>').addClass('row');
                slide.append(row);
                carouselInner.append(slide);
            }
        }

        carouselInner.append(slide);
    });
}

$(document).ready(fetchVideos);

