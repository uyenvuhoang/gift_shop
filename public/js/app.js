$(document).ready(function () {
  //Khi người dùng cuộn chuột thì gọi hàm scrollFunction
  window.onscroll = function () {
    scrollFunction();
  };
  // khai báo hàm scrollFunction
  function scrollFunction() {
    // Kiểm tra vị trí hiện tại của con trỏ so với nội dung trang
    if (
      document.body.scrollTop > 160 ||
      document.documentElement.scrollTop > 160
    ) {
      //nếu lớn hơn 20px thì hiện button
      document.getElementById("btnRoll").style.display = "flex";
    } else {
      //nếu nhỏ hơn 20px thì ẩn button
      document.getElementById("btnRoll").style.display = "none";
    }
  }
  //gán sự kiện click cho button
  document.getElementById("btnRoll").addEventListener("click", function () {
    //Nếu button được click thì nhảy về đầu trang
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });
  window.onscroll = function () {
    myFunction();
  };
  var navbar = document.getElementById("navbar");
  var sticky = navbar.offsetTop;

  function myFunction() {
    if (window.pageYOffset >= sticky) {
      navbar.classList.add("sticky");
    } else {
      navbar.classList.remove("sticky");
    }
  }
  
});

function currentSlide(smallImg){
  var fullImg = document.getElementById('imageBox');
  fullImg.src = smallImg.src;
}


