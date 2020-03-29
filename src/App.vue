<template>
<div id="home" >
<div class="logo"><span>My</span>task.com</div>
      <h1>Наш сервис контроля вашего времени</h1>
      <p>Вы можете добавить любую задачу на сегодняшний день и дождаться сигнала. </p>
      <p id="timer">{{time.hour}}:{{time.minute}}:{{time.second}}</p>
     <div class="add" >
      <input type="text" @keyup="onKeyup" title="hour" class="add__time" v-model="task.hour"><span class="separator">:</span>
      <input type="text" @keyup="onKeyup" title="minute" class="add__time" v-model="task.minute"><span class="separator">:</span>
      <input type="text" @keyup="onKeyup" title="second" class="add__time" v-model="task.second">
      <input type="text" @keyup="onKeyup" title="title" v-model="task.title">
      <input type="text" @keyup="onKeyup" title="message" v-model="task.message">
     </div>
      <button v-on:click="add()" title="add task" >Добавить ctrl+Enter</button>
      <button v-on:click="curr()" title="add current time" >Текущее время Enter</button>
      <table class="tasks__list">
      <p>Pages: {{displaypages()}}</p>
      <app-task v-for="(t,k) in tasksfilter(pagination.position)" :task="t" :key="k" :current="time"></app-task>
      </table>
      <button v-if="pagination.length" @click="pagination.position+=5">Next</button>
  </div>  
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
    width:100px;
    height:40px;
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
    margin:20px auto;   
    width:460px;
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
        width:22px;
      }
 } 
.tasks__list{
   width:80%;
   margin: 30px auto;  
   border-collapse:collapse;
.task{
    td{
        border-bottom: 1px solid black;
    }
    &__title{
        padding:10px;
        color:black;
        font-weight: bold;
      }
    &__message{
       padding:10px;
       text-align:justify;
       color:black;
   
      }
   &__status{
      padding:10px;
      .task__active{
          color:black;
        }
     }
}
}
}
@media screen and  (min-width: 300px) and (max-width: 501px){
 div#home{
   width:100%;
   h1,p {
       font-size:0.9em!important;   
   
   }
   #timer {
       font-size:1.7em!important;   
   }
   div.add {
       margin:15px auto;
       padding:0;
       width:90%;
       .add__time {
             width:15px!important;         
         }
       input {
         
         font-size:0.8em!important; 
         width:calc(90%/3)!important;    
       }   
      
   }
    button {
          font-size:0.7em!important; 
    } 
 }
 .tasks__list{
    width:90%!important; 
    .task {
        font-size:0.7em;    
    }
 }
}
@media screen and  (max-height: 388px){
   div#home {
      height: 388px;  
   }

}
@media screen and  (max-width: 299px){
 div#home{
   width:100%;
   h1,p {
       font-size:0.9em!important;   
   
   }
   #timer {
       font-size:1.7em!important;   
   }
   div.add {
       margin:15px 0;
       padding:0;
       width:100%;
       .add__time {
             width:15px!important;         
         }
       input {
         
         font-size:0.8em!important; 
         width:calc(90%/3)!important;    
       }   
      
   }
    button {
          font-size:0.7em!important; 
    } 
 }
 .tasks__list{
    width:100%!important; 
    .task {
        font-size:0.7em;    
    }
 }
}
@media screen and (max-width: 800px) and (min-width: 501px){
 div#home{
   width:100%;
   h1,p {
       font-size:0.9em!important;   
   
   }
   #timer {
       font-size:1.7em!important;   
   }
   div.add {
       margin:15px auto;
       padding:0;
       width:80%;
       .add__time {
             width:15px!important;         
         }
       input {
         
         font-size:0.9em!important; 
         width:calc(90%/3)!important;    
       }   
       
   }
 }
 .tasks__list{
    width:90%!important; 
    .task {
        font-size:1.1em;    
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
               id:0,
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
            },
            pagination: {
               length:0,
               position:0            
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
           let t= {
             id: this.tasks.length,
             hour: this.task.hour,
             minute: this.task.minute,
             second: this.task.second,
             message: this.task.message,
             title: this.task.title            
           };
           this.tasks.push(t);
           this.pagination.length=this.tasks.length/5                     
        },
        curr() {
           let d=new Date();
           this.task.hour=d.getHours();
           this.task.minute=d.getMinutes();
           this.task.second=d.getSeconds();
        },
        onKeyup(e) {
           if(e.ctrlKey && e.keyCode === 13)             
               this.add();
           else if(e.keyCode === 13 ) 
               this.curr();     
               
        },
        tasksfilter(idstart) {
           if(this.tasks.length<6) 
              return this.tasks;
           else {
              let tarr = [];
              let ls = this.tasks.length-idstart;
              let len = ( ls< 6 )?(ls):(idstart+5);
              for(let i=idstart; i<len; i++)
                  tarr.push(this.tasks[i]);
              return tarr;         
           }
              
        },
        displaypages() {
           return Math.floor(this.pagination.length);        
        }             
     },
      created:function(){ 
        this.now();
        
        setTimeout(()=>{this.now()},1000);
        
        for(let i=0; i<15; i++){
          let t={
            id:0,
            hour:0,
            minute:0,
            second:0,
            message:'',
            title:''            
          };
          if((this.time.minute+i)<59){
             t.hour=this.time.hour;
             t.minute=this.time.minute+i;
          }else{
             t.hour=/*(this.tasks[0].hour>23)?(0):(this.tasks[0].hour)*/+21;
             t.minute=i;
          }
          t.second = 0;
          t.message = "Test timer systems "+t.minute;
          t.title = "timer";
          t.id=i;
          this.tasks.push(t);
        }
        this.pagination.length=this.tasks.length/5;
        this.pagination.position=0;
    },
    components: {
        appTask:Task    
    }   

}
</script>