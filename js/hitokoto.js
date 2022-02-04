(function (){
  function getYiYan(){
    fetch('https://v1.hitokoto.cn')
      .then(function (res){
        return res.json();
      })
      .then(function (data) {
        var hitokoto = document.getElementById('hitokoto');
        hitokoto.innerText = '\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + data.hitokoto;
        var hitofrom = document.getElementById('hitofrom');
        hitofrom.innerText = "来源  《" + data.from + "》"; 
        // var hitokotoProvider = document.getElementById('hitokotoProvider');
        // hitokotoProvider.innerText="提供者-"+ data.creator
      })
      .catch(function (err) {
        console.error(err);
      })
  };
  getYiYan();
  $('#hitokoto-container').click(function (){
    getYiYan();
  });
})();



  
