class Usuario {
    constructor(id, data) {
        this.bandera = 0;
        this.id = id;
        this.nombre = data.nombre;
        this.usuario = data.usuario;
        this.password = data.password;
        this.foto = data.foto;
    }

    set id(id) {
        if (id !== undefined && id !== null) {
            if (typeof id === 'string' && id.length > 0) {
                this._id = id;
            } else {
                this.bandera = 1;
            }
        }
    }

    set nombre(nombre) {
        if (nombre !== undefined && nombre !== null) {
            if (typeof nombre === 'string' && nombre.length > 0) {
                this._nombre = nombre;
            } else {
                this.bandera = 1;
            }
        }
    }

    set usuario(usuario) {
        if (usuario !== undefined && usuario !== null) {
            if (typeof usuario === 'string' && usuario.length > 0) {
                this._usuario = usuario;
            } else {
                this.bandera = 1;
            }
        }
    }

    set password(password) {
        if (password !== undefined && password !== null) {
            if (typeof password === 'string' && password.length > 0) {
                this._password = password;
            } else {
                this.bandera = 1;
            }
        }
    }

    set foto(foto) {
        if (foto !== undefined && foto !== null) {
            if (typeof foto === 'string' && foto.length > 0) {
                this._foto = foto;
            } else {
                this.bandera = 1;
            }
        }
    }

    get id() {
        return this._id;
    }

    get nombre() {
        return this._nombre;
    }

    get usuario() {
        return this._usuario;
    }

    get password() {
        return this._password;
    }

    get foto() {
        return this._foto;
    }

    get obtenerUsuario() {
        if (this._id !== undefined && this._id !== null) {
            return {
                id: this.id,
                nombre: this.nombre,
                usuario: this.usuario,
                password: this.password,
                foto: this.foto
            };
        } else {
            return {
                nombre: this.nombre,
                usuario: this.usuario,
                password: this.password,
                foto: this.foto
            };
        }
    }
}

module.exports = Usuario;
