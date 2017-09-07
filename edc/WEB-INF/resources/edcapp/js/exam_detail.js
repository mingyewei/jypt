

$(document).ready(function() {

    var height = $(window).height() - $('.header').height() - $('.footer').height() + 'px';
    $('.exam-detial-box').css('min-height', height);
    var checkBoxList=[];
    /*单选*/
    $(document).on('click', '.exam-detial-radio-answer',function(e) {
        var evt = window.event || arguments.callee.caller.arguments[0]; // 获取event对象
        evt.preventDefault();
        var checked=$(this).find('input').val();
        var checkedId=$(this).parent('li').attr('data-question-id');
        $(this).addClass( "exam-detial-radio-checked");
        $(this).siblings().removeClass('exam-detial-radio-checked');
        if($(this).hasClass('exam-detial-radio-checked')){
            for(var k= 0,len=checkBoxList.length;k<len;k++){
                if(checkBoxList[k].paperItemId==checkedId){
                    checkBoxList[k].userAnswer[0]=checked;
                }
            }
        }
    })

    /*多选*/
    $(document).on('click','.exam-detial-multiple-answer ', function(e) {
        var evt = window.event || arguments.callee.caller.arguments[0]; // 获取event对象
        var checked=$(this).find('input').val();
        var checkedId=$(this).parent('li').attr('data-question-id');
        evt.preventDefault();
        $(this).toggleClass( "exam-detial-multiple-checked");
          if($(this).hasClass('exam-detial-multiple-checked')){
              for(var k= 0,len=checkBoxList.length;k<len;k++){
                  if(checkBoxList[k].paperItemId==checkedId){
                      if(checkBoxList[k].userAnswer.indexOf(checked)<0){
                          checkBoxList[k].userAnswer.push(checked)
                      }
                  }
              }
          }else{
              for(var k= 0,len=checkBoxList.length;k<len;k++){
                  if(checkBoxList[k].paperItemId==checkedId){
                       var userAnswer=checkBoxList[k].userAnswer;
                       for(var m= 0,len3=userAnswer.length;m<len3;m++){
                          if(userAnswer[m]==checked){
                              valueIndex=m;
                              userAnswer.splice(m,1)
                          }
                       }
                  }
              }
          }
    })
/*问答题*/
    $(document).on('blur','.exam-question-and-answer', function(e) {
        var evt = window.event || arguments.callee.caller.arguments[0]; // 获取event对象
        var text=$(this).val();;
        var checkedId=$(this).parent('.question_list').attr('data-question-id');
        evt.preventDefault();
            for(var k= 0,len=checkBoxList.length;k<len;k++){
                if(checkBoxList[k].paperItemId==checkedId){
                    if(checkBoxList[k].userAnswer.indexOf(text)<0){
                        checkBoxList[k].userAnswer.push(text)
                    }
                }
            }
    })
    /*获取试题*/
    var examId=getUrlParamByName('id');
    var status=getUrlParamByName('status');
    var paperId,ajaxUrl;
    /*未考试：0，评分中：1，评分后：2*/
    if(status==0){
        ajaxUrl=contextPath+"/exam/paperDetail";
    }else{
        ajaxUrl=contextPath+"/exam/userPaperDetail";
        $('.exam-grade-log').show();
        $('.exam-choice-question-score').show();
        $('.exam-submit-btn').hide();
        $('.exam-detial-q-and-a-box').css('margin-bottom','50px');
        if((!$('.exam-detial-q-and-a-box').find('.question-after-box').length>0)||status==2){
            var Imgsrc=contextPath+'/resources/edcapp/img/icon_pingf_blue.png';
            $('.exam-grade-log').find('img').attr('src',Imgsrc)
            $('.exam-grade-log').find('span').css('color','#21a6e4');
        }
    }
    $.ajax({
        type: "get",
        url: ajaxUrl,
        dataType: "json",
        data: { "examId": examId},
        success: function(data) {
            paperId=data.data.id;
            $('.exam-detial-title').text(data.data.name )
            var paperList=data.data.paperStructures;
            $("#exam_detail_note").text(data.data.note);
            if(paperList){
                if(status==0){
                    for(var i= 0,len1=paperList.length;i<len1;i++){
                      if(paperList[i].itemType==0){
                          radioContent(paperList[i],checkBoxList,i)
                      }else if(paperList[i].itemType==1){
                          multipleContent(paperList[i],checkBoxList,i)
                      }else if(paperList[i].itemType==3){
                          question(paperList[i],checkBoxList,i)
                      }
                    }
                }else{
                    for(var i= 0,len2=paperList.length;i<len2;i++){
                        if(paperList[i].itemType==0){
                            radioContentAfter(paperList[i],i)
                        }else if(paperList[i].itemType==1){
                            multipleContentAfter(paperList[i],i)
                        }else if(paperList[i].itemType==3){
                            questionAfter(paperList[i],status,i);
                        }
                    }
                    var score;
                    if(paperList[1]){
                        score=Number(paperList[0].totalScore)+Number(paperList[1].totalScore)
                    }else{
                        score=Number(paperList[0].totalScore);
                    }
                    $('.exam-choice-question-score').find('span').text(score);
                    console.log($('.exam-radio-box').find('li').length)
                    console.log($('.exam-checkbox-box').find('li').length)
                    if($('.exam-radio-box').find('li').length==0&&$('.exam-checkbox-box').find('li').length==0){
                        $('.exam-choice-question-score').hide();
                    }
                    if(status==2){
                        var totalScore;
                        if(paperList[2]){
                            totalScore=Number(paperList[0].totalScore)+Number(paperList[1].totalScore)+Number(paperList[2].totalScore);
                        }else if(paperList[1]){
                            totalScore=Number(paperList[0].totalScore)+Number(paperList[1].totalScore)
                        }else{
                            totalScore=Number(paperList[0].totalScore);
                        }
                        $('.exam-grade-log').find('span').text(totalScore+'分');
                    }

                }

            }

        }
    })
    /*提交btn*/
    /*提交答案*
    不管是否填写答案 都可以提交
    /
     */
    $('.exam-submit-btn').on('click',function(){
        for(var i= 0,len=checkBoxList.length;i<len;i++){
            if (checkBoxList[i].userAnswer==''){
                $('.popup_shade').show();
                $('.confirm-box').show();
                var shdowHeight=$(document).height();
                $('.popup_shade').css('height',shdowHeight);
                $(window).scrollTop(0);
                return false;
            }
        };
        submitPaper()
    })
    $('.confirm-cancel').on('click',function(){
        $('.popup_shade').hide();
        $('.confirm-box').hide();
    })
    $('.confirm-submit').on('click',function(){
        $('.popup_shade').hide();
        $('.confirm-box').hide();
        submitPaper();
    })
    function  submitPaper(){
        for(var i= 0,len=$('.exam-detial-q-and-a-box div').length;i<len;i++){
            for(var k= 0,len=checkBoxList.length;k<len;k++){
                var queId=$('.exam-detial-q-and-a-box div').eq(i).attr('data-question-id');
                var question_value=$('.exam-detial-q-and-a-box div').eq(i).find('textarea').val();
                if(checkBoxList[k].paperItemId==queId){
                    checkBoxList[k].userAnswer[0]=question_value;
                }
            }
        }
        for(var i= 0,len=checkBoxList.length;i<len;i++){
            checkBoxList[i].userAnswer=JSON.stringify(checkBoxList[i].userAnswer)
        };
        var param={paperId:paperId,answers:checkBoxList};
        $.ajax({
            type: "post",
            url: contextPath+"/exam/commitAnswer",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data:JSON.stringify(param),
            success: function(data) {
                if(data.code==1){
                    if($('.exam-detial-q-and-a-box').find('.question_list').length>0){
                        location.href=contextPath+'/exam/detail?href=exam/exam&status=1&id='+examId;
                    }else{
                        location.href=contextPath+'/exam/detail?href=exam/exam&status=2&id='+examId;
                    }
                }else{
                    layer.msg(data.msg, {icon: 1});
                }
            }
        });
    }

})

