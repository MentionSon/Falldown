(function(window, document) {
    let setPhotos = function(data) {
        //生成页面的图片结构
        data.forEach(({caption, url}) => {
            let photoWrap = document.createElement('div');
            let photo = document.createElement('img');
            //let p = document.createElement('p');
            photo.src = url;
            //p.innerText = caption;
            photoWrap.className = 'photo';
            photoWrap.appendChild(photo);
            //photoWrap.appendChild(p);
            wrap.appendChild(photoWrap);
        });
        waterFall(wrap,document.querySelectorAll('.photo'));
        
    }
    let waterFall = function(wrap, boxes) {

        // 获取屏幕的列数    
        const BOX_WIDTH = boxes[0].offsetWidth + 20;
        let windowWidth = document.documentElement.clientWidth;
        let colsNumber = Math.floor(windowWidth / BOX_WIDTH);
        console.log(boxes);

        wrap.style.width = BOX_WIDTH * colsNumber + 'px';

        // 存储每列高度
        let colHeight = []; 
        setTimeout(function() {
            for (let i=0; i<boxes.length; i++) {
                if (i < colsNumber) {
                        colHeight[i] = boxes[i].offsetHeight + 20;           
                } else {
                        let minHeight = Math.min.apply(null, colHeight);
                        let minIndex = getIndex(minHeight, colHeight);
                        let leftValue = boxes[minIndex].offsetLeft - 10;
                        boxes[i].style.position = 'absolute';
                        boxes[i].style.left = leftValue + 'px';
                        boxes[i].style.top = minHeight + 'px';
                        colHeight[minIndex] += boxes[i].offsetHeight + 20;           
                }
            } 
            
        },100);
          
    };

    let getCheck = function() {
            let docHeight = document.documentElement.clientHeight;
            let scrollHeight = document.documentElement.scrollTop;
            let boxes = document.querySelectorAll('.photo'); 
            let key = boxes.length - 1;
            let lastPhotoTop = boxes[key].offsetTop;
            
            let lastPhotoHeight = boxes[key].offsetHeight + 10; 
            let docTop = docHeight + scrollHeight
            let lastColHeight = lastPhotoTop + lastPhotoHeight ;
            console.log(docTop);
            console.log(lastColHeight);

            return Math.ceil(docTop+1) >= lastColHeight ? true : false;
        
    }

    function getIndex(minHeight, colHeight) {
        for (let i in colHeight) {
            if (colHeight[i] === minHeight) {
                return i;
            }
        }
    }

    window.setPhotos = setPhotos;
    window.getCheck = getCheck;
})(window, document);