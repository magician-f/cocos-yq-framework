import yq_base_sys from "./yq_base_sys";

export interface prefab_data_define {
    //预制名,也为索引，用id命名索引规范配置命名
    id: string

    //bundle名,这个预制来自哪个分包，没有配置默认从主包读取
    bundle_name: string

    //资源路径(bundle包)
    res_path: string

}
export default class yq_prefab_sys extends yq_base_sys<prefab_data_define> {

    protected get_data(id: string) {
        const data = this.table_data[id];
        if (!data) {
            console.error(`yq_prefab_sys.get_data no find id:[${id}] data`)
        }
        return data;
    }

    protected async get_bundle(bundle_name: string): Promise<cc.AssetManager.Bundle> {
        return new Promise((resolve, reject) => {
            if (!bundle_name) {
                resolve(cc.assetManager.resources)
                return
            }
            cc.assetManager.loadBundle(bundle_name, (err, _bundle) => {
                resolve(_bundle)
            })
        })
    }

    /** 实例化节点，根据预制id */
    public async ins_node_by_id(id: string): Promise<cc.Node> {
        return new Promise(async (resolve, reject) => {
            const data = this.get_data(id);
            if (!data) {
                resolve(null);
                return
            }
            const { bundle_name, res_path } = data;
            let bundle: cc.AssetManager.Bundle = await this.get_bundle(bundle_name);
            if (!bundle) {
                console.error(`yq_prefab_sys.ins_node_by_id no find bundle:[${bundle_name}]`)
                resolve(null);
                return;
            }
            bundle.load(res_path, cc.Prefab, (err, prefab) => {
                if (err) {
                    console.error(`yq_prefab_sys.ins_node_by_id no find prefab:[${err.message}]`)
                }
                const node = cc.instantiate(prefab);
                resolve(node);
            })
        })
        return
    }

}