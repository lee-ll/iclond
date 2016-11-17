var app=angular.module("remainder",[]);
 app.directive("ngX",[function(){
     	return{
     		restrict:'A',
     		template: ' <div class="lists"><div ng-transclude></div></div>' ,
     		replace:true,
     		transclude:true,
     		link:function($scope,el){
     			$(el).on("keyup",false);
     			$(el).on("click",".list1",function(){
     				$(el).find(".list1").find(".list1-neirong").removeClass("active")
     				$(el).find(".list1").find(".row-bottom").css("left",44);
     				$(el).find(".list1").find(".row-top").hide();
     				$(this).find(".list1-neirong").addClass("active")
     				$(this).find(".list1-inner").find(".row-bottom").css("left",0);
     				$(this).find(".list1-inner").find(".row-top").show().css("left",0);
     				$(".plan").removeClass("active");
     				var that=this;
     				$scope.$apply(function(){
     					$scope.cu=$(that).index();
     				})
     			});
     			$(document).on("keyup",function(e){
     				if(e.keyCode===8){
     					var index=$(".active").index();
     					if(index==-1){
     						return -1;
     					}
     					$scope.$apply(function(){
     						$scope.Lists.splice(index,1);
     						$scope.save();
     					})
     				}

     			})
     		}
     	}}])   
 app.controller('mainCtrol',['$scope',function($scope){
		$scope.Lists=[];
		$scope.cu=0;
		$scope.colors=["purple","green","blue","yellow","brown","red","orange"];
		if(localStorage.remainder){
			$scope.Lists=JSON.parse(localStorage.remainder)
		}else{
			$scope.Lists=[];
		}
		$scope.save=function(){
			localStorage.remainder=JSON.stringify($scope.Lists);
		}
		function maxid(){
			var max=-Infinity;
			for(var i=0;i<$scope.Lists.length;i++){
				var v=$scope.Lists[i];
				if(v.id>max){
					max=v.id
				}
			}
			return (max==-Infinity)?1000:max;
		}
		$scope.addlist=function(){
			var len=$scope.Lists.length;
			var index=len%7;
			var v={
				id:maxid()+1,
				name:"新列表"+(len+1),
				theme:$scope.colors[index],
			}
			$scope.Lists.push(v);
		}
		$scope.chbg=function(e){
		   $(".plan").toggleClass("active");
		   $(".list1-neirong").removeClass("active");	
		}
		$scope.remove=function(index){
			$scope.Lists.splice(index,1)
		}
	}])
 app.directive("sel",[function(){
	 	return{
	 		restrict:'A',
	 		template: ' <div class="select"><div ng-transclude></div></div>' ,
	        replace:true,
	        transclude:true,
	        link:function($scope,el){
	          $(el).on("click",function(){
	          	$(".xuanxiang").toggle();
	          	return false;
	          })
	          $(document).on("click",function(){
	          	$(".xuanxiang").hide();
	          })
	          $(".quxiao").on("click",function(){
	          	$(".xuanxiang").hide();
	          })
	          $(".xuanxiang").on("click",false);
	        }
	 	}}])