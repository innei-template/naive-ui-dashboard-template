import { NDataTable } from 'naive-ui'
import type {
  RowKey,
  SortState,
  TableColumns,
  dataTableProps,
} from 'naive-ui/lib/data-table/src/interface'
import { useUIStore } from 'stores/ui'
import type { Ref } from 'vue'
import { defineComponent, reactive, ref, watch } from 'vue'
import type { LocationQueryValue } from 'vue-router'
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router'

import { useStoreRef } from '~/hooks/use-store-ref'

import styles from './index.module.css'

export const tableRowStyle = styles['table-row']

const TableProps = [
  'data',
  'pager',
  'onUpdateCheckedRowKeys',
  'onUpdateSorter',
  'columns',
  'onFetchData',
  'nTableProps',
  'noPagination',
  'checkedRowKey',
] as const

interface ITable<T = any> {
  data: Ref<T[]>
  pager: Ref<any>
  onUpdateCheckedRowKeys?: (keys: string[]) => void
  checkedRowKey?: string
  onUpdateSorter?: (
    sortProps: { sortBy: string; sortOrder: number },
    status: SortState,
  ) => void
  onFetchData: (
    page?: string | number | LocationQueryValue[],
    size?: number,
  ) => any
  columns: TableColumns<T>
  nTableProps: Partial<Record<keyof typeof dataTableProps, any>>
  noPagination?: boolean
}

export const Table = defineComponent<ITable>((props) => {
  const {
    data,
    noPagination = false,
    pager,
    onUpdateCheckedRowKeys,
    onUpdateSorter,
    nTableProps,
    columns,
    onFetchData: fetchData,
    checkedRowKey = 'id',
  } = props
  const router = useRouter()
  const route = useRoute()
  const checkedRowKeys = ref<RowKey[]>([])
  const sortProps = reactive({
    sortBy: '',
    sortOrder: 0,
  })
  const loading = ref(true)

  // HACK
  const clean = watch(
    () => data.value,
    () => {
      loading.value = false
      clean()
    },
  )

  onBeforeRouteUpdate((to, from, next) => {
    loading.value = true
    next()
    loading.value = false
  })

  const ui = useStoreRef(useUIStore)

  return () => (
    <NDataTable
      {...nTableProps}
      loading={loading.value}
      remote
      scrollX={Math.max(ui.contentInsetWidth.value, 1200)}
      pagination={
        noPagination
          ? undefined
          : {
              page: pager.value.currentPage,
              pageSize: pager.value.size,
              pageCount: pager.value.totalPage,
              showQuickJumper: true,
              onChange: async (page) => {
                router.push({
                  query: { ...route.query, page },
                  path: route.path,
                })
              },
            }
      }
      bordered={false}
      data={data.value}
      checkedRowKeys={checkedRowKeys.value}
      rowKey={(r) => r[checkedRowKey]}
      onUpdateCheckedRowKeys={(keys) => {
        checkedRowKeys.value = keys
        onUpdateCheckedRowKeys?.(keys as any)
      }}
      rowClassName={() => styles['table-row']}
      onUpdateSorter={async (status: any) => {
        if (!status) {
          return
        }

        columns.forEach((column) => {
          /** column.sortOrder !== undefined means it is uncontrolled */
          if (!('sortOrder' in column)) {
            return
          }
          if (column.sortOrder === undefined) return
          if (!status) {
            column.sortOrder = false
            return
          }
          if (column.key === status.columnKey) column.sortOrder = status.order
          else column.sortOrder = false
        })

        const { columnKey, order } = status

        sortProps.sortBy =
          sortProps.sortBy && sortProps.sortBy == columnKey
            ? ''
            : (columnKey as string)
        sortProps.sortOrder = order ? { descend: -1, ascend: 1 }[order] : 1
        onUpdateSorter?.(sortProps, status)
        await fetchData()
      }}
      columns={columns}
    ></NDataTable>
  )
})
Table.props = TableProps
