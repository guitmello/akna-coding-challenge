module.exports = {
    notify(type, action, materialize) {
        let toastHTML = {};
        if (type === "sucess") {
            toastHTML = {
                "add": () => "<span class='success-notify'>Cadastrado com sucesso!</span>",
                "edit": () => "<span class='success-notify'>Editado com sucesso!</span>",
                "delete": () => "<span class='success-notify'>Deletado com sucesso!</span>"
            }
        } else {
            toastHTML = {
                "add": () => "<span class='error-notify'>Erro ao adiconar!</span>",
                "edit": () => "<span class='error-notify'>Erro ao editar!</span>",
                "delete": () => "<span class='error-notify'>Erro ao deletar!</span>",
                "get": () => "<span class='sucess-notify'>Erro ao buscar os livros cadastrados!</span>"
            }
        }
        
        return materialize.toast({html: toastHTML[action]()});
    }
};