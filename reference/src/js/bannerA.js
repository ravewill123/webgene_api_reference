var txt = 'BanneerA';
var css = {
    'background': 'rgba(63, 84, 157, 0.5)',
    'paddingTop': '90px'
}

module.exports = function(target) {
    $(target).text(txt).css(css);
}