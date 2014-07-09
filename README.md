# gitbook-plugin-multipart

A plugin to [GitBook](https://www.gitbook.io) to structure your book into multiple parts, rather than a single list of chapters. Modifies the output of the default 'site' templates to treat top level chapters as book "parts", and renumber the child chapters uniquely within that "part".

In other words, it changes the summary from this:

    1. Part I - Introduction
      1.1. Really interesting
      1.2. Did you know?
      1.3. Oh yes
        1.3.1. I know!
        1.3.2. Quite
      1.4. Gosh
    2. Part 2 - Advanced
      2.1. Right then
      2.2. Let's get busy
      2.3. No more mucking about
      2.4. Of course

Into this:

    Part I - Introduction
    1. Really interesting
    2. Did you know?
    3. Oh yes
      3.1. I know!
      3.2. Quite
    4. Gosh

    Part 2 - Advanced
    1. Right then
    2. Let's get busy
    3. No more mucking about
    4. Of course

The difference is mainly cosmetic - the part headers lose their chapter numbers, and child chapters are renumbered to be unique to that part (their left-most chapter number is removed - `1.2.` becomes `2.`). Also, part headers are never greyed out, even if they don't have a link.

## Usage

You can install it via npm:

    $ npm install gitbook-plugin-multipart

And use it in your book by updating the list of plugins in your `book.json` file:

```json
{
  "plugins": [ ..., "multipart", ... ]
}
```

No changes to the `SUMMARY.md` are necessary - all chapters are still written in a single large list, with top level list items being converted into part titles.

Note that it only works with the default `site` generator, since it manipulates the HTML of the generated page.
