var tabTitles = ["First Tab","Second Tab","Third Tab","Fourth Tab","Fifth Tab","Sixth Tab"];

$(".tabHeader").click(function(){
    $(".tabHeader").removeClass("active");
    var position = $(this).position();
    var top = position.top;
    $(".active").css("top",top);  
    $(this).addClass("active");
    var text = $(this).text().trim();
    switch(text) {
        case "Tab 1":
            $(".tabTitle").text(tabTitles[0]);
            break;
        case 'Tab 2':
            $(".tabTitle").text(tabTitles[1]);
            break;
        case 'Tab 3':
            $(".tabTitle").text(tabTitles[2]);
            break;
        case 'Tab 4':
            $(".tabTitle").text(tabTitles[3]);
            break;
        case 'Tab 5':
            $(".tabTitle").text(tabTitles[4]);
            break;
        case 'Tab 6':
            $(".tabTitle").text(tabTitles[5]);
            break;
      default:
            $(".tabTitle").text("Select A TAB");
            break;
    
    }
});