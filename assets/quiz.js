/* Shared quiz widget for every lesson part.
   Markup: <div class="quiz"><p class="q">..</p>
     <button data-correct="true|false">..</button> ...
     <p class="feedback" data-right="..." data-wrong="..."></p></div> */
document.querySelectorAll('.quiz').forEach(function (quiz) {
  var fb = quiz.querySelector('.feedback');
  var rightMsg = (fb && fb.getAttribute('data-right')) ||
    'Correct.';
  var wrongMsg = (fb && fb.getAttribute('data-wrong')) ||
    'Not quite — try again.';
  quiz.querySelectorAll('button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var right = btn.getAttribute('data-correct') === 'true';
      quiz.querySelectorAll('button').forEach(function (b) {
        b.classList.remove('correct', 'wrong');
      });
      btn.classList.add(right ? 'correct' : 'wrong');
      if (fb) {
        fb.textContent = right ? rightMsg : wrongMsg;
        fb.style.color = right ? 'var(--fix)' : 'var(--accent)';
      }
    });
  });
});
