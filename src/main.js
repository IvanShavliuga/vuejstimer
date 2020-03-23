import Vue from 'vue';
import App from './App.vue';

Vue.component("task", {
    props:["time", "id", "title", "message","status"], 
    template:`<div class="task">
       <h2 class="task__title">{{id}} {{title}}</h2>
       <div class="task__message">
       {{message}}
       </div>
       <div class="task__status">
       <div class="task__time">
       {{time}}
       </div>
       <div class="task__active">
          <input type="text" v-bind:value="active(time)">
       </div>
       </div>
</div>`, 
     data() {
       return {          
          active:(dt)=>{
            current.now();
            t=dt.split(":");
            tt=Number(t[0])*60*60+Number(t[1])*60+Number(t[2]);              
              let d=current.hour*60*60+current.minute*60+current.second;
            let def=tt-d;           
              current.now(); 
              if(def > 0) return "будущее";
              else if(def===0) return "сейчас";
            else
                return "прошлое";
           } 
        } 
 }
 });
let v = new Vue({el:".app", 
    render: h => h(App)/*,
    data:{
        tasks:[{
            hour:current.hour,
            minute:current.minute+1,
            second:current.second,
            title:"test", 
            message:"This is test"} ],
            task:{
                hour:0,
                minute:0,
                second:0,
                message:"",
                title:"",
                status:""
             }, 
             time:0
      }, 
      methods:{
          add() {
             this.tasks.push(this.task);                      
          }                                                      
      }*/
                
});
