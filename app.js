$("document").ready(function () {
    var todoDatabase = {
        error: "",
        todos: [
            // {
            //     id: uuid(),
            //     text: "吃午餐",
            //     createdAt: moment(new Date()).format("MM/DD hh:mm")
            // }
        ]        
    };

    function getLiHTML(todo) {
        return (
            `<li id="${todo.id}">
                <span class="complete-btn">
                    <i class="fas fa-trash-alt"></i>
                </span>
                ${todo.text}
                <span class="created-at">
                    ${todo.createdAt}
                </span>
            </li>`
        );
    };

    function renderList(todoDatabase) {
        var error = $("#error");
        var todoList = $("#todoList");

        // 先刪除所有li
        todoList.empty();

        var liHTML = "";

        todoDatabase.todos.forEach(function (todo) {
            liHTML += getLiHTML(todo);
        });

        error.text(todoDatabase.error);
        todoList.append($(liHTML));
    };

    function addNewTodo(event) {
        event.preventDefault();
        var newTodoInput = $("#newTodo");
        var newTodoText = newTodoInput.val().trim();

        if (newTodoText) {
            var newTodo = {
                id: uuid(),
                text: $("#newTodo").val(),
                createdAt: moment(new Date()).format("MM/DD hh:mm")
            };

            todoDatabase.todos.push(newTodo);
            todoDatabase.error = "";
            
        } else{
            todoDatabase.error = "請輸入代辦事項";
        };

        renderList(todoDatabase);
        // 清空newTodoInput
        newTodoInput.val("");

    };



    //------------- 事件監聽器 -------------//
    $("#addTodo").click(addNewTodo);

    $("#newTodo").keyup(function (event) {
        if (event.keyCode === 13) {
            addNewTodo();
        };
    });

    // 完成並刪除待辦
    $("#todoList").on("click", ".complete-btn", function () {
        var deleteId = $(this).parent().attr("id");
        todoDatabase.todos = todoDatabase.todos.filter(function (todo) {
            return todo.id !== deleteId;
        });

        todoDatabase.error = "";
        renderList(todoDatabase);
    })






})