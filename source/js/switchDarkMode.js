//切换夜间
function switchDarkMode(){
const nowMode = document.documentElement.getAttribute(‘data-theme’) === ‘dark’ ? ‘dark’ : ‘light’
if (nowMode === ‘light’) {
activateDarkMode()
saveToLocal.set(‘theme’, ‘dark’, 2)
GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night)
} else {
activateLightMode()
saveToLocal.set(‘theme’, ‘light’, 2)
GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.night_to_day)
}
// handle some cases
typeof utterancesTheme === ‘function’ && utterancesTheme()
typeof changeGiscusTheme === ‘function’ && changeGiscusTheme()
typeof FB === ‘object’ && window.loadFBComment()
typeof runMermaid === ‘function’ && window.runMermaid()
}