/*评分单选*/
function radioContentAfter(data,m){
    if(!data){return false}
    var str='';
    for(var i= 0,len=data.items.length;i<len;i++){
        str+='<li class="pos-relative">'+
            '<p class="exam-detial-question"> <a>'+(i+1)+'</a>、'+data.items[i].question+'</p>'
        var anwerList=JSON.parse(data.items[i].optionStr);
        for(var j= 0,len1=anwerList.length;j<len1;j++){
            if(data.items[i].userAnswer){
                if(anwerList[j].code==(JSON.parse(data.items[i].userAnswer))[0]){
                    str+='<label class="exam-detial-radio-answer hand exam-detial-radio-checked disabled">'
                }else{
                    str+='<label class="exam-detial-radio-answer hand  disabled">'
                }
            }else{
                str+='<label class="exam-detial-radio-answer hand disabled">'
            }
            str+=''+anwerList[j].code+'、'+anwerList[j].value+''+
                '</label>'
        }
        if(data.items[i].correct==0){
            str+='<span class="exam-answer-correct pos-absolute exam-answer-error ">回答错误！</span>'
        }else{
            str+='<span class="exam-answer-correct pos-absolute">回答正确！</span>'
        }
        str+='</li>'
    }
    $('.exam-radio-box h5').show();
    if(m==0){
        $('.exam-radio-box h5 a').text('一、')
    }else if(m==1){
        $('.exam-radio-box h5 a').text('二、')
    }else{
        $('.exam-radio-box h5 a').text('三、')
    }
    $('.exam-radio-box h5 span').text(data.itemTypeTotalScore);
    $('.exam-radio-box').append(str)
}
/*评分多选*/
function  multipleContentAfter(data,m){
    if(!data){return false}
    var str="";
    for(var i= 0,len=data.items.length;i<len;i++){
        str+='<li class="pos-relative">'+
            '<p class="exam-detial-question"> <a>'+(i+1)+'</a>、'+data.items[i].question+'</p>'
        var anwerList=JSON.parse(data.items[i].optionStr);
        for(var j= 0,len1=anwerList.length;j<len1;j++){

            if(data.items[i].userAnswer!='[]'){
                if((JSON.parse(data.items[i].userAnswer).indexOf(anwerList[j].code))>-1){
                    str+='<label class="exam-detial-multiple-answer hand disabled exam-detial-multiple-checked">'
                }else{
                    str+='<label class="exam-detial-multiple-answer hand disabled">'
                }

            }else{
                str+='<label class="exam-detial-multiple-answer hand disabled">'
            }
            str+=''+anwerList[j].code+'、'+anwerList[j].value+'' +
                '</label>'

        }
        if(data.items[i].correct==0){
            str+='<span class="exam-answer-correct pos-absolute exam-answer-error ">回答错误！</span>'
        }else{
            str+='<span class="exam-answer-correct pos-absolute">回答正确！</span>'
        }
        '</li>'
    }
    $('.exam-checkbox-box h5').show();
    if(m==0){
        $('.exam-checkbox-box h5 a').text('一、')
    }else if(m==1){
        $('.exam-checkbox-box h5 a').text('二、')
    }else{
        $('.exam-checkbox-box h5 a').text('三、')
    }
    $('.exam-checkbox-box h5 span').text(data.itemTypeTotalScore);
    $('.exam-checkbox-box').append(str)
}

