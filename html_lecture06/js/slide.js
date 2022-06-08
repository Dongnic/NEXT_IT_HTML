
let page = "next";
let win_size;

$(function(){

    $(".btn_next").click(function(){
        page = "next";
        clearInterval(time_interval);
        find_num(page);

    });
    $(".btn_prev").click(function(){
        page = "prev";
        clearInterval(time_interval);
        find_num(page);

    });

    //2차-1 li태그 생성(2차-2)
    let outPut;
    for(let i=0; i<img_size; i++){
        console.log("img_size::"+i);
        outPut +="<li><a href='#'>"+(i+1)+"</a></li>";
    }
    $(".product_list").html(outPut);

    //3차-1  li태그에 이미지넣기(3차-2)
    for(let i=0; i<img_size; i++){
        $(".product_list > li:nth-child("+(i+1)+")")
            .css({"background": "url('"+img_files[i]+"')", "background-size":"100% 600px"}); 

    }

    $(window).resize(function() { 
        fn_win_size();
        find_num(page);
    });

    fn_win_size();

    let time_interval= setInterval(function(){
        find_num(page); 
    },2000);
});  

//1차-1 이미지 배열선언(1차-2)
let img_files=[
    //3차-3 추가이미지 넣고 확인해보기(All-e)
    "./images/img4.jpg",

    "./images/img1.jpg",
    "./images/img2.jpg",
    "./images/img100.jpg",
    "./images/img102.jpg",
    "./images/img104.jpg"
];
//1차-2  이미지 개수 구하기(1차-3)
let img_size = img_files.length;
console.log("img_size:::"+img_size);



let cur_no =0; 
let next_no =1;

function find_num(page){
    console.log("page::::"+page);
    

    if(page == "next"){
        
         if(cur_no==0 && next_no == img_size ){//1차-3 개수 바꾸기(1차-4)
            cur_no= img_size;//1차-4 개수 바꾸기(1차-5)
            next_no= 1;
        }else{

            if(cur_no == img_size){//1차-5 개수 바꾸기(1차-6)
                cur_no =1;
            }else{
                if(cur_no != next_no){
                    cur_no++;
                }
            }
            next_no = cur_no +1;
            if(next_no == img_size+1){//1차-6 개수 바꾸기(1차-7)
                next_no =1;
            }
            
        }
        find_img(cur_no, next_no, page);

    }else{
        if(cur_no == 0 && next_no ==1 ){
            cur_no = 1;
            next_no = img_size;//1차-7 개수 바꾸기(1차-8)
            
        }else{
            cur_no = next_no;
            next_no = cur_no -1;
            if (next_no == 0 ){
                next_no = img_size;//1차-8 개수 바꾸고 잘되는지 확인 (1차-e) 
            }
        }

        find_img(cur_no, next_no, page);
        cur_no--;
    }
    
};

function find_img(cur_no, next_no, page){
    console.log("cur_no:::"+cur_no+", next_no:::"+next_no+", page::::"+page);
    let next_size, cur_size;
    if(page == "next"){
        next_size = win_size;
        cur_size = win_size*-1;
    }else{
        next_size = win_size*-1;
        cur_size = win_size;
    }
    $(".product_list > li:nth-child("+next_no+")")
        .css({ left : next_size, display : 'block'});
    $(".product_list > li:nth-child("+cur_no+")")
        .stop().animate({left : cur_size, opacity : 0});
    $(".product_list > li:nth-child("+next_no+")")
        .stop().animate({left : 0, opacity : 1},500);

}

function fn_win_size(){
    win_size= document.body.offsetWidth  -20;
    console.log("screen.availWidth::::"+document.body.offsetWidth );

    let product_con = $(".product_con");
    let product_list = $(".product_list");
    let product_list_li = $(".product_list > li");

    product_con.css("width", win_size);
    product_list.css("width", win_size);
    product_list_li.css("width", win_size);

    product_list_li.css("left", win_size);
    let img =  $(".product_list > li:nth-child(1)");
    img.css("left",0);
}