(function (window, document) {
  function scrollTo(id) {
    var element = document.getElementById(id);
    var headerOffset = -20;
    var elementPosition = element.offsetTop;
    var offsetPosition = elementPosition - headerOffset;
    document.documentElement.scrollTop = offsetPosition;
    document.body.scrollTop = offsetPosition; // For Safari
  }

  function register($toc) {
    const currentInView = new Set();
    const headingToMenu = new Map();
    const $menus = Array.from($toc.querySelectorAll('.menu-list > li > a'));

    for (const $menu of $menus) {
      const elementId = $menu.getAttribute('href').trim().slice(1);
      const $heading = document.getElementById(elementId);

      if ($heading) {
        headingToMenu.set($heading, $menu);
      }
    }

    const $headings = Array.from(headingToMenu.keys());

    const callback = (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          currentInView.add(entry.target);
        } else {
          currentInView.delete(entry.target);
        }
      }
      let $heading;
      if (currentInView.size) {
        // heading is the first in-view heading
        $heading = [...currentInView].sort(($el1, $el2) => $el1.offsetTop - $el2.offsetTop)[0];
      } else if ($headings.length) {
        // heading is the closest heading above the viewport top
        $heading = $headings
          .filter(($heading) => $heading.offsetTop < window.scrollY)
          .sort(($el1, $el2) => $el2.offsetTop - $el1.offsetTop)[0];
      }
      if ($heading && headingToMenu.has($heading)) {
        $menus.forEach(($menu) => $menu.classList.remove('is-active'));

        const $menu = headingToMenu.get($heading);
        $menu.classList.add('is-active');
        let $menuList = $menu.parentElement.parentElement;
        while (
          $menuList.classList.contains('menu-list') &&
          $menuList.parentElement.tagName.toLowerCase() === 'li'
        ) {
          $menuList.parentElement.children[0].classList.add('is-active');
          $menuList = $menuList.parentElement.parentElement;
        }
      }
    };
    const observer = new IntersectionObserver(callback, { threshold: 0 });

    for (const $heading of $headings) {
      observer.observe($heading);
      // smooth scroll to the heading
      if (headingToMenu.has($heading)) {
        const $menu = headingToMenu.get($heading);
        $menu.setAttribute('data-href', $menu.getAttribute('href'));
        $menu.setAttribute('href', 'javascript:;');
        $menu.addEventListener('click', () => {
          if (typeof $heading.scrollTo === 'function') {
            //   $heading.scrollIntoView({ behavior: 'smooth', block: 'center' });
            scrollTo($heading.id);
          }
          const anchor = $menu.getAttribute('data-href');
          if (history.pushState) {
            history.pushState(null, null, anchor);
          } else {
            location.hash = anchor;
          }
        });
        // $heading.style.scrollMargin = '1em';
        // $heading.style.marginTop = '-.8em';
        // $heading.style.paddingTop = '.8em';
        $heading.style.scrollMargin = '3.5em';
        // $heading.style.scrollSnapMargin = '1.5em';
      }
    }
  }

  if (typeof window.IntersectionObserver === 'undefined') {
    return;
  }

  document.querySelectorAll('#toc').forEach(register);

  function loadTwikooNewComment() {
    var twikooOrgPaths = ['/', '/api.html', '/cms.html', '/configuration.html', '/faq.html', '/link.html', '/quick-start.html'];
    var twikooNewEl = document.getElementsByClassName('twikoo-new-container');
    if (twikooNewEl.length === 0) return;
    twikoo.getRecentComments({
      envId: window.twikooEnvId,
      pageSize: 5,
      includeReply: true
    }).then(function (res) {
      var innerHTML = '';
      for (var idx1 = 0; idx1 < res.length; idx1++) {
        var item = res[idx1];
        if (!item.commentText.trim()) continue
        if (twikooOrgPaths.indexOf(item.url) !== -1) item.url = 'https://twikoo.js.org' + item.url;
        innerHTML += '<article class="media">'
          + '<div class="media-left"><a class="image is-64x64" href="' + item.url + '#' + item.id + '"><img style="border-radius: 50%" src="' + item.avatar + '"></a></div>'
          + '<div class="media-content">'
          + '<p class="date">' + item.nick + '　' + item.relativeTime + '</p>'
          + '<p class="title twikoo-new-content"><a href="' + item.url + '#' + item.id + '">' + changeContent(item.commentText) + '</a></p>'
          + '</div></article>';
      }
      
      for (var idx2 = 0; idx2 < twikooNewEl.length; idx2++) {
        twikooNewEl[idx2].innerHTML = innerHTML;
      }
    }).catch(function (err) {
      console.error(err);
      twikooNewEl.innerHTML = '加载失败';
    });
  }

  // 从 butterfly 主题借鉴
  // https://github.com/jerryc127/hexo-theme-butterfly/blob/dev/layout/includes/third-party/newest-comments/twikoo-comment.pug
  function changeContent(content) {
    if (content === '') return content;
    content = content.replace(/<[^>]+>/g, ''); // remove html tag
    if (content.length > 150) {
      content = content.substring(0, 150) + '...';
    }
    return content;
  }

  loadTwikooNewComment();


})(window, document);