/*问答答案*/
function   questionAfter(data,status,m){
    if(!data){return false}
    var str="";
    for(var i= 0,len=data.items.length;i<len;i++){
        str+='<div class="question-after-box">'+
               '<label class="exam-detial-question"> <a>'+(i+1)+'</a>、'+data.items[i].question+'</label>'
           if(status==1){
               if(data.items[i].userAnswer){
                   str+='<textarea placeholder="'+(JSON.parse(data.items[i].userAnswer))[0]+'" disabled="disabled" class="exam-question-and-answer border-ra"></textarea>'
               }else{
                   str+='<textarea  disabled="disabled" class="exam-question-and-answer border-ra"></textarea>'
               }
               str+='<div class="exam-textarea-score">分数：<span>评分中</span></div>'
           }else{
               str+='<textarea placeholder="'+(JSON.parse(data.items[i].userAnswer))[0]+'" disabled="disabled" class="exam-question-and-answer border-ra"></textarea>'
               str+='<div class="exam-textarea-score">分数：<span>'+data.items[i].score +'</span></div>'
           }
        str+='</div>'
    }
    $('.exam-detial-q-and-a-box h5').show();
    if(m==0){
        $('.exam-detial-q-and-a-box h5 a').text('一、')
    }else if(m==1){
        $('.exam-detial-q-and-a-box h5 a').text('二、')
    }else{
        $('.exam-detial-q-and-a-box h5 a').text('三、')
    }
    $('.exam-detial-q-and-a-box h5 span').text(data.itemTypeTotalScore);
    $('.exam-detial-q-and-a-box').append(str)
};

