# a11y-tuts

A GEL Accessible Authoring Guide: Tutorials for implementing BBC GEL accessibly.

## Just Want to View the Tutorials?

The generated tutorials are [hosted on github pages](https://bbc.github.io/a11y-tuts/). These are free and open, so enjoy!

## Updating the Tutorials

You only need a web browser to view and use the tutorials, however if you would like to develop and contribute to the project that is used to _generate the tutorial website_, you will also need the usual NodeJS development tools installed. Specifically, this project uses the Node Package Manager `npm` to install and manage its software dependencies.

### Prerequisites

In order to develop the project used to generate the tutorial website, you will need [the `git` software version control tool](https://git-scm.com/) and a recent version (`>= 4.3`) of [the `node` JavaScript runtime engine](https://nodejs.org/en/) – which includes the `npm` package manager. The only other requirements are your favourite plain-text editor and a willingness to share!

```
$ git --version
  git version 2.14.3 (Apple Git-98)
$ node --version
  v4.3.2
```

### Installation

You are only three steps away from getting started as a contributor!

```
$ git clone git@github.com:bbc/a11y-tuts.git
$ cd a11y-tuts/
$ npm install
```

Now open your plain-text editor and have a look around!

### Working with Tutorial Source Documents

The source files for all tutorials are kept in the project `/src` folder. These are formatted as plain old [markdown text](https://en.wikipedia.org/wiki/Markdown) files. To edit a tutorial, simply make the desired changes to the corresponding `.md` file in the `/src` folder.

To generate the tutorial HTML document for publishing simply execute the `npm run docs` command from a terminal and then commit/push any changes to the project github repo (or [create a pull-request](https://github.com/bbc/a11y-tuts/pulls)).

You may optionally run the `npm run clean` command before regenerating the docs, if your change should include either removing or renaming a tutorial file.

_Note_ that the output of the `npm run docs` command is a collection of ordinary HTML documents. These can be previewed in your favourite web-browser directly from your desktop if you wish, before you commit your updates to github.
