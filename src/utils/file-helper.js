function updatePreviewSize(source) {
    const modalDialog = document.querySelector('#pdfPreviewModal .modal-dialog');
    const embed = document.getElementById('pdfEmbed');
    const excelDiv = document.getElementById('excelTable');
    const imagePreview = document.getElementById('imagePreview');

    if (modalDialog) {
        modalDialog.style.width = `${source.previewWidth}%`;
        modalDialog.style.maxWidth = `${source.previewWidth}%`;
    }
    if (embed) {
        embed.style.height = `${source.previewHeight}px`;
    }
    if (excelDiv) {
        excelDiv.style.maxHeight = `${source.previewHeight}px`;
    }
    if (imagePreview) {
        imagePreview.style.maxHeight = `${source.previewHeight}px`;
    }
}

function initResizable(source) {
    const modal = document.getElementById('pdfPreviewModal');
    if (!modal) return;
    const handles = modal.querySelectorAll('.resize-handle');
    handles.forEach(handle => {
        handle.addEventListener('mousedown', (e) => {
            e.preventDefault();
            this.isResizing = true;
            this.resizeDirection = handle.dataset.direction;
            this.startX = e.clientX;
            this.startY = e.clientY;

            const modalDialog = modal.querySelector('.modal-dialog');
            const rect = modalDialog.getBoundingClientRect();
            this.startWidth = rect.width;
            this.startHeight = source.previewHeight;

            document.addEventListener('mousemove', (event) => handleResize(source, event));
            document.addEventListener('mouseup', () => stopResize(source));

            modalDialog.style.transition = 'none';
        });
    });
}

function handleResize(source, e) {
    if (!this.isResizing) return;

    const deltaX = e.clientX - this.startX;
    const deltaY = e.clientY - this.startY;
    const modalDialog = document.querySelector('#pdfPreviewModal .modal-dialog');

    if (this.resizeDirection.includes('e')) {
        const newWidth = this.startWidth + deltaX;
        const windowWidth = window.innerWidth;
        const widthPercent = Math.max(30, Math.min(100, (newWidth / windowWidth) * 100));
        source.previewWidth = Math.round(widthPercent);
    }

    if (this.resizeDirection.includes('w')) {
        const newWidth = this.startWidth - deltaX;
        const windowWidth = window.innerWidth;
        const widthPercent = Math.max(30, Math.min(100, (newWidth / windowWidth) * 100));
        source.previewWidth = Math.round(widthPercent);
    }

    if (this.resizeDirection.includes('s')) {
        const newHeight = this.startHeight + deltaY;
        source.previewHeight = Math.max(300, Math.min(1000, Math.round(newHeight)));
    }

    if (this.resizeDirection.includes('n')) {
        const newHeight = this.startHeight - deltaY;
        source.previewHeight = Math.max(300, Math.min(1000, Math.round(newHeight)));
    }

    updatePreviewSize(source);
}

function stopResize(source) {
    if (this.isResizing) {
        this.isResizing = false;
        this.resizeDirection = null;

        const modalDialog = document.querySelector('#pdfPreviewModal .modal-dialog');
        if (modalDialog) {
            modalDialog.style.transition = '';
        }

        document.removeEventListener('mousemove', (event) => handleResize(source, event));
        document.removeEventListener('mouseup', () => stopResize(source));
    }
}

function downloadDocument(sourceFile, sourceFileName, index) {
    const linkSource = sourceFile[index];
    const downloadLink = document.createElement("a");
    const fileName = sourceFileName[index];

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
}

function previewDocument(source, sourceFile, sourceFileName, index) {
    const fileUrl = sourceFile[index];
    const fileName = sourceFileName[index];
    const embed = document.getElementById('pdfEmbed');
    const excelDiv = document.getElementById('excelTable');
    const imagePreview = document.getElementById('imagePreview');
    const modalLabel = document.getElementById('previewModalLabel');

    const lowerFileName = fileName.toLowerCase();
    if (lowerFileName.endsWith('.pdf')) {
        modalLabel.innerText = 'Preview PDF';
        embed.src = fileUrl;
        embed.style.display = 'block';
        excelDiv.style.display = 'none';
        imagePreview.style.display = 'none';
        updatePreviewSize(source);
        $('#pdfPreviewModal').modal('show');
        setTimeout(() => initResizable(source), 100);
    } else if (lowerFileName.endsWith('.xlsx') || lowerFileName.endsWith('.xls')) {
        modalLabel.innerText = 'Preview Excel';
        embed.style.display = 'none';
        excelDiv.style.display = 'block';
        imagePreview.style.display = 'none';
        excelDiv.innerHTML = '<p>Loading Excel...</p>';

        fetch(fileUrl)
            .then(response => response.arrayBuffer())
            .then(data => {
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const html = XLSX.utils.sheet_to_html(worksheet);
                excelDiv.innerHTML = html;
            })
            .catch(error => {
                excelDiv.innerHTML = '<p>Error loading Excel file.</p>';
                console.error('Error fetching or parsing Excel:', error);
            });

        updatePreviewSize(source);
        $('#pdfPreviewModal').modal('show');
        setTimeout(() => initResizable(source), 100);
    } else if (lowerFileName.endsWith('.jpg') || lowerFileName.endsWith('.jpeg') || lowerFileName.endsWith('.png') || lowerFileName.endsWith('.gif') || lowerFileName.endsWith('.bmp') || lowerFileName.endsWith('.webp')) {
        modalLabel.innerText = 'Preview Image';
        imagePreview.src = fileUrl;
        embed.style.display = 'none';
        excelDiv.style.display = 'none';
        imagePreview.style.display = 'block';
        updatePreviewSize(source);
        $('#pdfPreviewModal').modal('show');
        setTimeout(() => initResizable(source), 100);
    } else {
        alert('Preview not supported for this file type.');
    }
}

export default { downloadDocument, previewDocument };