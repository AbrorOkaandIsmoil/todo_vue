var first = new Vue ({
    el: '#body',
    data() {
        return {
          todoList: [
                {"id":0,"title":"Learn Vue","done":false},
                {"id":1,"title":"Learn Laravel","done":false},
                {"id":4,"title":"Learn JS","done":true}
          ],
          new_todo: '',
          showComplete: false,
        };
    },
    mounted(){ this.getTodos(); },
    watch: {
        todoList: {
            handler: function(updatedList){
                localStorage.setItem('todo_list', JSON.stringify(updatedList));
            },
            deep: true
        }
    },
    computed: {
        n_completed: function(){
            return this.todoList.filter(function(item) {
                return !item.done;
            });
        },
        completed: function(){
            return this.todoList.filter(function(item) {
                return item.done;
            });
        },
    },
    methods: {
        getTodos() {
            if (localStorage.getItem('todo_list')) {
                this.todoList = JSON.parse(localStorage.getItem('todo_list'));
            }
        },
        addItem() {
            var list = this.todoList;
            var checked = true;
            for ( i in list ){
                if ( this.new_todo == list[i].title && !list[i].done) {
                    alert("You entered existing task!"); 
                    checked = false;
                    break;
                }
            }
            // validation check
            if (this.new_todo && checked) {
              this.todoList.unshift({
                id: this.todoList.length,
                title: this.new_todo,
                done: false,
              });
              // reset new_todo
              this.new_todo = '';
              // save the new item in localstorage
              return true;
            }
        },
        deleteItem(item) {
            this.todoList.splice(this.todoList.indexOf(item), 1);
        },
        toggleShowComplete() {
            this.showComplete = !this.showComplete;
        },
        clearAll() {
            this.todoList = [];
        },
    }
});