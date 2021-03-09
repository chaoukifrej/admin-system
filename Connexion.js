//?CONNEXION
let connexion = {
  props: ["user"],
  template: `    
  <div>
    <h2>Connexion</h2>
    <input v-model="nom" type="text" placeholder="Nom"/>
    <input v-model="password" type="password" placeholder="Mot de passe"/>
    <button @click="connect">Se connecter</button>
    <transition name="checkout" appear>
    <p v-if="connexion != ''" style="font-weight:bold;color:red">{{connexion}}</p>
    </transition>
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
      let userC;
      for (const elem of this.user) {
        if (elem.nom == this.nom) {
          if (elem.password == this.password) {
            elem.isConnected = true;
            this.connexion = "";
            userC = elem;
          } else {
            elem.isConnected = false;
            userC = elem;
            this.connexion = "mot de passe incorrect !";
          }
          break;
        } else {
          elem.isConnected = false;
          userC = elem;
          this.connexion = "Utilisateur inconnu";
        }
      }
      this.$emit("connected", { connected: userC });
    },
    nonInscris() {
      this.$emit("goto", { subscribe: this.not });
    },
  },
};
