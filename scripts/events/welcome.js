const logger = require('hexo-log')()

hexo.on('ready', () => {
  const { version } = require('../../package.json')
  logger.info(`
┏━━━━━━━━━┳━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┳━━━━━━━━━━━━━┓
┃~Browser~┃ ECX-UI - 1.3.0 ┃[+]                                               ┃ [-] [□] [X] ┃
┣━━━━━━━━━┻━━━┳━━━━━━━━━━━━┻━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┻━━━━━━━━━━━━━┫
┃ECX-UI:      ┃                                                                             ┃
┃ ├Rounded    ┃  ██████╗   ██████╗   █═╗   █╗                    █═╗    █═╗     ███████╗    ┃
┃ ├colorful   ┃  █ ╔═══╝  █ ╔════╝    █╚╗ █╔╝                    █ ║    █ ║        █ ╔═╝    ┃
┃ ├creatively ┃  █ ║      █ ║          █╣█╔╝                     █ ║    █ ║        █ ║      ┃
┃ └wonderful  ┃  ██████╗  █ ║           █ ╣      ███████████╗    █ ║    █ ║        █ ║      ┃
┃             ┃  █ ╔═══╝  █ ║          █╔█╚╗     ╚══════════╝    █ ║    █ ║        █ ║      ┃
┃             ┃  █ ║      █ ║         █╔╝ █╚╗                    █ ║    █ ╚╗       █ ║      ┃
┃             ┃  ██████╗   ██████╗   █╔╝   █║                     ██████╦█ ║    ███████╗    ┃
┃  ECX-UI:    ┃  ╚═════╝   ╚═════╝   ╚╝    ╚╝                     ╚═════╝╚═╝    ╚══════╝    ┃
┃  V - 1.3.0  ┃                            butterfly : ${version}                                ┃
┣━━━━━━━━━━━━━┻━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                         Ecx-UI by Echocbx - https://ezgx.tk/                              ┃
┃                  based-on--theme-butterfly - https://butterfly.js.org/                    ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
`)
})
