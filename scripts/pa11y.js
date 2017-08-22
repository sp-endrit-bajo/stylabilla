'use strict'

const async = require('async')
const glob = require('glob')
const chalk = require('chalk')
const pa11y = require('pa11y')
const program = require('commander')

program
  .version('0.1.0')
  .usage('[options] <section to test (ex. "buttons.colors")>')
  .option('-u, --url [url]', 'Url to test', 'http://localhost:8080/')
  .option('-d, --dir [path]', 'Path of the stylabilla docs directory', './docs')
  .option('-c, --concurrency [number]', 'Number of cuncurrent tests. Default is one test at a time. (Ex. --concurrency 1', 1)
  .option('-i, --ignore [string]', 'Pa11y messages to ignore. One of: notice, warning, error. (Ex. --ignore "notice,warning")', '')
  .parse(process.argv);

const url = program.url
const dir = program.dir
const concurrency = program.concurrency
const ignore = program.ignore
const section = program.args[0] || '*'

const test = pa11y({
  allowedStandards: ['WCAG2AA'],
  ignore: ignore.split(',')
})

const log = console.log

const logUrl = (url) => {
  log(chalk.dim('  ####### ') + chalk.greenBright.bold(url) + chalk.dim(' #######'))
  log()
}

const logError = (result) => {
  log(chalk.red(' • Error: ') + chalk.dim(result.context))
  log('   ' + result.message)
  log()
}

const logWarning = (result) => {
  log(chalk.yellow(' • Warning: ') + chalk.dim(result.context))
  log('   ' + result.message)
  log()
}

const logNotice = (result) => {
  log(chalk.cyan(' • Notice: ') + chalk.dim(result.context))
  log('   ' + result.message)
  log()
}

const logResults = (url, results) => {
  logUrl(url)

  results
    .filter(result => result.type === 'error')
    .forEach(logError)

  results
    .filter(result => result.type === 'warning')
    .forEach(logWarning)

  results
    .filter(result => result.type === 'notice')
    .forEach(logNotice)
}

const sectionPath = section.toLowerCase().split('.').join('-')

glob(`item-${sectionPath}*.html`, { cwd: dir }, function (er, files) {
  const urls = files.map(file => url + file)

  const queue = async.queue((url, done) => {
    test.run(url, (error, results) => {
      if (error) {
        return console.error(error.message)
      }
      logResults(url, results)
      done()
    })
  }, concurrency)

  queue.push(urls)
})
