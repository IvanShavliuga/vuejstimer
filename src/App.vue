<template>
<div id="home">
<div class="logo"><span>My</span>task.com</div>
      <h1>Наш сервис контроля вашего времени</h1>
      <p>Вы можете добавить любую задачу на сегодняшний день и дождаться сигнала. </p>
      <p id="timer">{{time.hour}}:{{time.minute}}:{{time.second}}</p>
     <div class="add" >
      <input type="text" @keyup="onKeyup" title="hour" class="add__time" v-model="task.hour">
          <span class="separator">:</span>
      <input type="text" @keyup="onKeyup" title="minute" class="add__time" v-model="task.minute">
          <span class="separator">:</span>
      <input type="text" @keyup="onKeyup" title="second" class="add__time" v-model="task.second">
      <input type="text" @keyup="onKeyup" title="title" v-model="task.title">
      <input type="text" @keyup="onKeyup" title="message" v-model="task.message">
     </div>
      <button v-on:click="add()" title="add task" role="button">Добавить ctrl+Enter</button>
      <button v-on:click="curr()" title="add current time" role="button">Текущее время Enter</button>
      <table class="tasks__list">
         <caption> Task 
             <span title="position">{{pagination.position+1}}</span>
              of Tasks 
              <span title="length">{{pagination.length}}</span>
         </caption>
         <tbody v-if="pagination.position === tasks.length-1">
            <app-task  :task="tasks[pagination.position]" :current="time"></app-task>
            <tr v-for="(e,k) in [1,2,3,4]" :key="k"><td>&nbsp;</td></tr>
         </tbody>
         <tbody v-else>
         <app-task v-for="(t,k) in tasksfilter(pagination.position)" :task="t" :key="k" :current="time"></app-task>
             <tr v-for="(e,k) in empty" :key="k"><td>&nbsp;</td></tr>
         </tbody>
      </table>
      <button v-if="pagination.position<pagination.length&&pagination.position>0" 
             @click="pagination.position-=5" 
             role="button">
             Prev
      </button>
      <button v-if="pagination.position<(pagination.length-5)" 
              @click="pagination.position+=5" 
              role="button">
              Next
      </button>
      <div class="footer">
        &copy; 30.03.2020 <a href="https://github.com/IvanShavliuga">Ivan Shavliuga (Ivanov)</a>, Belarus, Novopolotsk. License 
        <a href="https://github.com/IvanShavliuga/vuejstimer/blob/master/LICENSE">MIT</a> 
      </div>
  </div>  
</template>
<style lang="scss">

*{
  margin:0;
  padding:0;
  }
body {
   background: #ccc;
   font-family: "Georgia";
}
button {
   outline: none;
}
button:active {
   outline: 2px solid gray;
}

#home{
 text-align:center;    
 background:#dedede;
  width:60%;
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
   .footer {
      color:black;
      margin-top:50px;
      padding:20px;   
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
        width: 160px;
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
   height:300px;
   vertical-align:top;
   margin: 30px auto;  
   border-collapse:collapse;
   caption {
      font-size:20px;
      font-weight:bold; 
      span {
          color: #ed56ed;      
      }  
   }
   tbody{
      td {
          height:60px;      
      }   
   }
 .task{
    tr {
        height:60px;
    }
    td{
        border-bottom: 1px solid black;
        vertical-align:bottom;
        height:60px;
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
.footer a {
    color:#ff33ff;
    font-weight:bold;
    text-decoration:underline;
    
}
}

@media screen and  (min-width: 300px) and (max-width: 489px){
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
            tasks:[ ],
            empty:[],
            task:{
               hour:0,
               minute:0,
               second:0,
               message:"Сообщение",
               title:"Заголовок",
               status:"",
               id:0
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
           this.pagination.length=this.tasks.length;                     
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
           if(this.tasks.length<6){
              let len=this.tasks.length;
              this.empty = []              
              for(let j=0; j<len; j++)
                 this.empty.push(j);
              return this.tasks;
           }else {
              
              let ls = this.tasks.length-idstart;
              if(ls == 1){
                  this.empty = [];           
                  for(let j=0; j<4; j++)
                     this.empty.push("ls == 1 "+j+" len "+this.tasks.length+" elem: "+this.tasks[this.tasks.length - 1].title);                  
                  return this.tasks[this.tasks.length - 1];
              }
              else if(ls < 5 && ls > 1){
                  let tarr = [];
                  for(let i=0; i<ls; i++)
                      tarr.push(this.tasks[i+idstart]);
                  this.empty = [];           
                  for(let j=0; j<5-ls; j++)
                     this.empty.push(j);
                  return tarr; 
              }else{
                  let tarr = [];
                  for(let i=idstart; i<idstart+5; i++)
                      tarr.push(this.tasks[i]);
                  return tarr; 
              }
                      
           }
              
        },
        displaypages() {
           return Math.floor(this.pagination.length/5);        
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
          t.second = i*3;
          t.message = "Test timer systems "+t.minute;
          t.title = "timer ("+Math.floor(Math.random()*1000)+")";
          t.id=i;
          this.tasks.push(t);
        }
        this.pagination.length=this.tasks.length;
        this.pagination.position=0;
    },
    components: {
        appTask:Task    
    }   

}
</script>
