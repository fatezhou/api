Page({
    data: {
        markers: [ {
            iconPath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524827994124&di=bafb6cb579f94c07a5efaa153ba32612&imgtype=0&src=http%3A%2F%2Fpic3.16pic.com%2F00%2F53%2F72%2F16pic_5372096_b.jpg",
            id: 0,
            latitude: 23.099994,
            longitude: 113.32452,
            width: 50,
            height: 50
        } ],
        polyline: [ {
            points: [ {
                longitude: 113.3245211,
                latitude: 23.10229
            }, {
                longitude: 113.32452,
                latitude: 23.21229
            } ],
            color: "#FF0000DD",
            width: 2,
            dottedLine: !0
        } ],
        controls: [ {
            id: 1,
            iconPath: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524827994124&di=3c354b4e83f279197ce7c79200459c25&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F34fae6cd7b899e51fab3e9c048a7d933c8950d21.jpg",
            position: {
                left: 0,
                top: 250,
                width: 50,
                height: 50
            },
            clickable: !0
        } ]
    },
    regionchange: function(t) {
        console.log(t.type);
    },
    markertap: function(t) {
        console.log(t.markerId);
    },
    controltap: function(t) {
        console.log(t.controlId);
    }
});