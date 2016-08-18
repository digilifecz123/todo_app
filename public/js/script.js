let $;

$(document).ready(function() {
  // Fire function countTodos
  countTodos();
 // Function countTodos counts tasks
  function countTodos() {
    let count = $("#sortable li").length;
    $('.count-todos').html(count);
    }
    $('.updateTodoButton').on('click', function() {

    let $TodoTitle = $(".TodoTitle");
    let $TodoInputForm = $(".updateTodoForm");

    $(this).siblings(".TodoTitle").toggleClass("hide");
    $(this).siblings(".updateTodoForm").toggleClass("hide");
    $(this).closest(".updateTodoButton").hide();
  });

  $(".inputEdit").focusout(function() {
    $(this).siblings(".submitUpdateForm").trigger("click")
  })

  // $TodoTitle.toggleClass("hide");
  // $TodoInputForm.toggleClass("hide");

  //   $('#updateTodoButton').on('click', function() {
  //     let $TodoTitle = $("#TodoTitle");
  //     let $TodoInputForm = $("#updateTodoForm");
  //     $TodoTitle.toggleClass("hide");
  //     $TodoInputForm.toggleClass("hide");
  // });  

  // let data = 
  // {
  //     params: {
  //       id: TodoId
  //     }, 
  //     body: {
  //       Todo: TodoInputVal          
  //     }
  // }

  //   $.ajax({
  //     dataType: "json", 
  //     type: "PUT",
  //     url: "/secret/" + TodoId,
  //     data: JSON.parse(data)
  //   })
  //     .success(function(data){
  //       console.log(data);
  //     })
  //     .error(function(data, textStatus, error){
  //       console.log(error);
  //     })
});