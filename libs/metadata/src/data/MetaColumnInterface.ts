export default interface ColumnMetadataInterface {
  formType: string
  width: number
  sortable: boolean
  searchable: boolean
  showInTable: boolean
  addable: boolean
  itemKey: string
  searchKey?: string
  baseUrl?: string
  getUrl?: string
  responseKey?: string
}
