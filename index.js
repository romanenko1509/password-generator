new Vue({
  el: "#app",
  data: {
    length: 8,
    useNum: false,
    useSym: false,
    historyArr: [],
    result: '',
    symbols: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()_+=-',
    copiedText: '',
  },
  methods: {
    generate() {
        let aviableSybmols = this.symbols;

        if (this.useNum && !this.useSym) {
            aviableSybmols = aviableSybmols.replace(/[!@#$%^&*()_+=-]/g, '');
        }

        if (!this.useNum && this.useSym) {
            aviableSybmols = aviableSybmols.replace(/\d/g, '');
        }

        if (!this.useNum && !this.useSym) {
            aviableSybmols = aviableSybmols.replace(/\d/g, '').replace(/[!@#$%^&*()_+=-]/g, '');
        }

        let password = '';

        for (let i = 0; i < this.length; i++){
            password += aviableSybmols.charAt(Math.floor(Math.random() * aviableSybmols.length))     
        }

        this.result = password;
        this.historyArr.unshift(this.result);
        localStorage.setItem("passwords", JSON.stringify(this.historyArr));
    },
    clearHistory() {
        localStorage.clear();
        this.historyArr = [];
    },
    copyToBufer(i) {
        navigator.clipboard.writeText(i);
        this.copiedText = i;
        document.getElementById('myAlert').classList.add('myAlert-show');
    },
    hideNofitication() {
        document.getElementById('myAlert').classList.remove('myAlert-show')
    }
  },
  mounted() {
      if (localStorage.getItem("passwords")) {
        let localHistoryArr = JSON.parse(localStorage.getItem("passwords"));
        this.historyArr = localHistoryArr;
      }
  },
});
