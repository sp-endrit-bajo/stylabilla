'use strict'

const async = require('async')
const glob = require('glob')
const chalk = require('chalk')
const pa11y = require('pa11y')
const parseArgs = require('minimist')

const args = parseArgs(process.argv.slice(2))
const url = args.host || 'http://localhost:8080/'
const dir = args.dir || './docs'
const concurrency = args.concurrency || 1
const ignore = String(args.ignore || '')
const section = String(args._[0] || '*')

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

const sectionPath = section.split('.').join('-')

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
