fis.set('domain_test', ''); //开发环境静态资源
// 预发布环境
fis.set('domain_pre', 'http://preuc.fdc.com.cn');
// 线上环境
fis.set('domain_build', 'http://pic.rryao.com/activity/2017-11-02');


// 定义不同域的url
var domain_url = {
    test: {
        "csdn_url": ""
    },
    pre: {
        "csdn_url": "http://preblog.csdn.net"
    },
    build: {
        "csdn_url": "http://blog.csdn.net"
    }
}


fis.match('css/*.less', {
    parser: fis.plugin('less'),
    rExt: '.css'
});

// css前缀
fis.match('css/*.{css,less,scss}', {
    preprocessor: fis.plugin('autoprefixer', {
        "browsers": ["Android >= 4.0", "iOS >= 4", "ie >= 9", "firefox >= 15"],
        "cascade": true
    })
});


// fis.match('::package', {
//      // 对 CSS 进行图片合并
//      spriter: fis.plugin('csssprites')
//  })
//  .match('*.less', {
//      useSprite: true,
//      optimizer: fis.plugin('clean-css')
//  })

// 线上
fis.media('build')
.match('*', {
    domain: "${domain_build}"
})
.match('*.html', {
    parser: fis.plugin('html-replaceurl', {
        newWords: domain_url.build
    })
})