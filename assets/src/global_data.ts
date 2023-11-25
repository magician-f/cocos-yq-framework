import { table_data_define } from "../yq/sys/yq_base_sys";
import { prefab_data_define } from "../yq/sys/yq_prefab_sys";
import { ui_data_define } from "../yq/sys/yq_ui_sys";

/**
 * todo 配置模块未开发，手动配置数据
 * 手动维护json数据，仅适合体量很小的项目
 */
class global_data {

    prefab_table: table_data_define<prefab_data_define> = {
        "upgrade_layer": {
            id: "upgrade_layer",
            bundle_name: "",
            res_path: "ui/upgrade_layer"
        },
        "settle_layer": {
            id: "settle_layer",
            bundle_name: "",
            res_path: "ui/settle_layer"
        },
        "activity_layer": {
            id: "activity_layer",
            bundle_name: "activity",
            res_path: "ui/activity_layer"
        },
        "tips": {
            id: "tips",
            bundle_name: "common",
            res_path: "ui/tips"
        },
        "mask": {
            id: "mask",
            bundle_name: "common",
            res_path: "ui/mask"
        },
        "toast": {
            id: "toast",
            bundle_name: "common",
            res_path: "ui/toast"
        },
    }

    ui_table: table_data_define<ui_data_define> = {
        "upgrade": {
            id: "upgrade",
            prefab_id: "upgrade_layer",
            type: "layer"
        },
        "activity": {
            id: "activity",
            prefab_id: "activity_layer",
            type: "layer"
        },
        "settle": {
            id: "settle",
            prefab_id: "settle_layer",
            type: "layer"
        },
        "tips": {
            id: "tips",
            prefab_id: "tips",
            type: "tips"
        },
        "mask": {
            id: "mask",
            prefab_id: "mask",
            type: "mask"
        },
        "toast": {
            id: "toast",
            prefab_id: "toast",
            type: "toast"
        },
    }
}
export default new global_data();