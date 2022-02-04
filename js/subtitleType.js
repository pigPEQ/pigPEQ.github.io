(function() {
    function getYiYan() {
        fetch('https://v1.hitokoto.cn')
            .then(response => response.json())
            .then(data => {
                let subContent = new Array();
                const from = data.from;
                subContent.unshift(data.hitokoto, from);
                const sub = subContent[0].toString();
                var typewriter = new Typewriter('#subtitle', {
                    loop: true,
                    delay: 75,
                });
                typewriter
                    .typeString('<span class="typewriter-sub">'+ subContent[0].toString() + '</span>')
                    .typeString('<br></br>')
                    .pauseFor(2000)
                    .typeString( '<span class="typewriter-from">' + '来自 「' + subContent[1].toString() + '」</span>')
                    .pauseFor(2000)
                    .start();
            })
    }

    getYiYan();
    $('#hitokoto-container').click(function() {
        getYiYan();
    });
})();