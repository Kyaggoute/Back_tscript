var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Entity = /** @class */ (function () {
    function Entity() {
    }
    return Entity;
}());
var Person = /** @class */ (function (_super) {
    __extends(Person, _super);
    function Person() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Person;
}(Entity));
var Company = /** @class */ (function (_super) {
    __extends(Company, _super);
    function Company() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Company;
}(Entity));
var BaseProvider = /** @class */ (function () {
    function BaseProvider() {
    }
    BaseProvider.prototype.list = function () {
        //Entity []
        return this.getData();
    };
    BaseProvider.prototype.search = function (text) {
        //:Entity [], text: string
        var search = text.toLowerCase(); //string
        var results = []; //Entity[]
        for (var _i = 0, _a = this.getData(); _i < _a.length; _i++) {
            var item = _a[_i];
            if (JSON.stringify(item).toLowerCase().includes(search)) {
                results.push(item);
            }
        }
        return results;
    };
    return BaseProvider;
}());
var PersonProvider = /** @class */ (function (_super) {
    __extends(PersonProvider, _super);
    function PersonProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PersonProvider.prototype.getData = function () {
        //:person[]
        var p1 = new Person(); //person
        p1.id = 1;
        p1.firstname = "Sophie";
        p1.lastname = "Lozophy";
        var p2 = new Person(); //person
        p2.id = 2;
        p2.firstname = "Annie";
        p2.lastname = "Versaire";
        var p3 = new Person(); //person
        p3.id = 3;
        p3.firstname = "Paul";
        p3.lastname = "Ochon";
        return [p1, p2, p3];
    };
    return PersonProvider;
}(BaseProvider));
var CompanyProvider = /** @class */ (function (_super) {
    __extends(CompanyProvider, _super);
    function CompanyProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CompanyProvider.prototype.getData = function () {
        //:Compagny[]
        var c1 = new Company(); //compagny
        c1.id = 1;
        c1.name = "Google";
        var c2 = new Company(); //compagny
        c2.id = 2;
        c2.name = "Apple";
        var c3 = new Company(); //compagny
        c3.id = 3;
        c3.name = "Microsoft";
        return [c1, c2, c3];
    };
    return CompanyProvider;
}(BaseProvider));
var RepositoryService = /** @class */ (function () {
    function RepositoryService(providers) {
        // c'est qu'on exige lors de l'instanciation des providers : une dépendance
        this.providers = providers;
    }
    RepositoryService.prototype.list = function () {
        //:Entity []
        var accu = []; //Entity[]
        for (var _i = 0, _a = this.providers; _i < _a.length; _i++) {
            var element = _a[_i];
            accu = accu.concat(element.list());
        }
        return accu;
    };
    RepositoryService.prototype.search = function (text) {
        //:Entity [], text: string
        var accu = []; //Entity[]
        for (var _i = 0, _a = this.providers; _i < _a.length; _i++) {
            var element = _a[_i];
            accu = accu.concat(element.search(text));
        }
        return accu;
    };
    return RepositoryService;
}());
var jose = new PersonProvider(); //PersonProvider
var sophie = new CompanyProvider(); //CompagnyProvider
var bertrand = new RepositoryService([jose, sophie]); //RepositoryService
// lié au constructor POUR LA CONSTRUCTION
var express = require("express");
var cors = require("cors");
var app = express(); // création du serveur
app.use(cors()); // utilisation de cors : autoriser les requetes HTTP provenant d'une autre origine
app.use(express.json()); // utilisation de json : permettre la communication avec des données au format JSON
// GET (recuperation de données) - list
// POST (envoi de données avec une intention de création) - search (pour l'exemple, habituellement en GET)
// PUT (envoi de données avec une intenion de modification totale)
// PATCH  (envoi de données avec une intenion de modification partielle)
// DELETE (suppression de données)
// HEAD (salutation)
// OPTIONS (demande d'autorisation)
app.get("/", function (req, res) {
    res.send(bertrand.list());
});
/*
créer un nouveau endpoint qui accepte les requites en POST (POST: http//localhost:400/) avec une donnée "text" à l'interieur de playload
renvoyer les resultat de la recherche utilisant la donnée "text" qui a été envoyée.
indice: pour récupérer la données "text" du playload: req.body.text
*/
app.post("/search", function (req, res) {
    res.send(bertrand.search(req.body.text));
});
app.listen(4000, function () {
    console.log("Listening on port 4000 haha...");
});
