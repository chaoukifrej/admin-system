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
    <transition name="checkout" appear>
    <p v-if="afficher != ''" style="font-weight:bold;color:red">{{afficher}}</p>
    </transition>
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
