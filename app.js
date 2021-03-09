//?INSTANCE VUE APP
let app = new Vue({
  el: "#app",
  components: {
    inscription,
    connexion,
    affichage,
  },
  data: {
    users: [
      {
        nom: "chaouki",
        password: "aaa",
        role: "SuperAdmin",
        isConnected: false,
      },
    ],
    inscrire: false,
    affiche: false,
    affichageInscription: "",
  },
  mounted() {
    localStorage.getItem("users")
      ? (this.users = JSON.parse(localStorage.getItem("users")))
      : (this.users = [
          {
            nom: "chaouki",
            password: "aaa",
            role: "SuperAdmin",
            isConnected: false,
          },
        ]);
  },
  watch: {
    users: function () {
      localStorage.setItem("users", JSON.stringify(this.users));
    },
  },
  methods: {
    pushUser(p) {
      let user = {
        nom: p.nom,
        password: p.password,
        role: p.role,
        isConnected: false,
      };
      let check = false;
      for (const elem of this.users) {
        if (elem.nom != user.nom) {
          check = false;
        } else {
          check = true;
          break;
        }
      }
      if (!check) {
        if (user.nom != "") {
          this.users.push(user);
          this.inscrire = false;
          this.affichageInscription = "";
        } else {
          this.affichageInscription = "Indiquez un nom !";
        }
      } else {
        this.affichageInscription = "L'utilisateur existe deja";
      }
    },
    connected(p) {
      for (const e of this.users) {
        if (e.nom == p.nom) {
          e.isConnected = p.isConnected;
        }
        if (e.isConnected) {
          this.affiche = true;
        }
      }
    },
    nonInscris(p) {
      this.inscrire = p.subscribe;
    },
    notConnected(p) {
      this.inscrire = p.connect;
    },
    disconnect() {
      for (const e of this.users) {
        if (e.isConnected) {
          e.isConnected = false;
        }
      }
      this.affiche = false;
    },
    eraseUser(p) {
      let index;
      for (const user of this.users) {
        if (user.nom == p.usertoCxl.nom) {
          index = this.users.indexOf(user);
        }
      }
      this.users.splice(index, 1);
    },
    changeUser(p) {
      for (const elem of this.users) {
        if (elem.nom == p.usertoChange.nom) {
          if (elem.role == "admin") {
            elem.role = "utilisateur";
          } else {
            elem.role = "admin";
          }
        }
      }
      localStorage.setItem("users", JSON.stringify(this.users));
    },
  },
  computed: {},
});
