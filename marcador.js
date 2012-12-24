var GestorMarcadores = {
    marcadores: new Array(),
    contIds: 0,
    agregar: function(tiempo, porcentaje) {
        this.contIds = this.contIds + 1;
        this.marcadores.push({
            id: this.contIds, 
            tiempo: tiempo, 
            porcentaje: porcentaje,
            descripcion: "Introduzca una descripción"
        });
    },
    eliminarUltimo: function() {
        this.marcadores.pop();
    },
    ultimo: function() {
        return this.marcadores[this.marcadores.length - 1];
    },
    eliminar: function(idMarcador) {
        for(var i in this.marcadores){
            if(this.marcadores[i].id == idMarcador){
                this.marcadores.splice(i,1);
                break;
            }
        }
    },
    buscar: function(idMarcador) {
        for (var i = 0; i < this.marcadores.length; i++) {
            if (this.marcadores[i].id == idMarcador) {
                return this.marcadores[i];
            }
        }
        return undefined;
    },
    guardarDescripcion: function(idMarcador, descripcion) {
        for (var i = 0; i < this.marcadores.length; i++) {
            if (this.marcadores[i].id == idMarcador) {
                this.marcadores[i].descripcion = descripcion;
            }
        }
    }
};