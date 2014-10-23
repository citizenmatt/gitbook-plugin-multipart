var cheerio = require('cheerio');

module.exports = {
    book: {
        assets: "assets",
        css: [ "multipart.css" ]
    },
    hooks: {
        // Gets plain text content
        "summary:before": function(summary) {

            // If the file contains an h2, we need to reformat it
            if (summary.content.match(/^## /m)) {

                // Indent all existing list items, then replace the h2 with a top level list item
                // and then remove any blank lines
                summary.content = summary.content.replace(/^(\s*\* .*)$/gm, "    $1")
                    .replace(/^## (.*)$/gm, "* $1")
                    .replace(/(\*.*)\n\n/gm, "$1\n");
            }

            return summary;
        },

        // Requires an unhealthy knowledge of the generated template...
        "page:after": function(page) {

            var $ = cheerio.load(page.content);

            // Replace top level li.chapter with li.part
            $('ul.summary > li.chapter').each(function(i, elem) {
                var li = $(elem);
                li.removeClass('chapter');
                li.addClass('part');

                if (i > 0)
                    li.before('<li class="part divider" />');
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
