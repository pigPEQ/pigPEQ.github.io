(function () {
    /**
     * Icarus 夜间模式 by iMaeGoo
     * https://www.imaegoo.com/
     */
    function isNightFun() {
        var isNightTemp = localStorage.getExpire('dark');

        // 第一次进来判断是白天还是晚上
        if (isNightTemp == null || isNightTemp == undefined) {
            if (isNightRange("19:00", "23:59") || isNightRange("00:00", "07:00")) {
                isNightTemp = 'true';
            } else {
                isNightTemp = 'false';
            }
            localStorage.setExpire("dark", isNightTemp, expireTime1H);
        }
        return isNightTemp;
    }

    var isNight = isNightFun();
    var darkNav;

    function applyNight(value) {
        if (value.toString() === 'true') {
            document.body.classList.remove('light');
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
            document.body.classList.add('light');
        }
    }

    function findNightNav() {
        darkNav = document.getElementById('dark-nav');
        if (!darkNav) {
            setTimeout(findNightNav, 100);
        } else {
            darkNav.addEventListener('click', switchNight);
        }
    }

    function switchNight() {
        isNight = isNight ? isNight.toString() !== 'true' : true;
        applyNight(isNight);
        localStorage.setItem('dark', isNight);
    }

    findNightNav();
    isNight && applyNight(isNight);
}());