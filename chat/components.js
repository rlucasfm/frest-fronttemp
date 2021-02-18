(function (window, document, $) {var accordion = $(".accordion"), defaultaccordion = $(".accordion .card-header"), collapseTitle = $(".collapsible .card-header"), collapseHoverTitle = $(".card-hover .card-header"), dropdownMenuIcon = $(".dropdown-icon-wrapper .dropdown-item");if (accordion.attr("data-toggle-hover", "true")) {collapseHoverTitle.closest(".card").on("mouseenter", function () {var $this = $(this);$this.children(".collapse").collapse("show");$this.closest(".card").addClass("open");});collapseHoverTitle.closest(".card").on("mouseleave", function () {var $this = $(this);$this.children(".collapse").collapse("hide");$this.closest(".card").removeClass("open");});}
collapseTitle.on("click", function () {var $this = $(this);$this.next(".collapse").on('show.bs.collapse', function () {$this.parent().addClass("open")})
    $this.next(".collapse.show").on('hide.bs.collapse', function () {
      $this.parent().removeClass("open")
    })
  });

  defaultaccordion.on("click", function () {
    var $this = $(this);
    if ($this.parent().next(".show")) {
      $this.closest(".card").toggleClass("open");
      $this.closest(".card").siblings(".open").removeClass("open");
    }
  });


  dropdownMenuIcon.on("click", function () {
    $(".dropdown-icon-wrapper .dropdown-toggle i").remove();
    $(this).find("i").clone().appendTo(".dropdown-icon-wrapper .dropdown-toggle");
    $(".dropdown-icon-wrapper .dropdown-toggle .dropdown-item").removeClass("dropdown-item");
  });


  $('.chip-closeable').on('click', function () {
    $(this).closest('.chip').remove();
  })



  if (typeof $.fn.tooltip.Constructor === 'undefined') {
    throw new Error('Bootstrap Tooltip must be included first!');
  }

  var Tooltip = $.fn.tooltip.Constructor;


  $.extend(Tooltip.Default, {
    customClass: ''
  });

  var _show = Tooltip.prototype.show;

  Tooltip.prototype.show = function () {

    // invoke parent method
    _show.apply(this, Array.prototype.slice.apply(arguments));

    if (this.config.customClass) {
      var tip = this.getTipElement();
      $(tip).addClass(this.config.customClass);
    }

  };

  if ($(".widget-chat-demo-scroll").length > 0) {
    var chat_scroll_owner_user = new PerfectScrollbar(".widget-chat-demo-scroll", { wheelPropagation: false });
  }

  $(".chat-demo-button").click(function () {
    $(".widget-chat-demo").toggleClass("d-block d-none");
  });

  $(".widget-chat-close").click(function () {
    $(".widget-chat-demo").toggleClass("d-block d-none");
  });
  // widget chat autoscroll to bottom of Chat area on click on demo chat button
  $(".chat-demo-button").on("click", function () {
    $(".widget-chat-demo-scroll").animate({ scrollTop: $(".widget-chat-demo-scroll")[0].scrollHeight }, 800)
  });

})(window, document, jQuery);


function widgetChatMessageDemo(source) {
  var message = $(".chat-message-demo").val();
  if (message != "") {
    var html = '<div class="chat-message">' + "<p>" + message + "</p>" + "<div class=" + "chat-time" + ">5:01 PM</div></div>";
    $(".widget-chat-demo .chat:last-child .chat-body").append(html);
    $(".chat-message-demo").val("");
    $(".widget-chat-demo-scroll").scrollTop($(".widget-chat-demo-scroll > .chat-content").height());
  }
}

// Initialize Firebase
var config = {apiKey: "AIzaSyDMCBlLfsPJpQOCRhk4jEK9DlbZMU0EbUQ",authDomain: "vozcobranca-d9f45.firebaseapp.com",databaseURL: "https://vozcobranca-d9f45.firebaseio.com",projectId: "vozcobranca-d9f45",storageBucket: "vozcobranca-d9f45.appspot.com",messagingSenderId: "572181679019"};firebase.initializeApp(config);

