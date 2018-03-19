# a11y-tutorials

A GEL Accessible Authoring Guide: Tutorials for implementing BBC GEL accessibly.

## Just Want to View the Tutorials?

The generated tutorials are [hosted at https://bbc.github.io/a11y-tutorials/](https://bbc.github.io/a11y-tutorials/).

## Development

This repository is merely markdown source files and the docs that are generated from those source files. The tool that is used to build the `docs` from `src` is in a BBC-only repo named "a11y-tutorials-build".

If you have HTML asset files, such as demos, in your `src` tree and you wish to see them rendered while without bothering to run the build tool, you may run a local static file server with the server tool of your choice.

```
npm install -g serve
cd a11y-tutorials/src
serve -l
```