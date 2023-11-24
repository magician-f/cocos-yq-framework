import { table_data_define } from "../yq/sys/yq_base_sys";
import { prefab_data_define } from "../yq/sys/yq_prefab_sys";
import { ui_data_define } from "../yq/sys/yq_ui_sys";

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
    }
}
export default new global_data();