/*答题单选*/
function radioContent(data,checkBoxList,m){
    if(!data){return false}
    var str="";
    for(var i= 0,len=data.items.length;i<len;i++){
        checkBoxList.push({paperItemId:data.items[i].id,userAnswer:[]})
        str+='<li class="pos-relative" data-question-id='+data.items[i].id+'>'+
            '<p class="exam-detial-question"> <a>'+(i+1)+'</a>、'+data.items[i].question+'</p>'
           var anwerList=JSON.parse(data.items[i].optionStr);
           for(var j= 0,len1=anwerList.length;j<len1;j++){
               str+='<label class="exam-detial-radio-answer hand">'+
                 '<input type="radio" name='+data.items[i].id+' value='+anwerList[j].code+' class="exam-detial-radio">'+anwerList[j].code+'、'+anwerList[j].value+''+
               '</label>'
           }
        str+='</li>'
    }
    $('.exam-radio-box h5').show();
    if(m==0){
        $('.exam-radio-box h5 a').text('一、')
    }else if(m==1){
        $('.exam-radio-box h5 a').text('二、')
    }else{
        $('.exam-radio-box h5 a').text('三、')
    }
    $('.exam-radio-box h5 span').text(data.itemTypeTotalScore);
    $('.exam-radio-box').append(str);
}
/*答题多选*/
function multipleContent(data,checkBoxList,m){
    if(!data){return false}
    var str="";
    for(var i= 0,len=data.items.length;i<len;i++){
        checkBoxList.push({paperItemId:data.items[i].id,userAnswer:[]})
    str+='<li class="pos-relative" data-question-id='+data.items[i].id+' >'+
            '<p class="exam-detial-question"> <a>'+(i+1)+'</a>、'+data.items[i].question+'</p>'
        var anwerList=JSON.parse(data.items[i].optionStr);
        for(var j= 0,len1=anwerList.length;j<len1;j++) {
            str+='<label class="exam-detial-multiple-answer hand">'+
            '<input type="checkbox" name='+data.items[i].id+' value='+anwerList[j].code+' class="exam-detial-multiple">'+anwerList[j].code+'、'+anwerList[j].value+'' +
            '</label>'
        }
        str+='</li>'
    }
    $('.exam-checkbox-box h5').show();
    if(m==0){
        $('.exam-checkbox-box h5 a').text('一、')
    }else if(m==1){
        $('.exam-checkbox-box h5 a').text('二、')
    }else{
        $('.exam-checkbox-box h5 a').text('三、')
    }
    $('.exam-checkbox-box h5 span').text(data.itemTypeTotalScore);
    $('.exam-checkbox-box').append(str)
}
/*答题问答*/
function question(data,checkBoxList,m){
    if(!data){return false}
    var str="";
    for(var i= 0,len=data.items.length;i<len;i++){
        checkBoxList.push({paperItemId:data.items[i].id,userAnswer:[]})
     str+='<div class="question_list" data-question-id='+data.items[i].id+'>'+
                '<label class="exam-detial-question"> <a>'+(i+1)+'</a>、'+data.items[i].question+'</label>'+
                '<textarea placeholder="限500字" class="exam-question-and-answer border-ra" maxlength="500"></textarea>'+
          '</div>'
    }
    $('.exam-detial-q-and-a-box h5').show();
    if(m==0){
        $('.exam-detial-q-and-a-box h5 a').text('一、')
    }else if(m==1){
        $('.exam-detial-q-and-a-box h5 a').text('二、')
    }else{
        $('.exam-detial-q-and-a-box h5 a').text('三、')
    }
    $('.exam-detial-q-and-a-box h5 span').text(data.itemTypeTotalScore);
    $('.exam-detial-q-and-a-box').append(str)

}