var app = angular.module("myApp", ['ngRoute']);
app.config(function($routeProvider) {
  $routeProvider
  .when("/",{
      templateUrl:"home.html"
  })
  .when("/Products",{
      templateUrl:"product.html"
  })
  .when("/Products/ProductDetail",{
      templateUrl:"productdetail.html"
  })
  .when("/Products/Checkout",{
    templateUrl:"checkout.html"
})
  .when("/Sales",{
      templateUrl:"sale.html"
  })
  .when("/News",{
      templateUrl:"news.html"
  })
  .when("/Abouts",{
      templateUrl:"about.html"
  })
  .when("/Signin",{
    templateUrl:"signin.html"
})
.when("/Signup",{
  templateUrl:"signup.html"
})
  .when("/Contact",{
      templateUrl:"contact.html"
  });
});
app.run(function($rootScope, $http){
    $http.get("data.json").then(function(rsp){
        $rootScope.listProduct = rsp.data.products; 
        $rootScope.items = rsp.data.items
        $rootScope.listBrand = rsp.data.brands
        $rootScope.listCategory = rsp.data.ListCategory;
        $rootScope.images = rsp.data.banner;
        $rootScope.max = $rootScope.listProduct.length;
        $rootScope.ListPro_20 = [];
        $rootScope.listPro = []
        $rootScope.stemp = [];
        $rootScope.listCate_Wasrose = [];
        $rootScope.listCate_Stuffet = [];
        $rootScope.listCate_Homedecor = [];
        $rootScope.listCate_Personalitems = [];
        $rootScope.listCate_Businessgifts = [];
        $rootScope.filteredForYou = rsp.data.products.filter(function(x){ return x.hasOwnProperty("forYou")});
        $rootScope.filteredNewItems = rsp.data.products.filter(function(x){ return x.date_start>"06/06/2022"});
        //sắp xếp danh sách theo số lượt mua cao nhất đến thấp nhất
        for(var i=0; i< $rootScope.max; i++){
          for(var j =i+1; j<$rootScope.listProduct.length; j++){
              if($rootScope.listProduct[i].q_pur < $rootScope.listProduct[j].q_pur){
                 $rootScope.stemp = $rootScope.listProduct[i];
                 $rootScope.listProduct[i] = $rootScope.listProduct[j];
                 $rootScope.listProduct[j] = $rootScope.stemp;
              }
          }
          $rootScope.listPro.push($rootScope.listProduct[i]);
        }
        for(var i=0; i<20; i++){
          $rootScope.ListPro_20.push($rootScope.listPro[i]);
        }
        // Hàm lấy danh sánh hoa hồng sáp
        $rootScope.count_waxrose = 0;
        for(var i=0; i< $rootScope.max; i++){
          if($rootScope.listProduct[i].category == "Wasrose"){
            $rootScope.listCate_Wasrose.push($rootScope.listProduct[i]);
            $rootScope.count_waxrose++;
          }
        }
        // Hàm lấy danh sánh gấu bông (Stuffet)
        $rootScope.count_Stuffet = 0;
        for(var i=0; i< $rootScope.max; i++){
          if($rootScope.listProduct[i].category == "Stuffet"){
            $rootScope.listCate_Stuffet.push($rootScope.listProduct[i]);
            $rootScope.count_Stuffet++;
          }
        }
        // Hàm lấy danh sánh Homedecor
        $rootScope.count_Homedecor = 0;
        for(var i=0; i< $rootScope.max; i++){
          if($rootScope.listProduct[i].category == "Homedecor"){
            $rootScope.listCate_Homedecor.push($rootScope.listProduct[i]);
            $rootScope.count_Homedecor++;
          }
        }
        // Hàm lấy danh sánh Personalitems
        $rootScope.count_Personal = 0;
        for(var i=0; i< $rootScope.max; i++){
          if($rootScope.listProduct[i].category == "Personalitems"){
            $rootScope.listCate_Personalitems.push($rootScope.listProduct[i]);
            $rootScope.count_Personal++;
          }
        }
        // Hàm lấy danh sánh Personalitems
        $rootScope.count_Business = 0;
        for(var i=0; i< $rootScope.max; i++){
          if($rootScope.listProduct[i].category == "Businessgifts"){
            $rootScope.listCate_Businessgifts.push($rootScope.listProduct[i]);
            $rootScope.count_Business++;
          }
        }
    })
    $rootScope.myCart = [];
    $rootScope.Subtotal = 0;
    $rootScope.countCart = 0;
    $rootScope.addtoCartBtn = function(){
      if($rootScope.myCart.length > 0 && $rootScope.myCart.length < 2){
        $(".footer_cart").append("<a href='#!Products/Checkout' class='btn btn-primary'>Check out</a>");
      }
    }
    // $rootScope.closeCart = function(){
    //     if(isValid){
    //       angular.element("#collapseCart").modal('hide');
    //     }
    // }
    // add to cart
    $rootScope.AddCart = function(product, value){
      console.log(value)
      if($rootScope.myCart.length === 0){
         product.countItems = parseInt(value); 
         $rootScope.myCart.push(product);
         $rootScope.addtoCartBtn();
         $rootScope.countCart += parseInt(value);
      }else{
        var repeat = false;
         for(var i=0; i < $rootScope.myCart.length; i++){
           if($rootScope.myCart[i].id == product.id)
           {
             repeat = true;
             $rootScope.myCart[i].countItems+=parseInt(value);
             $rootScope.countCart = $rootScope.countCart + parseInt(value);
           }
         }
         if(!repeat){
           product.countItems = parseInt(value);
           $rootScope.myCart.push(product);
           $rootScope.countCart ++;
         }  
      }  
      $rootScope.Subtotal += parseFloat(product.price_new);                
   }
   $rootScope.removeItemCart = function(product){
    if(product.countItems > 1){
      product.countItems -=1;
      $rootScope.countCart -=1;
    }else if(product.countItems === 1){
      var index = $rootScope.myCart.indexOf(product);
      $rootScope.myCart.splice(index, 1);
      $rootScope.countCart -=1;
    }
    if ($rootScope.myCart.length == 0) {
      $(".footer_cart").detach();
    }
    $rootScope.Subtotal -= parseFloat(product.price_new);  
  }
  
  // addt compairision
  $rootScope.compareProduct = [];
  $rootScope.countItems1 = 0;
  $rootScope.addToCompare = function (product, index) {
  //   var check = $rootScope.compareProduct.some(obj => {
  //     return obj.id === product.id
  // });
    if($rootScope.compareProduct.length < 3 )
    {
        for(var i in $rootScope.listProduct){
            if($rootScope.listProduct[i].id === product.id){
              $rootScope.compareProduct.push($rootScope.listProduct[i]);
              $rootScope.countItems1++;
            }
        }
    }else{
    }
    $(".compare-modal").addClass("d-block")
    $rootScope.ableToCompare = $rootScope.countItems1 > 1 ? false : true
    console.log($rootScope.ableToCompare);
}
$rootScope.removeFromCompare = function(index) {
  $rootScope.compareProduct.splice(index, 1)
  if($rootScope.compareProduct.length == 0)
  {
      $(".compare-modal").removeClass("d-block")
  }
  $rootScope.countItems--;
  $rootScope.ableToCompare = $rootScope.countItems1 > 1 ? false : true;
}

$rootScope.compare = function() {
  $(".detail-compare-modal").addClass("d-block")
}

$rootScope.closeCompare = function() {
  $(".detail-compare-modal").removeClass("d-block")
  $(".compare-modal").removeClass("d-block")
  $rootScope.compareProduct = [];
  $rootScope.countItems1 = 0;
}
});
// hiện menu active;
app.controller('navbar', function($scope){
  $scope.states = {};
  $scope.states.activeItem = 'item1';
})


