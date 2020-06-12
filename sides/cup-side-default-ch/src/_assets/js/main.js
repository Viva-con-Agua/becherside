// Bootstrap JS and CSS
import './../sass/_main.scss';
import $ from 'jquery';

$(document).ready(() => {
  const bin = $('#bin_front'),
  cup_wrapper = $('#cup-wrapper');

  // waiting for alle picture to load the set scroll wrapper height
  Promise.all(Array.from(document.images)
  .filter(img => !img.complete)
  .map(img => new Promise(resolve => { img.onload = img.onerror = resolve; })))
  .then(() => { cup_wrapper.height(bin.offset().top); });
  
  $('#contact div.full').each(function() {
      $(this).one('click touch', function() { 
          $('#contact div.full').removeClass('show');
          $('#contact div.outline').addClass('show');
          $(this).addClass('show');
          $(this).siblings().removeClass('show');
          const current = '#contact .icons.' + $(this).parent()[0].classList[0];
          $(current).addClass('show');
      });
  });
  
  $('#contact div.outline').each(function() {
      $(this).on('click touch hover', function() { 
          $('#contact div.full').removeClass('show');
          $('#contact div.icons').removeClass('show');
          $('#contact div.outline').addClass('show');
          $(this).removeClass('show');
          $(this).siblings().addClass('show');
          const current = '#contact .icons.' + $(this).parent()[0].classList[0];
          $(current).addClass('show');
      }); 
  }); 
  
  var docWidth = document.documentElement.offsetWidth;
  
  [].forEach.call(
    document.querySelectorAll('*'),
    function(el) {
      if (el.offsetWidth > docWidth) {
        console.log(el);
      }
    }
  );
});
