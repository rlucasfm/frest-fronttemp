<?php
date_default_timezone_set('America/Sao_Paulo');
$cpf =  $_GET['cpf'];
$user =  $_GET['user'];
//http://crm.grupovoz.com.br/Chat/chat.php?cpf='+UniEdit2.Text+'&user='+CodUser
?>
<!DOCTYPE html>
<html class="loading" lang="pt-br" data-textdirection="ltr">
<!-- BEGIN: Head-->

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0">
    <meta name="description" content="Frest admin is super flexible, powerful, clean &amp; modern responsive bootstrap 4 admin template with unlimited possibilities.">
    <meta name="keywords" content="admin template, Frest admin template, dashboard template, flat admin template, responsive admin template, web app">
    <meta name="author" content="PIXINVENT">
    <title>Chat</title>
    <link rel="apple-touch-icon" href="../../../app-assets/images/ico/apple-icon-120.png">
    <link rel="shortcut icon" type="image/x-icon" href="../../../app-assets/images/ico/favicon.ico">
    <link href="https://fonts.googleapis.com/css?family=Rubik:300,400,500,600%7CIBM+Plex+Sans:300,400,500,600,700" rel="stylesheet">

    <!-- BEGIN: Vendor CSS-->
    <link rel="stylesheet" type="text/css" href="../../../app-assets/vendors/css/vendors.min.css">
    <!-- END: Vendor CSS-->

    <!-- BEGIN: Theme CSS-->
    <link rel="stylesheet" type="text/css" href="../../../app-assets/css/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="../../../app-assets/css/bootstrap-extended.css">
    <link rel="stylesheet" type="text/css" href="../../../app-assets/css/colors.css">
    <link rel="stylesheet" type="text/css" href="../../../app-assets/css/components.css">
    <link rel="stylesheet" type="text/css" href="../../../app-assets/css/themes/dark-layout.css">
    <link rel="stylesheet" type="text/css" href="../../../app-assets/css/themes/semi-dark-layout.css">
    <!-- END: Theme CSS-->

    <!-- BEGIN: Page CSS-->
    <link rel="stylesheet" type="text/css" href="../../../app-assets/css/core/menu/menu-types/horizontal-menu.css">
    <link rel="stylesheet" type="text/css" href="../../../app-assets/css/pages/app-chat.css">
    <!-- END: Page CSS-->

    <!-- BEGIN: Custom CSS-->
    <link rel="stylesheet" type="text/css" href="../../../assets/css/style.css">
    <!-- END: Custom CSS-->

    <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.2/axios.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue"></script>
    <script src="https://www.gstatic.com/firebasejs/5.5.5/firebase.js"></script>


</head>
<!-- END: Head-->

<!-- BEGIN: Body-->

<body class="horizontal-menu chat-application" data-open="hover" data-menu="horizontal-menu">
<div class="content">
    <div class="content-overlay"></div>
    <div class="content-wrapper">
        <div class="content-header row">
        </div>
        <div class="content-body">
            <!-- app chat overlay -->
            <div class="chat-overlay"></div>
            <!-- app chat window start -->
            <section class="chat-window-wrapper">

                <div class="chat-area">
                    <div class="chat-header">
                        <header class="d-flex justify-content-between align-items-center border-bottom px-1 py-75">

                            <div class="chat-header-icons">
                                            <span class="chat-icon-favorite">
                                                <i class="bx bx-star font-medium-5 cursor-pointer"></i>
                                            </span>
                                <span class="dropdown">
                                                <i class="bx bx-dots-vertical-rounded font-medium-4 ml-25 cursor-pointer dropdown-toggle nav-hide-arrow cursor-pointer" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="menu">
                                                </i>
                                                <span class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                                                    <a class="dropdown-item" href="JavaScript:void(0);"><i class="bx bx-pin mr-25"></i>Fixar</a>
                                                    <a class="dropdown-item" href="JavaScript:void(0);"><i class="bx bx-trash mr-25"></i>Deletar Conversa</a>
                                                    <a class="dropdown-item" href="JavaScript:void(0);"><i class="bx bx-block mr-25"></i>Bloquear</a>
                                                </span>
                                            </span>
                            </div>
                        </header>
                    </div>
                    <!-- chat card start -->
                    <div class="card chat-wrapper shadow-none jairo">
                        <div class="card-content">
                            <div class="card-body chat-container">
                                <div class="chat-content">

                                    <div id="chat">
                                        <div v-for="m in mensagens">
                                            <div v-if="m.voz2" class="chat">
                                                <div class="chat-body">
                                                    <div class="chat-message">
                                                        <p>{{ m.dados }}</p>
                                                        <span class="chat-time">{{m.hora}}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div v-else class="chat chat-left">

                                                <div class="chat-body">
                                                    <div class="chat-message">
                                                        <p>{{ m.dados }}</p>
                                                        <span class="chat-time">{{m.hora}}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div class="card-footer chat-footer border-top px-2 pt-1 pb-0 mb-1">
                            <div id="enviarMensagem">
                                <form v-on:submit.prevent="enviarMsg()" class="d-flex align-items-center" action="javascript:void(0);">
                                    <i class="bx bx-face cursor-pointer"></i>
                                    <i class="bx bx-paperclip ml-1 cursor-pointer"></i>
                                    <input type="text" v-model="mensagem" class="form-control chat-message-send mx-1" placeholder="Digite Aqui...">
                                    <button type="submit" class="btn btn-primary glow send d-lg-flex"><i class="bx bx-paper-plane"></i>
                                        <span class="d-none d-lg-block ml-1">Enviar</span></button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <!-- chat card ends -->
                </div>
            </section>
        </div>
    </div>
