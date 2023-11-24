export class table_data_define<T> {
    [key: string]: T
}
export default class yq_base_sys<T> {

    //配置表数据
    table_data: table_data_define<T> = {}

    /** 设置配置表数据 */
    public set_table_data(table: table_data_define<T>) {
        this.table_data = table;
    }
}