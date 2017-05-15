import { browserHistory } from 'react-router'

export const PopupStore = {
    events:{
        all:{
            hide: "allPopupsHide"
        },
        overlay: {
            show: "showpopupoverlay"
        },
        auth:{
            show: "authPopupShow",
        },
        favorite:{
            show: "favoritePopupShow",
        },
        report:{
            show: "reportPopupShow",
        },
        addtofavorite:{
            show: "asdad2231231312ss"
        }
    },
    data: {
        report: {
            property_id: 0
        }
    },
    hide(){
        PopupStore.trigger(PopupStore.events.all.hide);
    },
    show(popup){
        this.hide();
        PopupStore.trigger(PopupStore.events.overlay.show);
        PopupStore.trigger(PopupStore.events[popup].show);
    }
}
MicroEvent.mixin( PopupStore );