</div>

<!-- BEGIN: Content-->

<!-- END: Content-->


<!-- BEGIN: Vendor JS-->
<script src="app-assets/vendors/js/vendors.min.js"></script>
<script src="app-assets/fonts/LivIconsEvo/js/LivIconsEvo.tools.js"></script>
<script src="app-assets/fonts/LivIconsEvo/js/LivIconsEvo.defaults.js"></script>
<script src="app-assets/fonts/LivIconsEvo/js/LivIconsEvo.min.js"></script>
<!-- BEGIN Vendor JS-->

<!-- BEGIN: Page Vendor JS-->
<script src="app-assets/vendors/js/ui/jquery.sticky.js"></script>
<!-- END: Page Vendor JS-->

<!-- BEGIN: Theme JS-->
<script src="app-assets/js/scripts/configs/horizontal-menu.js"></script>
<script src="app-assets/js/core/app-menu.js"></script>
<script src="app-assets/js/core/app.js"></script>
<script src="app-assets/js/scripts/components.js"></script>
<script src="app-assets/js/scripts/footer.js"></script>
<!-- END: Theme JS-->

<!-- BEGIN: Page JS-->
<script src="app-assets/js/scripts/pages/app-chat.js"></script>
<!-- END: Page JS-->
<script>


    // Add message to chat
    function chatMessagesSend2(source) {
        var message = chatMessageSend.val();
        if (message != "") {
            var html = '<div class="chat-message">' + "<p>" + message + "</p>" + "<div class=" + "chat-time" + ">3:35 AM</div></div>";
            $(".chat-wrapper .chat:last-child .chat-body").append(html);
            chatMessageSend.val("");
            chatContainer.scrollTop($(".chat-container > .chat-content").height());
        }
    }
    var config = {
        apiKey: "AIzaSyDMCBlLfsPJpQOCRhk4jEK9DlbZMU0EbUQ",
        authDomain: "vozcobranca-d9f45.firebaseapp.com",
        databaseURL: "https://vozcobranca-d9f45.firebaseio.com",
        projectId: "vozcobranca-d9f45",
        storageBucket: "vozcobranca-d9f45.appspot.com",
        messagingSenderId: "572181679019"
    };
    firebase.initializeApp(config);
    const db = firebase.database();
    const cpfCliente = '<?=$cpf?>';
    const user = '<?=$user?>';

    var app = new Vue({
        el: '#chat',
        created: function (){
            var _this = this;
            db.ref('chat/'+ cpfCliente).on('value', function (snap){
                _this.mensagens = snap.val();
                console.log(_this.mensagens);
            });

        },
        data:{
            mensagens: null,
            msgSupervisao: null,
            message: 'Carregou a biblioteca VUE'
        },
        methods:{
            carregar: function () {
                console.log('clicou no button do HTML');
            }
        },
        mounted: function () {
            setTimeout(function(){
                chatContainer.scrollTop($(".chat-container > .chat-content").height());
            }, 2000);
        }
    });
    var msg = new Vue({
        el: '#enviarMensagem',
        data:{
            mensagem: null
        },
        methods:{
            enviarMsg: function (source) {
                db.ref('chat/'+ cpfCliente).push({
                    ip: '<?php echo $_SERVER['REMOTE_ADDR']; ?>',
                    navegador:  '<?php echo $_SERVER['HTTP_USER_AGENT']; ?>',
                    dataHora: '<?php  echo $datahora=date('Y-m-d h:i:s');?>',
                    data: '<?php  echo $datahora=date('d/m/Y');?>',
                    hora: '<?php  echo $datahora=date('H:i');?>',
                    voz: false,
                    voz2: true,
                    executivo: user,
                    dados:  this.mensagem
                });
                this.mensagem = null;
                setTimeout(function(){
                    chatContainer.scrollTop($(".chat-container > .chat-content").height());
                }, 100);
            }
        }
    });
</script>

</body>
<!-- END: Body-->

</html>