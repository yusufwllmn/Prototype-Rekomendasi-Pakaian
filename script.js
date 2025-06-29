document.addEventListener('DOMContentLoaded', () => {
    // Carousel functionality
    const carousel = document.querySelector('#carousel');
    const items = carousel.querySelectorAll('.carousel-item');
    let currentIndex = 0;

    document.querySelector('#prevBtn').addEventListener('click', () => {
        items[currentIndex].classList.add('hidden');
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        items[currentIndex].classList.remove('hidden');
    });

    document.querySelector('#nextBtn').addEventListener('click', () => {
        items[currentIndex].classList.add('hidden');
        currentIndex = (currentIndex + 1) % items.length;
        items[currentIndex].classList.remove('hidden');
    });

    // Quantity selector
    const quantityInput = document.querySelector('#quantity-input');
    document.querySelector('#increment-button').addEventListener('click', (e) => {
        e.preventDefault();
        let value = parseInt(quantityInput.value, 10);
        if (isNaN(value)) value = 0;
        if (value < 50) {
            quantityInput.value = value + 1;
        }
    }, { once: false });

    document.querySelector('#decrement-button').addEventListener('click', (e) => {
        e.preventDefault();
        let value = parseInt(quantityInput.value, 10);
        if (isNaN(value)) value = 1;
        if (value > 1) {
            quantityInput.value = value - 1;
        }
    }, { once: false });

    // Color selection
    const colorOptions = document.querySelectorAll('.color-option');
    const selectedColor = document.querySelector('#selectedColor');
    colorOptions.forEach(option => {
        option.addEventListener('click', () => {
            colorOptions.forEach(opt => opt.classList.remove('active', 'border-gray-300', 'text-blue-600', 'border-blue-600'));
            option.classList.add('active', 'border-blue-600', 'text-blue-600');
            selectedColor.textContent = option.dataset.color;
        });
    });

    // Size selection
    const sizeOptions = document.querySelectorAll('.size-option');
    const selectedSize = document.querySelector('#selectedSize');
    sizeOptions.forEach(option => {
        option.addEventListener('click', () => {
            sizeOptions.forEach(opt => opt.classList.remove('active', 'border-gray-300', 'text-blue-600', 'border-blue-600'));
            option.classList.add('active', 'border-blue-600', 'text-blue-600');
            selectedSize.textContent = option.dataset.size;
        });
    });

    // Size Guide Pop-up
    const sizeGuideBtn = document.querySelector('#sizeGuideBtn');
    const sizeGuideModal = document.querySelector('#sizeGuideModal');
    const closeModalBtn = document.querySelector('#closeModalBtn');
    
    sizeGuideBtn.addEventListener('click', () => {
        sizeGuideModal.classList.remove('hidden');
    });
    
    closeModalBtn.addEventListener('click', () => {
        sizeGuideModal.classList.add('hidden');
    });

    window.addEventListener('click', (e) => {
        if (e.target === sizeGuideModal) {
            sizeGuideModal.classList.add('hidden');
        }
    });

    // Modal Cek Ukuran
    const checkSizeBtn = document.getElementById('autoSizeBtn');
    const checkSizeModal = document.getElementById('checkSizeModal');
    const closeCheckModalBtn = document.getElementById('closeCheckModalBtn');
    const sizeForm = document.getElementById('sizeForm');
    const sizeResult = document.getElementById('sizeResult');
    const recommendedSize = document.getElementById('recommendedSize');
    
    // Tampilkan modal
    checkSizeBtn.addEventListener('click', () => {
      checkSizeModal.classList.remove('hidden');
    });
    
    // Tutup modal
    closeCheckModalBtn.addEventListener('click', () => {
      checkSizeModal.classList.add('hidden');
      sizeResult.classList.add('hidden');
      sizeForm.reset();
    });
    
    // Submit form
    sizeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const height = parseInt(document.getElementById('height').value);
      const weight = parseInt(document.getElementById('weight').value);
      const preference = parseInt(document.getElementById('preference').value);
    
      // Logika pohon keputusan (sederhana)
      let size = '';
      if (height <= 160 && weight <= 55) size = 'S';
      else if (height <= 165 && weight <= 65) size = 'M';
      else if (height <= 170 && weight <= 75) size = 'L';
      else size = 'XL';
    
      // Penyesuaian berdasarkan preferensi
      if (preference === 1 && size !== 'S') size = size === 'M' ? 'S' : size === 'L' ? 'M' : 'L'; // ketat
      if (preference === 3 && size !== 'XL') size = size === 'S' ? 'M' : size === 'M' ? 'L' : 'XL'; // longgar
    
      recommendedSize.textContent = size;
      sizeResult.classList.remove('hidden');
    });
});