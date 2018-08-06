window.Model = function(options){
    let resourceName = options.resourceName
    return {
        initAV: function () {
            var APP_ID = 'a2V3I524SKG86fgyw09QHXIf-gzGzoHsz';
            var APP_KEY = '7H3Igkkto2kxAbmwArUHMjxc';
            AV.init({ appId: APP_ID, appKey: APP_KEY });
        },
        fetch: function () {
            var query = new AV.Query(resourceName);
            return query.find()
        },
        save: function (object) {
            var X = AV.Object.extend(resourceName);
            var x = new X();
            return x.save(object)
        }
    }
}