// let ab = document.getElementsByClassName('loading')[0]
//     console.log(ab)
function showLoading(){
    document.getElementsByClassName('loading')[0].style.display = "block";
    document.getElementsByTagName('h2')[0].style.display = "block";
    // setTimeout(()=>{
    //     document.getElementsByClassName('loading')[0].style.display = "none";
    //     document.getElementsByTagName('h2')[0].innerHTML = 'Completed';
    // },13500)

    let counter = 13;
        let countDown = setInterval(() => {
          if (counter == 0) {
            clearInterval(countDown);
            document.getElementsByClassName('loading')[0].style.display = "none";
            document.getElementsByTagName('h2')[0].innerHTML = 'Completed';
            location.reload();
          } else {
            document.getElementsByTagName('h2')[0].innerHTML= `Please wait for ${counter.toString()} second, converting file to Pdf...`;
            counter--;
          }
        }, 1000);
}
