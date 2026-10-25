(function(){
  var nav=document.getElementById('top-nav');
  var toggle=nav.querySelector('.nav-toggle');
  var menu=document.getElementById('site-menu');
  var links=menu.querySelectorAll('a');
  var sub=menu.querySelector('.has-sub');
  var subBtn=sub.querySelector('.sub-toggle');

  var yr=document.getElementById('year');if(yr)yr.textContent=new Date().getFullYear();

  function onScroll(){nav.classList.toggle('is-scrolled',window.scrollY>24)}
  onScroll();
  window.addEventListener('scroll',onScroll,{passive:true});

  function setSub(open){
    sub.classList.toggle('is-open',open);
    subBtn.setAttribute('aria-expanded',open);
  }
  subBtn.addEventListener('click',function(e){
    e.stopPropagation();
    setSub(subBtn.getAttribute('aria-expanded')!=='true');
  });

  function setMenu(open){
    nav.classList.toggle('is-open',open);
    toggle.setAttribute('aria-expanded',open);
    toggle.setAttribute('aria-label',open?'Close menu':'Open menu');
    if(!open)setSub(false);
  }
  toggle.addEventListener('click',function(){setMenu(toggle.getAttribute('aria-expanded')!=='true')});
  links.forEach(function(a){a.addEventListener('click',function(){setMenu(false)})});
  document.addEventListener('keydown',function(e){
    if(e.key!=='Escape')return;
    if(sub.classList.contains('is-open')){setSub(false);subBtn.focus();return}
    if(nav.classList.contains('is-open')){setMenu(false);toggle.focus()}
  });
  document.addEventListener('click',function(e){
    if(!sub.contains(e.target))setSub(false);
    if(nav.classList.contains('is-open')&&!nav.contains(e.target))setMenu(false);
  });
  window.matchMedia('(min-width:861px)').addEventListener('change',function(e){if(e.matches)setMenu(false)});

  /* Active link highlighting (home page only: follows the section in view) */
  if('IntersectionObserver' in window&&document.getElementById('home')){
    var map={home:menu.querySelector('a[href="#home"]'),products:subBtn,
             about:menu.querySelector('a[href="#about"]'),contact:menu.querySelector('a[href="#contact"]')};
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(en.isIntersecting){
          Object.keys(map).forEach(function(k){if(map[k])map[k].removeAttribute('aria-current')});
          var a=map[en.target.id];if(a)a.setAttribute('aria-current','true');
        }
      });
    },{rootMargin:'-45% 0px -50% 0px'});
    Object.keys(map).forEach(function(id){
      var sec=document.getElementById(id);if(sec)io.observe(sec);
    });
  }
})();
