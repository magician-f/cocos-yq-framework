import yq_prefab_sys from "./sys/yq_prefab_sys"
import yq_ui_sys from "./sys/yq_ui_sys"

export default class yq {
    prefab: yq_prefab_sys = new yq_prefab_sys();
    ui: yq_ui_sys = new yq_ui_sys();
}