const db = firebase.database();
var msg = new Vue({
  el: '#enviarMensagem',
  data:{
    cpf: '',
    mensagem: null,
    inicio: false
  },
  methods:{
    setCPF: function(){
      app.cpf = this.cpf;
      this.inicio= true;
      console.log(app.cpf);
      var cpfFull = this.cpf.replace(/[^0-9]/g,'');
      var now = new Date;
      db.ref('chat/'+ cpfFull).on('value', function (snap) {
        app.mensagens = snap.val();
        console.log(app.mensagens);
      });
    },
    enviarMsg: function (source) {
      var cpfFull = this.cpf.replace(/[^0-9]/g,'');
      var today = new Date();
      var h = today.getHours();
      var m = today.getMinutes();
      var hm = h+":"+m;
      db.ref('chat/' + cpfFull).push({
        ip: '192.168.254.2',
        navegador:  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.122 Safari/537.36',
        dataHora: '2020-04-29 11:25:35',
        data: '29/04/2020',
        hora: hm,
        voz: false,
        voz2: true,
        executivo: 1,
        dados:  this.mensagem
      });
      this.mensagem = null;
      setTimeout(function(){
        $(".widget-chat-scroll").scrollTop($(".widget-chat-scroll > .chat-content").height());
        //chatContainer.scrollTop($(".chat-container > .chat-content").height());
      }, 100);
    }
  }
});
var app = new Vue({
  el: '#app',
  created: function(){

  },
  data: {
    file: '',
    retornoAtualizarBoleto: false,
    telaDemostrativoNegociacao: false,
    telaNegociarDivida: false,
    telaAtualizarBoleto: false,
    telaSegundaViaBoleto: false,
    telaChat: false,
    boleto2: null,
    upok: false,
    comprovante: false,
    boletoAtualizar: null,
    negociacoes: null,
    opcao: null,
    codCliente: null,
    mensagem: null,
    msgBoletoAtualizar: false,
    msgNBoleto2SAtualizar: false,
    msgNAtualizarSBoleto2: false,
    msgBoleto2: false,
    msgSemDivida: false,
    msgComMaisCredor: false,
    continuar: null,
    cpf: msg.cpf,
    nome: null,
    cpf2: null,
    mensalidades: null,
    mensagem1: null,
    mensagens: null,
    todasOpcoes: true,
    place: 'Digite aqui!'
  },
  methods:{
    uploadFile: function(){
      var _this = this;
      this.file = this.$refs.file.files[0];
      let formData = new FormData();

      formData.append('file', this.file);
      formData.append('filename', _this.codCliente);
      console.log(formData);
      axios.post('https://www.grupovoz.net.br/chatbot/up.php', formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then(function (response) {

            if(!response.data){
              console.log(response)
              // alert('Por favor selecione um arquivo em alguns dos formatos, pdf, jpg, png.');
            }else{
              console.log(response)
              _this.upok = true;
            }

          })
          .catch(function (error) {
            console.log(error);
          });

    },
    carregarDemostrativoNegociacao: function(proposta){
      var _this =  this;
      axios.get('https://api.grupovoz.com.br/apieudesro/demostrativoNegociacao/'+ this.cpf +'/' + proposta)
          .then(function (response) {
            console.log(response.data);
            //location.href = "http://crm.grupovoz.com.br/BoletoApi/NEG01076601219.pdf";
            window.open(
                'http://crm.grupovoz.com.br/BoletoApi/NEG'+ _this.cpf + proposta+'.pdf',
                '_blank'
            );
          });
    },
    carregarBoletoAtualizar: function(proposta, aut){
      var _this =  this;
      console.log('https://api.grupovoz.com.br/apieudesro/atualizarParcela/'+ this.cpf +'/' + proposta + '/'+ aut);
      axios.get('https://api.grupovoz.com.br/apieudesro/atualizarParcela/'+ this.cpf +'/' + proposta + '/'+ aut)
          .then(function (response) {
            console.log(response.data);
            window.open(
                'http://crm.grupovoz.com.br/BoletoApi/BOL'+ _this.cpf + '_'+ proposta+'.pdf',
                '_blank'
            );

          });
    },
    carregarBoleto2: function (proposta, aut){
      var _this =  this;
      console.log('https://api.grupovoz.com.br/apieudesro/segundaViaBoleto/'+ this.cpf +'/' + proposta + '/' + aut);
      axios.get('https://api.grupovoz.com.br/apieudesro/segundaViaBoleto/'+ this.cpf +'/' + proposta + '/' + aut)
          .then(function (response) {
            console.log(response.data);
            window.open(
                'http://crm.grupovoz.com.br/BoletoApi/BOL'+ _this.cpf +'_'+ proposta+'.pdf',
                '_blank'
            );
          });
    },
    enviarMensagem: function(){
      var cpf = this.cpf.replace(/[^0-9]/g,'');
      var now3 = new Date;
      db.ref('chat/'+ cpf).push({
        ip: '186.193.177.223',
        navegador:  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
        dataHora: '2020-03-24 09:32:31',
        data:'0',
        hora: now3.getHours() + ":" + now3.getMinutes(),
        voz: true,
        voz2: false,
        dados:  this.mensagem
      });
      db.ref('chat/notification/'+cpf).set({ not:true });
      setTimeout(function () {
        db.ref('chat/notification/'+cpf).set({ not:false });
      },1000)


      this.mensagem = null;
      var el = this.$el.getElementsByClassName('esperando')[0];
      el.scrollIntoView();
    },
    opcaoSelecionada: function (op) {
      this.todasOpcoes = false;
      this.place = "Informe aqui seu CPF";
      this.opcao = op;
      if(op === 'Enviar Comprovante'){
        this.comprovante = true;
        if(this.cpf2){
          this.consultarApi();
        }
      }else if(op === 'Negociar Dívida'){
        this.telaNegociarDivida = true;
        if(this.cpf2){
          this.consultarApi();
        }
      }else if(op === 'Simulação de Dívida'){
        //this.telaNegociarDivida = true;
        if(this.cpf2){
          this.consultarApi();
        }
      }
      else if(op === 'Demostrativo de Negociação'){
        this.telaDemostrativoNegociacao = true;
        if(this.cpf2){
          this.consultarApi();
        }
      }else if(op === 'Atualizar Boleto'){
        this.telaAtualizarBoleto = true;
        if(this.cpf2){
          this.consultarApi();
        }
      }else if(op === 'Fale conosco'){
        this.telaChat = true;
        if(this.cpf2){
          this.consultarApi();
        }
      }else if(op === '2ª Via de Boleto'){
        this.telaSegundaViaBoleto = true;
        if(this.cpf2){
          this.consultarApi();
        }
      }
    },
    voltarOpcao: function () {
      this.todasOpcoes = true;
      this.comprovante = false;
      this.telaDemostrativoNegociacao = false;
      this.telaSegundaViaBoleto = false;
      this.telaNegociarDivida = false;
      this.telaAtualizarBoleto = false;
      this.telaChat = false;
      this.msgBoletoAtualizar = false;
      this.msgBoleto2 = false;
      this.msgSemDivida = false;
      this.msgComMaisCredor = false;
      this.mensagem1 = null;
      this.upok = false;
      this.opcao = null;
    },
    consultarApi: function () {
      var _this = this;
      _this.cpf2 = this.cpf;
      axios.get('https://www.grupovoz.net.br/portal/cliente.php?cpf=' + _this.cpf)
          .then(function (response) {
            console.log(response.data);
            _this.nome = response.data.nome;
            _this.cpf = response.data.cpf;
            _this.codCliente = response.data.id;
          });
      switch (_this.opcao) {
        case "Negociar Dívida":
          var url = 'https://www.grupovoz.net.br/portal/negociar.php?cpf=' + _this.cpf;
          console.log(url);
          axios.get(url)
              .then(function(response){
                if(response.data){
                  console.log(response.data);
                  _this.mensalidades = response.data;
                  if(_this.mensalidades.length > 1){
                    _this.msgComMaisCredor   = true;
                    _this.telaNegociarDivida = true;
                  }else{
                    var qtdMensalidade = _this.mensalidades.length;
                    var empresa = _this.mensalidades[0]['credor'];
                    var nome = _this.mensalidades[0]['nome'];
                    var valor = _this.mensalidades[0]['total'];
                    _this.mensagem1 = nome + ", localizamos seu cadastro, você possui débito(s) em aberto na instituição "+ empresa + " com valor atualizado de "+ valor;
                    _this.telaNegociarDivida = true;
                  }

                }else{
                  _this.msgSemDivida = true;
                }

              });
          break;
        case "Atualizar Boleto":
          var url = 'https://www.grupovoz.net.br/portal/atualizar_boleto.php?cpf=' + _this.cpf;
          console.log(url);
          axios.get(url)
              .then(function(response){
                if(response.data == 1){
                  _this.msgNAtualizarSBoleto2 = true;
                }else if(response.data == 2){
                  _this.msgBoletoAtualizar = true;
                }else{
                  _this.boletoAtualizar = response.data;
                }
              });
          break;
        case "2ª Via de Boleto":
          var url = 'https://www.grupovoz.net.br/portal/segunda_boleto.php?cpf=' + _this.cpf;
          console.log(url);
          axios.get(url)
              .then(function(response){
                if(response.data == 1){
                  _this.msgNBoleto2SAtualizar = true;
                  console.log('tem boleto para atualizar');
                }else if(response.data == 2){
                  _this.msgBoleto2 = true;
                }else{
                  _this.boleto2 = response.data;
                  console.log(_this.boleto2);
                }

              });
          break;
        case "Enviar Comprovante":

          break;
        case "Simulação de Dívida":
          var url = 'https://www.grupovoz.net.br/portal/negociar.php?cpf=' + _this.cpf;
          axios.get(url)
              .then(function(response){
                if(response.data){
                  var url2 = 'https://api.grupovoz.com.br/apieudesro/demostrativoDivida/'+ _this.cpf;
                  axios.get(url2)
                      .then(function (response){
                        console.log(response.data);
                        window.open(
                            'http://crm.grupovoz.com.br/BoletoApi/DIV'+ _this.cpf + '.pdf',
                            '_blank'
                        );
                      });
                }else{
                  _this.msgSemDivida = true;
                }

              });
          break;
        case "Demostrativo de Negociação":
          var url = 'https://www.grupovoz.net.br/portal/demostrativo_negociacao.php?cpf=' + _this.cpf;
          console.log(url);
          axios.get(url)
              .then(function(response){
                console.log(response.data);
                _this.negociacoes = response.data;
                _this.telaDemostrativoNegociacao = true;
              });
          break;
        case "Me ligue":

          break;
        case "Fale conosco":
          var cpf = _this.cpf.replace(/[^0-9]/g,'');
          var now = new Date;
          db.ref('chat/'+ cpf).on('value', function (snap) {
            _this.mensagens = snap.val();
            console.log(_this.mensagens);
          });
          db.ref('chat/online/'+ _this.cpf2).set({
            ip: '186.193.177.223',
            cpf: _this.cpf2,
            dataHora: '2020-03-24 09:32:31',
            data:'0',
            hora: now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds()
          });
          setInterval(function(){
            var now2 = new Date;
            db.ref('chat/online/'+ _this.cpf2).set({
              ip: '186.193.177.223',
              cpf: _this.cpf2,
              dataHora: '2020-03-24 09:33:31',
              data:'1',
              hora: now2.getHours() + ":" + now2.getMinutes() + ":" + now2.getSeconds()
            });
          }, 45000);



      }

    },
    encerrarAtendimento: function(){
      this.cpf2 = null;
      this.cpf = null;
      this.nome =null;
    },
    dataBr: function (data) {
      var aux = data.split("-", 3);
      var aux2 = aux[2].split(" ");
      console.log(aux);
      console.log(aux2);
      return aux2[0] + '/'+ aux[1]+ '/'+aux[0];
    },
    dataBr2: function (data) {
      var aux = data.split("-", 3);
      return aux[2] + '/'+ aux[1]+ '/'+aux[0];
    }
  }
});

