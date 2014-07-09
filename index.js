var cheerio = require('cheerio');

module.exports = {
    book: {
        assets: "assets",
        css: [ "multipart.css" ]
    },
    hooks: {
        // I'd like to see "summary:before" to allow munging the content of the
        // SUMMARY.md before it's read. Or "summary:after" to allow messing with
        // the generated summary object model. Then I could support SUMMARY.md
        // with h2 and multiple lists

        // Requires an unhealthy knowledge of the generated template...
        "page:after": function(page) {

            var $ = cheerio.load(page.content);

            // Replace top level li.chapter with li.part
            $('ul.summary > li.chapter').each(function(i, elem) {
                var li = $(elem);
                li.removeClass('chapter');
                li.addClass('part');
            });

            // Remove the chapter number from the part header
            $('ul.summary > li.part > span > b').remove();
            $('ul.summary > li.part > a > b').remove();

            // Bump the remaining chapter numbers so each chapter is only unique
            // within the part
            $('ul.summary > li.part li.chapter b').each(function(i, elem) {
                var b = $(elem);
                var text = b.text();
                var index = text.indexOf('.');
                if (index > -1)
                    b.text(text.substring(index + 1));
            });

            page.content = $.html();
            return page;
        }
    }
};
