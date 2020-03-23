<template>
<div id="home" >
<div class="logo"><span>My</span>task.com</div>
      <h1>Наш сервис контроля вашего времени</h1>
      <p>Вы можете добавить любую задачу на сегодняшний день и дождаться сигнала. </p>
      <p id="timer">{{time.hour}} : {{time.minute}} : {{time.second}}</p>
        время: 
     <div class="add" >
      <input type="number" class="add__time" v-model="task.hour">:
      <input type="number" class="add__time" v-model="task.minute">:
      <input type="number" class="add__time" v-model="task.second">
        Заголовок:
      <input type="text" v-model="task.title"><br><br>
        Сообщение:
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
   background: #000;
}
header{
  padding:10px;
  display:flex;
  background-color:rgba(66,66,66,0.8);
  color:rgb(255,0, 0);
  ul{
    list-style:none;
    display:inline-block;
    margin-left:200px;
    li{
      padding: 10px 20px;
      display:inline-block;
      border-left:1px solid  #fff;
      }
    }
  .logo{
    font-size:1.2em;
    display:inline-block;
    padding:10px 20px;
    color:rgb(255,0, 0);
    span{
        color:rgb(255,0, 0);
      }
   } 
} 
#home{
 text-align:center;    
 background:#000;
  width:100%;
  height:100%;
  padding:auto;
  color: rgb(255,0, 0);
  div {
  logo{
    font-size:1.2em;
    display:inline-block;
    padding:10px 20px;
    color:rgb(255,0, 0);
    span{
       color:rgb(255,0, 0);
      }
   } 
   }
  }
h1{
   font-size:1.3em;
   color:#dd0;
   
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
     color:rgb(255,0, 0);
     font-size:2.5em;
     margin:20px 20px;
  }
.add{
    margin:40px auto;
    font-size:2vmax;
    color:red;
    input{
        Background-color:transparent;
        border:none;
       color:red;
      border-bottom:1px solid red;
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
    .task__title{
       background-color:#05c;
        color:gold;
        border-bottom:1px dotted #0cf;
      }
    .task__message{
       text-align:justify;
       color:#0cf;
       min-height:100px;
      }
   .task__status{
       background-color:#900;
       border-top:1px dotted #0cf;
       display:flex;
      .task__active{
          padding-left:40px;
          input{
              Background-color:transparent;
              border:none;
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
               message:"",
               title:"",
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