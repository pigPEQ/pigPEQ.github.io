(function() {
    /**
     * Icarus 夜间模式 by iMaeGoo
     * https://www.imaegoo.com/
     */ 

    var isNight = 'true';
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