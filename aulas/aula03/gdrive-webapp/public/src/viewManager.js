export default class ViewManager {
    constructor() {
        this.tbody = document.getElementById('tbody')
        this.newFileBtn = document.getElementById('newFileBtn')
        this.fileElem = document.getElementById('fileElem')
        this.progressModal = document.getElementById('progressModal')
        this.progressBar = document.getElementById('progressBar')
        this.output = document.getElementById('output')


        this.formatter = new Intl.DateTimeFormat('pt', {
            locale: 'pt-br',
            month:'long',
            day:'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })

        this.modalInstance = {}
    }

    configureModal() {
        this.modalInstance = M.Modal.init(this.progressModal, {
            opacity: 0,
            dismissable: false,
            // isso aqui libera para você clicar na tela
            // mesmo com o modal aberto
            onOpenEnd() {
                this.$overlay[0].remove()
            }
        })
    }

    openModal() {
        this.modalInstance.open()
    }

    closeModal() {
        this.modalInstance.close()
    }

    updateStatus(size) {
        this.output.innerHTML = `Uploading in <b>${Math.floor(size)}%</b>`
        this.progressBar.value = size
    }

    configureOnFileChange(fn) {
        this.fileElem.onchange = (e) => fn(e.target.files)
    }


    configureFileBtnClick() {
        this.newFileBtn.onclick = () => this.fileElem.click()
    }

    getIcon(file) {
        return file.match(/\.mp4/i) ? 'movie'
            : file.match(/\.jp|png/i) ? 'image' : 'content_copy'
    }

    makeIcon(file) {
        const icon = this.getIcon(file)
        const colors = {
            image: 'yellow600',
            movie: 'red600',
            file: ''
        }

        return `
        <i class="material-icons ${colors[icon]} left">${icon}</i>
        `
    }

    updateCurrentFiles(files) {
        const template = (item) => `
        <tr>
            <td>${this.makeIcon(item.file)} ${item.file}</td>
            <td>${item.owner}</td>
            <td>${this.formatter.format(new Date(item.lastModified))}</td>
            <td>${item.size}</td>
        </tr>
        `

        this.tbody.innerHTML = files.map(template).join('')
    }
}