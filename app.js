//?INSCRIPTION
let inscription = {
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
    <a>Déja inscris ? <span @click="notConnected" class="btnChange">se connecter</span></a>
    {{affiche}}
  </div>`,
  data() {
    return {
      nom: "",
      password: "",
      role: "",
      affiche: "",
      notC: false,
    };
  },
  methods: {
    inscription() {
      this.affiche = `${this.nom} : ton inscription est réussi !`;
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
    <a>pas de compte ? <span @click="nonInscris" class="btnChange">s'incrire</span></a>
    {{connexion}}
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
        if (elem.nom == this.nom && elem.password == this.password) {
          elem.isConnected = true;
          this.connexion = "connexion réussi !";
        } else {
          elem.isConnected = false;
          this.connexion = "";
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
    <div v-if="item.isConnected">
    <p>Bienvenue <b>{{item.nom}}</b>,<br> tu est un <b>{{item.role}}</b>.<br> Par contre tu ne peut rien faire...</p>
    </div>
    </div>
    <a><span @click="deconnect" class="btnChange">se déconnecter</span></a>
  </div>`,

  methods: {
    deconnect() {
      this.$emit("disconnect");
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
    users: [],
    inscrire: false,
    affiche: false,
  },
  methods: {
    pushUser(p) {
      let user = {
        nom: p.nom,
        password: p.password,
        role: p.role,
        isConnected: false,
      };
      this.users.push(user);
      this.inscrire = false;
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
