document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.remove('fade-in'); 

    document.getElementById('uploadForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const fileInput = document.getElementById('fileInput');
        const previewContainer = document.getElementById('previewContainer');
        
        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            const reader = new FileReader();

            reader.onload = function(event) {
                previewContainer.innerHTML = `<img src="${event.target.result}" alt="Image Preview" class="preview-img">`;
            };
            reader.readAsDataURL(file);
        }
    });

    const links = document.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');

            document.body.classList.add('fade-out');
            setTimeout(() => {
                window.location.href = href;
            }, 500);
        });
    });
});
