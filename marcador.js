var MarkerMgr = {
    marcadores: {
        marcadores: new Array(), 
        id: __generarId()
    },
    contIds: 0,
    agregar: function(tiempo, porcentaje) {
        this.contIds = this.contIds + 1;
        this.marcadores.marcadores.push({
            id: this.contIds, 
            tiempo: tiempo, 
            porcentaje: porcentaje,
            descripcion: "Introduzca una descripción"
        });
    },
    eliminarUltimo: function() {
        this.marcadores.marcadores.pop();
    },
    ultimo: function() {
        return this.marcadores.marcadores[this.marcadores.marcadores.length - 1];
    },
    eliminar: function(idMarcador) {
        for(var i in this.marcadores.marcadores){
            if(this.marcadores.marcadores[i].id == idMarcador){
                this.marcadores.marcadores.splice(i,1);
                break;
            }
        }
    },
    buscar: function(idMarcador) {
        for (var i = 0; i < this.marcadores.marcadores.length; i++) {
            if (this.marcadores.marcadores[i].id == idMarcador) {
                return this.marcadores.marcadores[i];
            }
        }
        return undefined;
    },
    guardarDescripcion: function(idMarcador, descripcion) {
        for (var i = 0; i < this.marcadores.marcadores.length; i++) {
            if (this.marcadores.marcadores[i].id == idMarcador) {
                this.marcadores.marcadores[i].descripcion = descripcion;
            }
        }
    },
    search: function(cueSetId) {
        var marcadores = JSON.parse(window.localStorage.getItem("marcadores"));
        for (var i = 0; i < marcadores.length; i++) {
            if (marcadores[i].id == cueSetId) {
                return marcadores[i];
            }
        }
        return null;
    },
    save: function() {
        var marcadores = JSON.parse(window.localStorage.getItem('marcadores'));
        if(marcadores) {
        // existen

        }
        else {
            // no existen
            marcadores = new Array();
            marcadores.push(MarkerMgr.marcadores);
            window.localStorage.setItem("marcadores", JSON.stringify(marcadores));
        }
    },
    eliminarCueSetAnterior: function(idCueSet) {
        var marcadores;
        if(window.localStorage.getItem('marcadores')){
            marcadores = JSON.parse(window.localStorage.getItem('marcadores'));
            for(i=0; i<marcadores.length;i++) {
                if(marcadores[i].id == idCueSet){
                    marcadores.splice(i,1);
                    break;
                }
            }
            window.localStorage.setItem('marcadores', marcadores);
        }
    }
};

function __generarId(){
    var date = new Date();
    var components = [
    date.getYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds()
    ];

    return components.join("");
}