//?INSCRIPTION
let inscription = {
  props: ["afficher"],
  template: `    
  <div>
    <h2>Inscription</h2>
    <form action="">
    <input v-model="nom" type="text" placeholder="Nom"/>
    <input v-model="password" type="password" placeholder="Mot de passe"/>
    <select name="role" id="role" v-model="role">
      <option selected disabled value="">Status</option>
      <option value="admin">Admin</option>
      <option value="utilisateur">Utilisateur</option>
    </select>
    <input @click.prevent="inscription" type="submit" value="S'incrire">
    </form>
    {{afficher}}
    <a>Déja inscris ? <span @click="notConnected" class="btnChange">se connecter</span></a>
  </div>`,
  data() {
    return {
      nom: "",
      password: "",
      role: "",
      notC: false,
    };
  },
  methods: {
    inscription() {
      this.$emit("send", {
        nom: this.nom,
        password: this.password,
        role: this.role,
      });
    },
    notConnected() {
      this.$emit("goto-connect", { connect: this.notC });
    },
  },
};

//?CONNEXION
let connexion = {
  props: ["user"],
  template: `    
  <div>
    <h2>Connexion</h2>
    <input v-model="nom" type="text" placeholder="Nom"/>
    <input v-model="password" type="password" placeholder="Mot de passe"/>
    <button @click="connect">Se connecter</button>
    {{connexion}}
    <a>pas de compte ? <span @click="nonInscris" class="btnChange">s'incrire</span></a>
  </div>`,
  data() {
    return {
      nom: "",
      password: "",
      connexion: "",
      not: true,
    };
  },
  methods: {
    connect() {
      for (const elem of this.user) {
        if (elem.nom == this.nom) {
          if (elem.password == this.password) {
            elem.isConnected = true;
            this.connexion = "";
          } else {
            elem.isConnected = false;
            this.connexion = "mot de passe incorrect !";
          }
        } else {
          elem.isConnected = false;
          this.connexion = "Utilisateur inconnu";
        }
        this.$emit("connected", { connected: elem });
      }
    },
    nonInscris() {
      this.$emit("goto", { subscribe: this.not });
    },
  },
};

//?AFFICHAGE
let affichage = {
  props: ["user"],
  template: `
  <div>
    <h2>Connecté</h2>
    <div v-for="item in user">
      <div v-if="item.isConnected && item.role == 'admin'">
        <p>Bienvenue <b>{{item.nom}}</b>,<br> tu est un <b>{{item.role}}</b>
        <div style="border: 2px solid rgb(183, 183, 183); padding: 10px; border-radius:5px">
          <p style="text-align:center">Liste Users :</p>
          <p class="listUsers" v-for="user in user"><b>{{user.nom}}</b> <span>→</span> <span>{{user.role}}</span></p>
        </div>
      </div>
      <div v-else-if="item.isConnected && item.role == 'utilisateur'"">
        <p>Bienvenue <b>{{item.nom}}</b>,<br> tu est un <b>{{item.role}}</b>.<br> Par contre tu ne peut rien faire...</p>
      </div>
      <div v-else-if="item.isConnected && item.role == ''"">
        <p>Bienvenue <b>{{item.nom}}</b> mais tu n'est rien donc tu ne peut rien faire...</p>
      </div>
      <div v-else-if="item.isConnected && item.role == 'SuperAdmin'">
        <p>Bienvenue <b>{{item.nom}}</b>.<br> Le <b>{{item.role}}</b>.<br></p>
        <div style="border: 2px solid rgb(183, 183, 183); padding: 10px; border-radius:5px">
        <p style="text-align:center">Liste Users :</p>
        <p class="listUsers" v-for="u in user"><b>{{u.nom}}</b> <span>→</span> <span>{{u.role}}</span> <button @click="eraseUser(u)" v-if="u.nom != 'chaouki'">CXL</button></p>
      </div>
      </div>
    </div>
    <a><span @click="deconnect" class="btnChange">se déconnecter</span></a>
  </div>`,

  methods: {
    deconnect() {
      this.$emit("disconnect");
    },
    eraseUser(u) {
      this.$emit("erase-user", { u });
      console.log(u);
    },
  },
};

//?VUE APP
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
        this.users.push(user);
        this.inscrire = false;
        this.affichageInscription = "";
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
  },
  computed: {},
});
