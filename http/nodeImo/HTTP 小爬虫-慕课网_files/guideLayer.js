// 发笔记、提问题新版引导图层
define(function(require, exports, module){
    var store = require('store');

    var guideLayer = {
        getGuideTpl: function(){
            return [
                '<div class="guide-mask" id="J-guide-mask"></div>',
                '<div class="guide-layer" id="J-guide-layer">',
                    '<div class="btn-close-guide" id="J-close-guide">关闭按钮</div>',
                '</div>'
            ].join('');
        },
        create: function(callback){ // 生成新功能引导图层
            $(document.body).append(this.getGuideTpl());
            var that = this,
                dom = this.getDom();

            // 设置引导层的位置
            this.setLayerPosX(dom);

            // 关闭引导图层后，再初始化播放器
            dom.closeBtn.on('click', function(){
                $(this).off('click');
                that.close(dom);
                callback && callback();
            });

            $(window).on('resize', function(){
                that.setLayerPosX(dom);
            });
        },
        close: function(dom){ // 关闭新功能引导图层
            dom.mask.remove();
            dom.guideLayer.remove();
            store.set('isFirstVisit', 'No');
        },
        setLayerPosX: function(dom){
            dom.guideLayer.css('top', ($(window).height() - dom.guideLayer.height())/2);
        },
        getDom: function(){
            return {
                mask: $('#J-guide-mask'),
                guideLayer: $('#J-guide-layer'),
                closeBtn: $('#J-close-guide')
            };
        }
    };

    return guideLayer;
});