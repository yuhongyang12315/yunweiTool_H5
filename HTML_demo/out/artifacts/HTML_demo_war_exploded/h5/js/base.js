    (function(doc,win){
        var docEl=doc.documentElement;
        //横竖屏方向变化,或尺寸缩放
        let resizeEvt='orientationchange' in window?'orientationchange':'resize';
        //设置基准字体大小
        let recalc=function(){
            var clientWidth=docEl.clientWidth;
            if(!clientWidth)
            {
                return;
            }
            let fontSize=16*(clientWidth/480);
            docEl.style.fontSize=fontSize+'px';
        };
        if(!doc.addEventListener)
        {
            return;
        }
        win.addEventListener(resizeEvt,recalc,false);
        doc.addEventListener('DOMContentLoaded',recalc,false);
    })(document,window);