app.controller("homeCtrl", function($scope){
  //slider banner
  setTimeout(function(){
    $('.slide_banner .owl-carousel').owlCarousel({
      loop:true,
      margin:30,
      nav:true,
      responsive:{
        0:{
          items:1
        },
        768:{
          items: 1
        },
        900:{
            items: 1
        },
        1200:{
            items:1
        }
      }
    });
  },
  0);

  //slide best seller
  setTimeout(function(){
    $('.best_seller .owl-carousel').owlCarousel({
      loop:true,
      margin:30,
      nav:true,
      responsive:{
          0:{
              items:2
          },
          768:{
            items:3
          },
          900:{
              items: 4
          },
          1200:{
              items:5
          }
      }
    });
  },
  0);
  //slide just for you
  setTimeout(function(){
    $('.just__for__you .owl-carousel').owlCarousel({
      loop:true,
      margin:30,
      nav:true,
      responsive:{
          0:{
              items:2
          },
          768:{
            items:3
          },
          900:{
              items: 4
          },
          1200:{
              items:5
          }
      }
    });
  },
  0);

  setTimeout(function(){
    $('.new_product .owl-carousel').owlCarousel({
      loop:true,
      margin:30,
      nav:true,
      responsive:{
          0:{
              items:2
          },
          768:{
            items:3
          },
          900:{
              items: 4
          },
          1200:{
              items:5
          }
      }
    });
  },
  0);

});
app.controller("CheckouCtrl", function($scope){
  $scope.orderSuccess = function () {
    $scope.myCart.splice(0, $scope.myCart.length);
    $scope.Subtotal = 0;
    $scope.countCart = 0;
}
});
app.controller("salesCtrl", function($scope){
  setTimeout(function(){
    $('.best_seller_sale .owl-carousel').owlCarousel({
      loop:true,
      margin:30,
      nav:true,
      responsive:{
          0:{
              items:2
          },
          768:{
            items:3
          },
          900:{
              items: 4
          },
          1200:{
              items:5
          }
      }
    });
  },
  0);
  setTimeout(function(){
    $('.teddybears .owl-carousel').owlCarousel({
      loop:true,
      margin:30,
      nav:true,
      responsive:{
          0:{
              items:2
          },
          768:{
            items:3
          },
          900:{
              items: 4
          },
          1200:{
              items:5
          }
      }
    });
  },
  0);
  setTimeout(function(){
    $('.Waxrose .owl-carousel').owlCarousel({
      loop:true,
      margin:30,
      nav:true,
      responsive:{
          0:{
              items:2
          },
          768:{
            items:3
          },
          900:{
              items: 4
          },
          1200:{
              items:5
          }
      }
    });
  },
  0);

  setTimeout(function(){
    $('.home_decor .owl-carousel').owlCarousel({
      loop:true,
      margin:30,
      nav:true,
      responsive:{
          0:{
              items:2
          },
          768:{
            items:3
          },
          900:{
              items: 4
          },
          1200:{
              items:5
          }
      }
    });
  },
  0);
  setTimeout(function(){
    $('.Personalitems .owl-carousel').owlCarousel({
      loop:true,
      margin:30,
      nav:true,
      responsive:{
          0:{
              items:2
          },
          768:{
            items:3
          },
          900:{
              items: 4
          },
          1200:{
              items:5
          }
      }
    });
  },
  0);
  setTimeout(function(){
    $('.Business_Gifts .owl-carousel').owlCarousel({
      loop:true,
      margin:30,
      nav:true,
      responsive:{
          0:{
              items:2
          },
          768:{
            items:3
          },
          900:{
              items: 4
          },
          1200:{
              items:5
          }
      }
    });
  },
  0);

});

