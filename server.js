const cds = require('@sap/cds')
const Sdk = require('@dynatrace/oneagent-sdk')
const DynaT = Sdk.createInstance()


console.log(DynaT.getCurrentState())

global.__base = __dirname + "/"
console.log(global.__base)
console.log(`CDS Custom Boostrap from /srv/server.js`)

process.on('uncaughtException', function (err) {
    console.error(err.name + ': ' + err.message, err.stack.replace(/.*\n/, '\n')) // eslint-disable-line
})

module.exports = async (o) => {
    o.port = process.env.PORT || 4004
    //API route (Disabled by default)
    o.baseDir = global.__base
    o.routes = []

    const express = require('express')
    let app = express()
    app.use(express.urlencoded())
    app.express = express
    app.baseDir = o.baseDir
    o.app = app

    const path = require('path')
    const fileExists = require('fs').existsSync

    let expressFile = path.join(app.baseDir, 'server/express.js')

    if (fileExists(expressFile)) {
        await require(expressFile)(app)
    }
    o.app.httpServer = await cds.server(o)
    //Load routes
    const glob = require('glob')
    let routesDir = path.join(global.__base, 'routes/**/*.js')
    let files = glob.sync(routesDir)
    this.routerFiles = files;
    if (files.length !== 0) {
        for (let file of files) {
            await require(file)(app, o.app.httpServer)
        }
    }   
    return o.app.httpServer
}  