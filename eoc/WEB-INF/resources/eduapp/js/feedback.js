$(document).ready(function(){
	function modal(){
			layer.open({
			type: 1,
			skin: 'layui-layer-molv', //皮肤
			title: ["反馈内容详细", "font-size:18px"],
			area: ['650px', '350px'],
			shadeClose: false,
			content: $('#feedback_modal'),
			cancel:clearData
		});
	};
	function clearData(){
		$("#typeShow").text("");
		$("#askConten").val("");
		$("#Email").text("");
		$("#Tel").text("");
	}
	function details(){
		$(".table-edit").each(function(){
			$(this).on("click",detailsData);
			function detailsData(){
				var self=this;
				var getId = singleId(self, "id");
				$.ajax({
					type:"post",
					url:"",
					dataType:"json",
					success:function(data){
						if (data.code==1) {
							modal();
							$("#typeShow").text(data.data.typeShow);
							$("#askConten").val(data.data.askContent);
							$("#Email").text(data.data.email);
							$("#Tel").text(data.data.mobilePhone);
							if (data.data.ststus ==1) {
								$('input:radio:first').attr('checked', 'true');
							} else {
								$('input:radio:last').attr('checked', 'true');
							};
							
						}
					}
				});
			}
		})
	}
	$("#question_add").on("click",function(){
		modal();
	})

})