app.directive('convertToNumber', function(){
  return{
    require: 'ngModel',
    link: function(scope, element, atrs, ngModel){
      ngModel.$parsers.push(function(val){
        return parseInt(val, 10);
      });
      ngModel.$formatters.push(function(val){
        return '' + val;
      });
    }
  }
})
app.controller("productsCtrl", function($scope){
  $scope.begin = 1;
	$scope.pageSize = 12; // items per page
	$scope.pageCount = Math.ceil($scope.max / $scope.pageSize);
  $scope.view = $scope.pageSize;
  $scope.repaginate = function(){
      $scope.pageCount = Math.ceil($scope.max / $scope.pageSize);
      $scope.view = $scope.pageSize;
  }
  $scope.first_pro = function(){
    $scope.begin = 1;
    $scope.view = $scope.pageSize;
  }
  $scope.prev_pro = function(){
      if($scope.begin > 1){
        $scope.begin -= $scope.pageSize;
        if((($scope.begin) + $scope.pageSize-1) > $scope.max+1 ){
          $scope.view = $scope.max+1;
         }else{
          $scope.view = ($scope.begin-1) + $scope.pageSize;
         }
      }
  }
  $scope.next_pro = function(){
      if($scope.begin < $scope.max+1){
         $scope.begin += $scope.pageSize;
         if((($scope.begin) + $scope.pageSize-1) > $scope.max+1 ){
          $scope.view = $scope.max+1;
         }else{
          $scope.view = ($scope.begin) + $scope.pageSize-1;
         }  
      }
 
  }
  $scope.last_pro = function(){
    $scope.begin = ($scope.pageCount -1) * $scope.pageSize;
    $scope.view = $scope.max+1;
  }

   $scope.filterBrand = [];
    $scope.filterByBrandCategory = filterByBrandCategory;
    $scope.getBrandCategories = getBrandCategories;

    function filterByBrandCategory(product) {
        return $scope.filterBrand[product.brand] || noFilter($scope.filterBrand);
    }

    

    function getBrandCategories() {
        return ($scope.listProduct || []).
            map(function (product) { return product.brand; }).
            filter(function (cat, idx, arr) { return arr.indexOf(cat) === idx; });
    }

    function noFilter(filterObj) {
        return Object.
            keys(filterObj).
            every(function (key) { return !filterObj[key]; });
    }

    // Filter By Type
    $scope.filterType = [];
    $scope.filterByTypeCategory = filterByTypeCategory;
    $scope.getTypeCategories = getTypeCategories;

    function filterByTypeCategory(product) {
        return $scope.filterType[product.category] || noFilter($scope.filterType);
    }

    function getTypeCategories() {
        return ($scope.listProduct || []).
            map(function (product) { return product.category; }).
            filter(function (cat, idx, arr) { return arr.indexOf(cat) === idx; });
    }
})
app.controller("myCart", function($scope){

});
app.controller("productDetailCtrl", function($scope){
  $scope.res = '';
  $scope.urlID = window.location.href;
  $scope.res = $scope.urlID.slice(-6);
  $scope.pro_detail = [];
  for(var i in $scope.listProduct){ //tìm kiếm so sánh mã sản phẩm 
    if($scope.listProduct[i].id.toLocaleLowerCase().search($scope.res.toLocaleLowerCase())!=-1){
        $scope.pro_detail.push($scope.listProduct[i]);
    }                      
  }
  $scope.ListReleated = [];
  for(var i in $scope.listProduct){
    if($scope.listProduct[i].id == $scope.res){
      $scope.ListReleated.push($scope.listProduct[i]);
      }
  }
  
  $scope.ListReleated01 = [];
  for(var i in $scope.listProduct){
    if($scope.listProduct[i].category == $scope.ListReleated[0].category ){
      $scope.ListReleated01.push($scope.listProduct[i]);
    }
  }
//   $scope.currentSlide = function(smallImg){
//     console.log(smallImg);
//     $scope.fullImg = document.getElementById('imageBox');
//     $scope.fullImg.src("") = smallImg.src;
//   }
//  console.log($scope.fullImg.src(""))


  setTimeout(function(){
    $('.releadted_poduct .owl-carousel').owlCarousel({
      loop:true,
      margin:30,
      nav:true,
      responsive:{
          0:{
              items:2
          },
          768:{
            items:3
          },
          900:{
              items: 4
          },
          1200:{
              items:5
          }
      }
    });
  },
  0);

  $scope.quanity = 1;
  $scope.add = function () {
    $scope.quanity++;
  }

  $scope.remove = function () {
    if ($scope.quanity > 1) {
        $scope.quanity--;
    } else {
        $scope.quanity = 1;
    }
  }

});

