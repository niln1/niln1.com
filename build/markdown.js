#!/usr/bin/env node

/**
* Originally from https://github.com/wookiehangover/wookiehangover.com/blob/master/build/markdown.js
*/

'use strict'

// const cheerio = require('cheerio')
const async = require('async')
const marked = require('marked')
const fs = require('fs')
const glob = require('glob')
const ejs = require('ejs')

// options is optional
// promise is not the answer

// grab all files done
function generateStaticPagesFromMarkDowns(module) {
    glob(`src/${module}/*.md`, {}, function (er, files) {

      console.log(files)
      return Promise.all(files.map(createPostFromMarkdownFile))
      .then((value) => {
        console.log('Files Created', value);
        return createIndexPage(value, module)
      })
      .then(data => {
        console.log(data)
      })
      .catch(err => {
        console.log("rejected:", err)
        throw err
      })
  })
}

function createIndexPage(files, module) {
  return new Promise(done => {
    ejs.renderFile(`src/${module}/index.ejs`, {
      files
    }, (err, post) => {
      if (err) throw err
      return done({
        filename: `docs/${module}/index.html`,
        post
      })
    })
  })
  .then((data) => {
    const filename = data.filename
    const post = data.post
    return new Promise(done => {
      // TODO: render to template
      fs.writeFile(filename, post, 'utf8', (err) => {
        if (err) throw err
        console.log(`✅  ${filename} created`)
        return done({
          filename
        })
      })
    })
  })
}

/**
* For Each file, switch src to docs then
*   convert md to html, and add to template
*   bad sf design
**/
function createPostFromMarkdownFile(filename) {
  // Read file, Covert to HTML, Write to HTML in correct location
  console.log(`Creating files for ${filename}`)
  return Promise.all([
    fileStatPromise(filename),
    readFilePromise(filename)
  ])
  .then((data) => {
    const fileStat = data[0]
    const fileData = data[1]
    const filename = fileData.filename
    const body = fileData.body
    const template = fileData.template

    const context = {
      body,
      title: filename.split('/').pop().split('.')[0] || '', // Get File Name without extension
      mtime: fileStat.mtime,
      btime: fileStat.birthtime
    }

    return new Promise(done => {
      ejs.renderFile(template, context, (err, post) => {
        if (err) throw err
        return done({
          filename,
          post,
          context
        })
      })
    })

    return data
  })
  .then((data) => {
    const filename = data.filename
    const post = data.post
    const context = data.context

    // reuse
    return new Promise(done => {
      // TODO: render to template
      fs.writeFile(filename, post, 'utf8', (err) => {
        if (err) throw err
        console.log(`✅  ${filename} created`)
        return done({
          filename,
          context
        })
      })
    })
  })
  .catch(err => {
    console.log("rejected:", err)
    throw err
  });
}

function readFilePromise(filename) {
  return new Promise(resolve => {
    fs.readFile(filename, 'utf8', (err, file) => {
      if (err) throw err
      return resolve({
        template: filename.split('/').slice(0, -1).concat('template.ejs').join('/'),
        filename: filename.replace(/src/, 'docs').replace(/md$/, 'html'), // change to r
        body: marked(file, { smartypants: true })
      })
    })
  })
}

function fileStatPromise(filename) {
  return new Promise(resolve => {
    fs.stat(filename, (err, fileStat) => {
      if (err) throw err
      return resolve(fileStat)
    })
  })
}

generateStaticPagesFromMarkDowns(`thoughts`)
generateStaticPagesFromMarkDowns(`writings`)

console.log('Building Markdown 📑')
