(() => {
"use strict";
const demoModal = document.getElementById('demoModal');
    const demoTitle = document.getElementById('demoTitle');
    const demoText = document.getElementById('demoText');
    const closeDemoBtn = document.getElementById('closeDemo');

    document.querySelectorAll('[data-demo-title]').forEach(btn => {
      btn.addEventListener('click', () => {
        demoTitle.textContent = btn.dataset.demoTitle;
        demoText.textContent = btn.dataset.demoCopy;
        demoModal.classList.add('show');
        demoModal.setAttribute('aria-hidden', 'false');
      });
    });

    function closeDemo(){
      demoModal.classList.remove('show');
      demoModal.setAttribute('aria-hidden', 'true');
    }

    closeDemoBtn.addEventListener('click', closeDemo);
    demoModal.addEventListener('click', e => { if(e.target === demoModal) closeDemo(); });

    const interestModal = document.getElementById('interestModal');
    const openInterest = document.getElementById('openInterest');
    const closeInterest = document.getElementById('closeInterest');
    const form = document.getElementById('interestForm');
    const submitBtn = document.getElementById('submitInterest');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');

    openInterest.addEventListener('click', () => {
      interestModal.classList.add('show');
      interestModal.setAttribute('aria-hidden', 'false');
      setTimeout(() => interestModal.querySelector('input[name="Full Name"]').focus(), 50);
    });

    function closeInterestModal(){
      interestModal.classList.remove('show');
      interestModal.setAttribute('aria-hidden', 'true');
    }

    closeInterest.addEventListener('click', closeInterestModal);
    interestModal.addEventListener('click', e => { if(e.target === interestModal) closeInterestModal(); });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      successMessage.classList.remove('show');
      errorMessage.classList.remove('show');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          form.reset();
          successMessage.classList.add('show');
          submitBtn.textContent = 'Sent';
        } else {
          throw new Error('Form submission failed');
        }
      } catch (err) {
        errorMessage.classList.add('show');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Register My Interest';
      }
    });

    document.addEventListener('keydown', e => {
      if(e.key === 'Escape'){
        closeDemo();
        closeInterestModal();
      }
    });
})();
