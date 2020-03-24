<template>
<div id="home" >
<div class="logo"><span>My</span>task.com</div>
      <h1>Наш сервис контроля вашего времени</h1>
      <p>Вы можете добавить любую задачу на сегодняшний день и дождаться сигнала. </p>
      <p id="timer">{{time.hour}}:{{time.minute}}:{{time.second}}</p>
     <div class="add" >
      <input type="text" class="add__time" v-model="task.hour"><span>:</span>
      <input type="text" class="add__time" v-model="task.minute"><span>:</span>
      <input type="text" class="add__time" v-model="task.second">
      <input type="text" v-model="task.title">
      <input type="text" v-model="task.message">
     </div>
      <button v-on:click="add()">Добавить</button>
      
      <app-task v-for="(t,k) in tasks" :task="t" :key="k" :current="time"></app-task></div>
    
</template>
<style lang="scss">

*{
  margin:0;
  padding:0;
  }
body {
   background: #ccc;
   font-family: "Georgia"
}

#home{
 text-align:center;    
 background:#dedede;
  width:60%;
  height:100%;
  padding:auto;
  margin: 0 auto;
  color: rgb(255,0, 0);
 
  .logo{
    font-size:1.5em;
    display:inline-block;
    padding:10px 20px;
    color:rgb(0,200, 200);
    span{
       color:rgb(200,200, 0);
      }
   } 
   

h1,p{
   font-size:1.1em;
   color:#000;
   
 } 
button{
    background-color:transparent;
    border-radius:20px;
    height:30px;
    width:100px;
    color:red;
    border:1px solid red;
 } 
#timer{
     color:rgb(255,80, 190);
     transform: scaleY(1.8);
     font-size:2.5em;
     margin:20px 20px;
  }
.add{
    margin:40px auto;   
    width:450px;
    color:red;
    border-bottom:1px solid red;
    padding:5px;
    input{
        background-color:transparent;
        border:none;
        color:red;
        margin: 0;
        width: 180px;
        font-size:20px;
     } 
    span {
        font-size:16px;   
    } 
    .add__time{
        width:20px;
      }
 } 

.task{
    background-color:rgba(255,0,255,0.3);
    border:1px dotted #0cf;
    margin:10px;
    padding:1px;
    width:700px;
    &__title{
       background-color:#05c;
        color:gold;
        border-bottom:1px dotted #0cf;
      }
    &__message{
       text-align:justify;
       color:#0cf;
       min-height:50px;
      }
   &__status{
       background-color:#900;
       border-top:1px dotted #0cf;
       display:flex;
      .task__active{
          padding-left:40px;
          color:#0ff;
        }
     }
}
}
</style>
<script>
import Task from './Task.vue';
export default {
     data() {
        return {
            time:{
              hour:0,
              minute:0,
              second:0
            },
            tasks:[{
               hour:0,
               minute:0,
               second:0,
               title:"test", 
               message:"This is test"} ],
            task:{
               hour:0,
               minute:0,
               second:0,
               message:"Сообщение",
               title:"Заголовок",
               status:""
            }
        }       
     },
     methods:{
        now() {
           let d=new Date();
           this.time.hour=d.getHours();
           this.time.minute=d.getMinutes();
           this.time.second=d.getSeconds();
           setTimeout(()=>{this.now()},1000);
        },
        add() {
           this.tasks.push(this.task);                     
        } 
     },
      created:function(){ 
        this.now();
        setTimeout(()=>{this.now()},1000);
        if(this.time.minute<59){
             this.tasks[0].hour=this.time.hour;
             this.tasks[0].minute=this.time.minute+2;
        }else{
             this.tasks[0].hour=(this.tasks[0].hour>23)?(0):(this.tasks[0].hour);
             this.time.minute=0;
        }
    },
    components: {
        appTask:Task    
    }   

}
</script>