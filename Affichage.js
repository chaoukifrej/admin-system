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
          <transition-group name="fromleft" appear>
          <p class="listUsers" v-for="user in user" :key="user.nom"><b>{{user.nom}}</b> <span>→</span> <span>{{user.role}}</span></p>
          </transition-group>
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
        <transition-group name="fromleft" appear>
        <p class="listUsers" v-for="u in user" :key="u.nom"><b>{{u.nom}}</b> <span>→</span> <span>{{u.role}}</span> 
        <button style="color:rgb(0, 180, 0); font-weight: bold" @click="changeUser(u)" v-if="u.nom != 'chaouki'">Change</button>
        <button style="color:rgb(180, 0, 0); font-weight: bold" @click="eraseUser(u)" v-if="u.nom != 'chaouki'">CXL</button>
        </p>
        </transition-group>
      </div>
      </div>
    </div>
    <a><span @click="deconnect" class="btnChange">se déconnecter</span></a>
  </div>`,
  methods: {
    deconnect() {
      this.$emit("disconnect");
    },
    eraseUser(usertoCxl) {
      this.$emit("erase-user", { usertoCxl });
    },
    changeUser(usertoChange) {
      this.$emit("change-user", { usertoChange });
    },
  },
};
