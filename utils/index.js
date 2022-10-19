const stripDomain = (url) => {
    return url.replace(/^.*\/\/[^\/]+/, '');
}

module.exports = {
    stripDomain
}