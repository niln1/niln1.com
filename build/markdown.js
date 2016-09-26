#!/usr/bin/env node

/**
* Originally from https://github.com/wookiehangover/wookiehangover.com/blob/master/build/markdown.js
*/

'use strict'

// const cheerio = require('cheerio')
const async = require('async')
const marked = require('marked')
const fs = require('fs')
const glob = require("glob")

// options is optional
glob("src/*/*.md", {}, function (er, files) {
  console.log(er)
  console.log(files)
  createPostFromMarkdownFile(files[0])
  // files is an array of filenames.
  // If the `nonull` option is set, and nothing
  // was found, then files is ["**/*.js"]
  // er is an error object or null.
})

console.log('Building Markdown 📑')

function createPostFromMarkdownFile(filename, finalDone) {
  // Read file, Covert to HTML, Write to HTML in correct location

  return new Promise(done => {
    fs.readFile(filename, 'utf8', (err, file) => {
      if (err) throw err
      return done({
        filename: filename.replace('src', 'public').replace('md', 'html'),
        body: marked(file, { smartypants: true })
      })
    })
  })
  .then((data) => {
    const filename = data.filename
    const body = data.body
    
    return new Promise(done => {
      fs.writeFile(filename, body, (err) => {
        if (err) throw err
        console.log(`✅  ${filename} created`)
        return done(filename, body)
      })
    })
  }).catch(err => console.log("rejected:", err));

}

// function createPostFromMarkdownFile(filename, done){
//   fs.readFile(filename, 'utf8', (err, file) => {
//     if (err) throw err
//     const body      = marked(file, { smartypants: true })
//     return body
//   })
// }

// function createIndexPage(markdowns, )
// async.map(posts, renderPost, (err, posts) => {
//   if (err) throw err
//
//   async.parallel([
//     function(done) {
//       writeTemplate(posts, 'index.html', (err) => {
//         if (!err) console.log('✅  index.html updated')
//         done(err)
//       })
//     },
//     function(done) {
//       ejs.renderFile('./templates/posts.html', { posts }, (err, data) => {
//         fs.writeFile('writing/index.html', data, (err) => {
//           if (!err) console.log(`✅  writing/index.html created`)
//           done(err)
//         })
//       })
//     }
//   ], (err) => {
//     if (err) throw err
//     console.log('Markdown build complete.')
//   })
//
// })

// function renderPost(path, done) {
//   const filename = `writing/${path}`
//
//   async.parallel({
//     stats: done => fs.stat(filename, done),
//     post: done => fs.readFile(filename, 'utf8', done)
//   }, (err, results) => {
//     if (err) return done(err)
//
//     const body      = marked(results.post, { smartypants: true })
//     const permalink = filename.replace(/md$/, 'html')
//     const slug      = path.replace('.md', '')
//     const title     = (results.post.split('\n')[0] || 'Untitled 👻').replace('##', '')
//     const updatedAt = results.stats.mtime
//
//     const context = {
//       body,
//       filename,
//       permalink,
//       slug,
//       title,
//       updatedAt
//     }
//
//     ejs.renderFile('./templates/post.html', context, (err, data) => {
//       fs.writeFile(permalink, data, (err) => {
//         done(err, context)
//         console.log(`✅  writing/${filename} -> ${permalink}`)
//       })
//     })
//   })
// }

// function writeTemplate(posts, target, done) {
//   async.parallel({
//     index: done => fs.readFile('index.html', 'utf8', done),
//     template: done => fs.readFile('templates/post_body.html', 'utf8', done)
//   }, (err, results) => {
//     if (err) return done(err)
//
//     const $ = cheerio.load(results.index)
//     const links = posts.map(post => `<li><a href=${post.permalink}>${post.title}</a></li>`).join('\n')
//     $('.posts').html(`<ol>${links}</ol>`)
//
//     fs.writeFile(target, $.html(), done)
//   })
// }
